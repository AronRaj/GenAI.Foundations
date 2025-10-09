/**
 * RAG (Retrieval-Augmented Generation) with LangGraph - SOLUTION
 * 
 * This solution demonstrates advanced RAG concepts using LangGraph:
 * 1. Custom LangGraph workflow with state management
 * 2. ReAct (Reasoning and Acting) agent pattern
 * 3. Tool integration for document retrieval
 * 4. Memory persistence across conversations
 * 5. Multi-turn conversational AI
 */

import { config } from 'dotenv';
import { AzureOpenAIEmbeddings, AzureChatOpenAI } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { 
    MessagesAnnotation, 
    StateGraph, 
    START, 
    END 
} from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { MemorySaver } from '@langchain/langgraph';
import { v4 as uuidv4 } from 'uuid';

// Load environment variables
config();

console.log('\\n' + '='.repeat(80));
console.log('RAG (Retrieval-Augmented Generation) with LangGraph - SOLUTION');
console.log('='.repeat(80) + '\\n');

async function main() {
    // ========================================================================
    // Step 1: Verify API Key
    // ========================================================================
    console.log('Step 1: Verifying API credentials...');
    
    if (!process.env.AZURE_OPENAI_API_KEY) {
        throw new Error('AZURE_OPENAI_API_KEY environment variable is not set');
    }
    
    console.log('✓ API key loaded\\n');
    
    // ========================================================================
    // Step 2: Initialize Models
    // ========================================================================
    console.log('Step 2: Initializing Azure OpenAI models...');
    
    const embeddings = new AzureOpenAIEmbeddings({
        azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
        azureOpenAIApiInstanceName: 'aoi-ext-eus-aiml-profx-01',
        azureOpenAIApiDeploymentName: 'text-embedding-ada-002',
        azureOpenAIApiVersion: '2024-12-01-preview',
    });
    
    const llm = new AzureChatOpenAI({
        azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
        azureOpenAIApiInstanceName: 'aoi-ext-eus-aiml-profx-01',
        azureOpenAIApiDeploymentName: 'gpt-4o',
        azureOpenAIApiVersion: '2024-12-01-preview',
    });
    
    console.log('✓ Models initialized\\n');
    
    // ========================================================================
    // Step 3: Load and Process Documents
    // ========================================================================
    console.log('Step 3: Loading documents from web...');
    console.log('URL: https://lilianweng.github.io/posts/2023-06-23-agent/\\n');
    
    const loader = new CheerioWebBaseLoader(
        'https://lilianweng.github.io/posts/2023-06-23-agent/'
    );
    
    const docs = await loader.load();
    
    console.log(`✓ Loaded ${docs.length} document(s)`);
    console.log(`Total characters: ${docs[0].pageContent.length}\\n`);
    
    // ========================================================================
    // Step 4: Split Documents
    // ========================================================================
    console.log('Step 4: Splitting documents into chunks...');
    
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    
    const splits = await textSplitter.splitDocuments(docs);
    
    console.log(`✓ Created ${splits.length} text chunks\\n`);
    
    // ========================================================================
    // Step 5: Create Vector Store
    // ========================================================================
    console.log('Step 5: Creating vector store and indexing documents...');
    
    const vectorStore = new MemoryVectorStore(embeddings);
    await vectorStore.addDocuments(splits);
    
    console.log('✓ Documents indexed in vector store\\n');
    
    // ========================================================================
    // Step 6: Create RAG Tools
    // ========================================================================
    console.log('Step 6: Creating RAG tools for LangGraph...');
    
    // Tool for retrieving relevant documents
    const retrieveTool = new DynamicStructuredTool({
        name: 'retrieve_documents',
        description: 'Retrieve relevant documents based on a query. Use this when you need to search for information about AI agents, planning, memory, or related topics.',
        schema: z.object({
            query: z.string().describe('The search query to find relevant documents'),
        }),
        func: async ({ query }) => {
            const results = await vectorStore.similaritySearch(query, 4);
            
            let formattedResults = `Found ${results.length} relevant documents:\\n\\n`;
            
            results.forEach((doc, index) => {
                formattedResults += `Document ${index + 1}:\\n`;
                formattedResults += `${doc.pageContent.slice(0, 500)}...\\n`;
                formattedResults += '-'.repeat(50) + '\\n\\n';
            });
            
            return formattedResults;
        },
    });
    
    const tools = [retrieveTool];
    
    console.log(`✓ Created ${tools.length} tools for document retrieval\\n`);
    
    // ========================================================================
    // Step 7: Build Custom LangGraph Workflow
    // ========================================================================
    console.log('Step 7: Building LangGraph workflow...');
    
    // Define the graph state (using MessagesAnnotation for conversation history)
    const GraphAnnotation = MessagesAnnotation;
    
    // Tool execution node
    const toolNode = new ToolNode(tools);
    
    // Define the agent node
    function callModel(state) {
        const llmWithTools = llm.bindTools(tools);
        const response = llmWithTools.invoke(state.messages);
        return { messages: [response] };
    }
    
    // Define logic to determine next step
    function shouldContinue(state) {
        const lastMessage = state.messages[state.messages.length - 1];
        
        // If the LLM makes a tool call, continue to tools
        if (lastMessage._getType() === 'ai' && lastMessage.tool_calls?.length > 0) {
            return 'tools';
        }
        
        // Otherwise, end
        return END;
    }
    
    // Build the graph
    const workflow = new StateGraph(GraphAnnotation)
        .addNode('agent', callModel)
        .addNode('tools', toolNode)
        .addEdge(START, 'agent')
        .addConditionalEdges('agent', shouldContinue)
        .addEdge('tools', 'agent');
    
    // Add memory for conversation persistence
    const memory = new MemorySaver();
    const app = workflow.compile({ checkpointer: memory });
    
    console.log('✓ LangGraph workflow compiled with memory\\n');
    
    // ========================================================================
    // Step 8: Demonstrate Multi-turn Conversation
    // ========================================================================
    console.log('Step 8: Running multi-turn conversation example...\\n');
    
    // Generate a unique conversation ID
    const conversationId = uuidv4();
    const config = { configurable: { thread_id: conversationId } };
    
    console.log('🤖 Starting conversation with LangGraph RAG Agent\\n');
    
    // First query
    const queries = [
        'What are the main components of an AI agent according to the document?',
        'Can you tell me more about the planning component?',
        'What are some challenges with long-term planning in AI agents?'
    ];
    
    for (let i = 0; i < queries.length; i++) {
        const query = queries[i];
        console.log(`📝 Query ${i + 1}: ${query}\\n`);
        
        const finalState = await app.invoke(
            { messages: [{ role: 'user', content: query }] },
            config
        );
        
        const lastMessage = finalState.messages[finalState.messages.length - 1];
        console.log(`🤖 Response ${i + 1}:`);
        console.log(lastMessage.content);
        console.log('\\n' + '-'.repeat(80) + '\\n');
        
        // Small delay between queries for readability
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // ========================================================================
    // Step 9: Build ReAct Agent (Alternative Approach)
    // ========================================================================
    console.log('Step 9: Building ReAct (Reasoning and Acting) Agent...\\n');
    
    // Create a ReAct-style prompt template
    const reactPrompt = ChatPromptTemplate.fromMessages([
        ['system', `You are a helpful AI assistant with access to a document retrieval tool.

When answering questions:
1. Think about what information you need
2. Use the retrieve_documents tool to search for relevant information
3. Analyze the retrieved information
4. Provide a comprehensive answer based on the documents

Always cite specific information from the documents when possible.`],
        ['placeholder', '{messages}']
    ]);
    
    // Create ReAct workflow
    function reactAgent(state) {
        const prompt = reactPrompt.format({ messages: state.messages });
        const llmWithTools = llm.bindTools(tools);
        const response = llmWithTools.invoke([{ role: 'system', content: prompt }].concat(state.messages));
        return { messages: [response] };
    }
    
    const reactWorkflow = new StateGraph(GraphAnnotation)
        .addNode('agent', reactAgent)
        .addNode('tools', toolNode)
        .addEdge(START, 'agent')
        .addConditionalEdges('agent', shouldContinue)
        .addEdge('tools', 'agent');
    
    const reactApp = reactWorkflow.compile({ checkpointer: memory });
    
    console.log('✓ ReAct agent compiled\\n');
    
    // ========================================================================
    // Step 10: Test ReAct Agent
    // ========================================================================
    console.log('Step 10: Testing ReAct Agent...\\n');
    
    const reactQuery = 'Compare different memory types used in AI agents and explain their advantages and disadvantages.';
    console.log(`📝 ReAct Query: ${reactQuery}\\n`);
    
    const reactConversationId = uuidv4();
    const reactConfig = { configurable: { thread_id: reactConversationId } };
    
    const reactState = await reactApp.invoke(
        { messages: [{ role: 'user', content: reactQuery }] },
        reactConfig
    );
    
    const reactResponse = reactState.messages[reactState.messages.length - 1];
    console.log('🤖 ReAct Agent Response:');
    console.log(reactResponse.content);
    console.log('\\n' + '='.repeat(80) + '\\n');
    
    // ========================================================================
    // Summary
    // ========================================================================
    console.log('🎉 LangGraph RAG Implementation Complete!\\n');
    console.log('What we accomplished:');
    console.log('✓ Built a stateful RAG system with LangGraph');
    console.log('✓ Implemented tool calling for document retrieval');
    console.log('✓ Added conversation memory and persistence');
    console.log('✓ Created both custom workflow and ReAct agent patterns');
    console.log('✓ Demonstrated multi-turn conversations with context');
    console.log('\\nKey LangGraph Features Demonstrated:');
    console.log('• MessagesAnnotation for conversation state');
    console.log('• Conditional edges for dynamic workflow routing');
    console.log('• MemorySaver for conversation persistence');
    console.log('• Tool integration with automatic function calling');
    console.log('• Multi-agent patterns (custom + ReAct)');
}

// Run the main function
main().catch(console.error);