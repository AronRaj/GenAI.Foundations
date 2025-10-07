/**
 * RAG (Retrieval-Augmented Generation) with LangChain - SOLUTION
 * 
 * This is the complete solution for the RAG exercise.
 * Compare your implementation with this to verify your work.
 */

import { config } from 'dotenv';
import { AzureOpenAIEmbeddings, AzureChatOpenAI } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';

// Load environment variables
config();

console.log('\n' + '='.repeat(80));
console.log('RAG (Retrieval-Augmented Generation) with LangChain - SOLUTION');
console.log('='.repeat(80) + '\n');

async function main() {
    // ========================================================================
    // Step 1: Verify API Key
    // ========================================================================
    console.log('Step 1: Verifying API credentials...');
    
    if (!process.env.AZURE_OPENAI_API_KEY) {
        throw new Error('AZURE_OPENAI_API_KEY environment variable is not set');
    }
    
    console.log('✓ API key loaded\n');
    
    // ========================================================================
    // Step 2: Initialize Embeddings
    // ========================================================================
    console.log('Step 2: Initializing Azure OpenAI embeddings...');
    
    const embeddings = new AzureOpenAIEmbeddings({
        azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
        azureOpenAIApiInstanceName: 'aoi-ext-eus-aiml-profx-01',
        azureOpenAIApiDeploymentName: 'text-embedding-ada-002',
        azureOpenAIApiVersion: '2024-12-01-preview',
    });
    
    console.log('✓ Embeddings initialized\n');
    
    // ========================================================================
    // Step 3: Initialize LLM
    // ========================================================================
    console.log('Step 3: Initializing Azure Chat OpenAI (LLM)...');
    
    const llm = new AzureChatOpenAI({
        azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
        azureOpenAIApiInstanceName: 'aoi-ext-eus-aiml-profx-01',
        azureOpenAIApiDeploymentName: 'gpt-4o',
        azureOpenAIApiVersion: '2024-12-01-preview',
    });
    
    console.log('✓ LLM initialized\n');
    
    // ========================================================================
    // Step 4: Create Vector Store
    // ========================================================================
    console.log('Step 4: Creating in-memory vector store...');
    
    const vectorStore = new MemoryVectorStore(embeddings);
    
    console.log('✓ Vector store created\n');
    
    // ========================================================================
    // Step 5: Load Documents from Web
    // ========================================================================
    console.log('Step 5: Loading documents from web...');
    console.log('URL: https://lilianweng.github.io/posts/2023-06-23-agent/\n');
    
    const loader = new CheerioWebBaseLoader(
        'https://lilianweng.github.io/posts/2023-06-23-agent/'
    );
    
    const docs = await loader.load();
    
    console.log(`✓ Loaded ${docs.length} document(s)`);
    console.log(`Total characters: ${docs[0].pageContent.length}\n`);
    
    // ========================================================================
    // Step 5b: Preview Document
    // ========================================================================
    console.log('Document preview (first 500 characters):');
    console.log(docs[0].pageContent.substring(0, 500) + '...\n');
    
    // ========================================================================
    // Step 6: Split Documents
    // ========================================================================
    console.log('Step 6: Splitting documents into chunks...');
    
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    
    const allSplits = await textSplitter.splitDocuments(docs);
    
    console.log(`✓ Split into ${allSplits.length} chunks\n`);
    
    // ========================================================================
    // Step 7: Index Documents
    // ========================================================================
    console.log('Step 7: Adding documents to vector store...');
    console.log('⚠️  This may take 30-60 seconds...\n');
    
    await vectorStore.addDocuments(allSplits);
    
    console.log(`✓ Successfully indexed ${allSplits.length} document chunks\n`);
    
    // ========================================================================
    // Step 8: Create RAG Chain
    // ========================================================================
    console.log('Step 8: Creating RAG chain...');
    
    // Create a retriever from the vector store
    const retriever = vectorStore.asRetriever({
        k: 4, // Return top 4 most relevant documents
    });
    
    // Define the RAG prompt template
    const ragPrompt = ChatPromptTemplate.fromTemplate(
        `You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.

Question: {question}

Context: {context}

Answer:`
    );
    
    // Create the RAG chain using LCEL (LangChain Expression Language)
    const ragChain = RunnableSequence.from([
        {
            context: async (input) => {
                const docs = await retriever.invoke(input.question);
                return docs.map(d => d.pageContent).join('\n\n');
            },
            question: (input) => input.question,
        },
        ragPrompt,
        llm,
        new StringOutputParser(),
    ]);
    
    console.log('✓ RAG chain created\n');
    
    // ========================================================================
    // Step 9: Test the RAG System
    // ========================================================================
    console.log('='.repeat(80));
    console.log('Testing the RAG System');
    console.log('='.repeat(80) + '\n');
    
    const question1 = 'What is Task Decomposition?';
    console.log(`Question: ${question1}\n`);
    
    const answer1 = await ragChain.invoke({ question: question1 });
    
    console.log('Answer:');
    console.log(answer1);
    console.log('\n');
    
    // ========================================================================
    // Step 10: Stream Response
    // ========================================================================
    console.log('='.repeat(80));
    console.log('Streaming Response Example');
    console.log('='.repeat(80) + '\n');
    
    const question2 = 'What are the different types of memory in AI agents?';
    console.log(`Question: ${question2}\n`);
    console.log('Answer (streaming):');
    
    const stream = await ragChain.stream({ question: question2 });
    
    for await (const chunk of stream) {
        process.stdout.write(chunk);
    }
    
    console.log('\n\n');
    
    // ========================================================================
    // Additional Examples
    // ========================================================================
    console.log('='.repeat(80));
    console.log('Additional Example Queries');
    console.log('='.repeat(80) + '\n');
    
    // Example 3: Challenges with LLM
    const question3 = 'What are the challenges with using LLMs in autonomous agents?';
    console.log(`Question: ${question3}\n`);
    
    const answer3 = await ragChain.invoke({ question: question3 });
    console.log('Answer:');
    console.log(answer3);
    console.log('\n');
    
    // Example 4: Chain of Thought
    const question4 = 'Explain Chain of Thought prompting';
    console.log(`Question: ${question4}\n`);
    
    const answer4 = await ragChain.invoke({ question: question4 });
    console.log('Answer:');
    console.log(answer4);
    console.log('\n');
    
    // ========================================================================
    // Summary
    // ========================================================================
    console.log('='.repeat(80));
    console.log('Congratulations! 🎉');
    console.log('='.repeat(80));
    console.log("You've built a complete RAG system!");
    console.log('\nWhat you accomplished:');
    console.log('✅ Set up secure API key management');
    console.log('✅ Configured Azure OpenAI embeddings and LLM');
    console.log('✅ Created a vector store for semantic search');
    console.log('✅ Loaded and parsed web content');
    console.log('✅ Split documents into optimal chunks');
    console.log('✅ Indexed documents with embeddings');
    console.log('✅ Built a complete RAG pipeline using LCEL');
    console.log('✅ Tested with multiple queries');
    console.log('✅ Implemented streaming responses');
    console.log('\nNext Steps:');
    console.log('- Try different questions about AI agents');
    console.log('- Experiment with chunk sizes and retrieval parameters');
    console.log('- Add more documents to the knowledge base');
    console.log('- Implement query rewriting or re-ranking');
    console.log('- Deploy as a web API or chatbot');
    console.log('\nKey Concepts:');
    console.log('• RAG combines retrieval and generation for grounded answers');
    console.log('• Vector embeddings enable semantic search');
    console.log('• LCEL provides a composable way to build chains');
    console.log('• Streaming improves user experience in real-time applications');
}

// Run the main function
main().catch(console.error);
