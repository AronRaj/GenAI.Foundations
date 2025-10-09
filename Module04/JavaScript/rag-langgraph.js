/**
 * RAG (Retrieval-Augmented Generation) with LangGraph
 * 
 * In this exercise, you'll build an advanced RAG system using LangGraph:
 * 1. Custom LangGraph workflow with state management
 * 2. Tool integration for document retrieval
 * 3. Memory persistence across conversations
 * 4. Multi-turn conversational AI
 * 
 * Complete the TODOs below to implement the full solution.
 */

import { config } from 'dotenv';
import { AzureOpenAIEmbeddings, AzureChatOpenAI } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
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
console.log('RAG (Retrieval-Augmented Generation) with LangGraph');
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
    
    // TODO: Initialize embeddings model
    // Hint: Use AzureOpenAIEmbeddings with text-embedding-ada-002
    const embeddings = null; // Replace with your implementation
    
    // TODO: Initialize chat model
    // Hint: Use AzureChatOpenAI with gpt-4o
    const llm = null; // Replace with your implementation
    
    console.log('✓ Models initialized\\n');
    
    // ========================================================================
    // Step 3: Load and Process Documents
    // ========================================================================
    console.log('Step 3: Loading documents from web...');
    console.log('URL: https://lilianweng.github.io/posts/2023-06-23-agent/\\n');
    
    // TODO: Load documents using CheerioWebBaseLoader
    const loader = null; // Replace with your implementation
    const docs = null; // Replace with your implementation
    
    console.log(`✓ Loaded ${docs?.length || 0} document(s)`);
    console.log(`Total characters: ${docs?.[0]?.pageContent?.length || 0}\\n`);
    
    // ========================================================================
    // Step 4: Split Documents
    // ========================================================================
    console.log('Step 4: Splitting documents into chunks...');
    
    // TODO: Create text splitter and split documents
    // Hint: Use RecursiveCharacterTextSplitter with chunk size 1000 and overlap 200
    const textSplitter = null; // Replace with your implementation
    const splits = null; // Replace with your implementation
    
    console.log(`✓ Created ${splits?.length || 0} text chunks\\n`);
    
    // ========================================================================
    // Step 5: Create Vector Store
    // ========================================================================
    console.log('Step 5: Creating vector store and indexing documents...');
    
    // TODO: Create vector store and add documents
    // Hint: Use MemoryVectorStore with embeddings
    const vectorStore = null; // Replace with your implementation
    
    console.log('✓ Documents indexed in vector store\\n');
    
    // ========================================================================
    // Step 6: Create RAG Tools
    // ========================================================================
    console.log('Step 6: Creating RAG tools for LangGraph...');
    
    // TODO: Create a tool for document retrieval
    // Hint: Use DynamicStructuredTool with vector store similarity search
    const retrieveTool = null; // Replace with your implementation
    
    const tools = [retrieveTool].filter(Boolean); // Remove nulls
    
    console.log(`✓ Created ${tools.length} tools for document retrieval\\n`);
    
    // ========================================================================
    // Step 7: Build LangGraph Workflow
    // ========================================================================
    console.log('Step 7: Building LangGraph workflow...');
    
    // TODO: Define graph state and nodes
    // Hint: Use MessagesAnnotation for conversation history
    const GraphAnnotation = MessagesAnnotation;
    
    // TODO: Create tool node
    const toolNode = null; // Replace with your implementation
    
    // TODO: Define the agent node function
    function callModel(state) {
        // Hint: Bind tools to LLM and invoke with state messages
        return null; // Replace with your implementation
    }
    
    // TODO: Define logic to determine next step
    function shouldContinue(state) {
        // Hint: Check if last message has tool calls
        return END; // Replace with your implementation
    }
    
    // TODO: Build the workflow graph
    const workflow = null; // Replace with your implementation
    
    // TODO: Add memory and compile
    const memory = new MemorySaver();
    const app = null; // Replace with your implementation
    
    console.log('✓ LangGraph workflow compiled with memory\\n');
    
    // ========================================================================
    // Step 8: Test the System
    // ========================================================================
    console.log('Step 8: Testing LangGraph RAG system...\\n');
    
    if (app) {
        const conversationId = uuidv4();
        const config = { configurable: { thread_id: conversationId } };
        
        const query = 'What are the main components of an AI agent?';
        console.log(`📝 Query: ${query}\\n`);
        
        try {
            const finalState = await app.invoke(
                { messages: [{ role: 'user', content: query }] },
                config
            );
            
            const lastMessage = finalState.messages[finalState.messages.length - 1];
            console.log('🤖 Response:');
            console.log(lastMessage.content);
        } catch (error) {
            console.log('❌ Error running workflow:', error.message);
        }
    } else {
        console.log('❌ Workflow not implemented yet');
    }
    
    console.log('\\n' + '='.repeat(80) + '\\n');
    console.log('🎯 Exercise Complete!');
    console.log('Compare your implementation with the solution file.');
}

// Run the main function
main().catch(console.error);