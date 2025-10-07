/**
 * Semantic Search with LangChain and Azure OpenAI - SOLUTION
 * 
 * This is the complete solution for the semantic search exercise.
 * Compare your implementation with this to verify your work.
 */

import { config } from 'dotenv';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { AzureOpenAIEmbeddings } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

// Load environment variables
config();

console.log('\n' + '='.repeat(80));
console.log('Semantic Search with LangChain and Azure OpenAI - SOLUTION');
console.log('='.repeat(80) + '\n');

async function main() {
    // ========================================================================
    // Step 1: Load Documents
    // ========================================================================
    console.log('Step 1: Loading PDF document...');
    
    const filePath = '../data/nke-10k-2023.pdf';
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();
    
    console.log(`✓ Loaded ${docs.length} pages from PDF\n`);
    
    // ========================================================================
    // Step 1b: Inspect First Document
    // ========================================================================
    console.log('Step 1b: Inspecting first document...');
    console.log(`First 200 characters: ${docs[0].pageContent.substring(0, 200)}...\n`);
    console.log('Metadata:', docs[0].metadata);
    console.log('');
    
    // ========================================================================
    // Step 2: Split Documents
    // ========================================================================
    console.log('Step 2: Splitting documents into chunks...');
    
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    
    const allSplits = await textSplitter.splitDocuments(docs);
    console.log(`✓ Split ${docs.length} pages into ${allSplits.length} chunks\n`);
    
    // ========================================================================
    // Step 3: Configure Embeddings
    // ========================================================================
    console.log('Step 3: Configuring Azure OpenAI embeddings...');
    
    const embeddings = new AzureOpenAIEmbeddings({
        azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
        azureOpenAIApiInstanceName: 'aoi-ext-eus-aiml-profx-01',
        azureOpenAIApiDeploymentName: 'text-embedding-ada-002',
        azureOpenAIApiVersion: '2024-12-01-preview',
    });
    
    console.log('✓ Embeddings configured\n');
    
    // ========================================================================
    // Step 3b: Test Embeddings
    // ========================================================================
    console.log('Step 3b: Testing embeddings with sample chunks...');
    
    const vector1 = await embeddings.embedQuery(allSplits[0].pageContent);
    const vector2 = await embeddings.embedQuery(allSplits[1].pageContent);
    
    console.log(`✓ Generated vectors of length ${vector1.length}`);
    console.log(`First 10 values of vector1: ${vector1.slice(0, 10).map(v => v.toFixed(4)).join(', ')}\n`);
    
    // ========================================================================
    // Step 4: Create Vector Store
    // ========================================================================
    console.log('Step 4: Creating vector store...');
    
    const vectorStore = new MemoryVectorStore(embeddings);
    
    console.log('✓ Vector store created\n');
    
    // ========================================================================
    // Step 5: Index Documents
    // ========================================================================
    console.log('Step 5: Indexing documents in vector store...');
    console.log('⚠️  This may take 1-2 minutes as embeddings are generated for all chunks...\n');
    
    await vectorStore.addDocuments(allSplits);
    
    console.log(`✓ Successfully indexed ${allSplits.length} document chunks\n`);
    
    // ========================================================================
    // Step 6: Similarity Search
    // ========================================================================
    console.log('Step 6: Performing similarity search...');
    console.log('Query: "How many distribution centers does Nike have in the US?"\n');
    
    const results1 = await vectorStore.similaritySearch(
        'How many distribution centers does Nike have in the US?',
        4
    );
    
    console.log('Top result:');
    console.log(results1[0].pageContent.substring(0, 300) + '...\n');
    
    // ========================================================================
    // Step 7: Similarity Search with Scores
    // ========================================================================
    console.log('Step 7: Similarity search with scores...');
    console.log('Query: "What was Nike\'s revenue in 2023?"\n');
    
    const results2 = await vectorStore.similaritySearchWithScore(
        "What was Nike's revenue in 2023?",
        4
    );
    
    const [doc, score] = results2[0];
    console.log(`Score: ${score.toFixed(4)} (lower = more similar)`);
    console.log('Document:');
    console.log(doc.pageContent.substring(0, 300) + '...\n');
    
    // ========================================================================
    // Step 8: Search with Pre-computed Embeddings
    // ========================================================================
    console.log('Step 8: Search with pre-computed embeddings...');
    console.log('Query: "How were Nike\'s margins impacted in 2023?"\n');
    
    const embedding = await embeddings.embedQuery(
        "How were Nike's margins impacted in 2023?"
    );
    
    const results3 = await vectorStore.similaritySearchVectorWithScore(embedding, 4);
    const [doc3, score3] = results3[0];
    
    console.log(`Score: ${score3.toFixed(4)}`);
    console.log('Document:');
    console.log(doc3.pageContent.substring(0, 300) + '...\n');
    
    // ========================================================================
    // Additional Examples
    // ========================================================================
    console.log('='.repeat(80));
    console.log('Additional Example Queries');
    console.log('='.repeat(80) + '\n');
    
    // Example 1: When was Nike incorporated?
    console.log('Query: "When was Nike incorporated?"');
    const results4 = await vectorStore.similaritySearch('When was Nike incorporated?', 2);
    console.log('Answer snippet:', results4[0].pageContent.substring(0, 200) + '...\n');
    
    // Example 2: Nike sustainability
    console.log('Query: "What are Nike\'s sustainability efforts?"');
    const results5 = await vectorStore.similaritySearch("What are Nike's sustainability efforts?", 2);
    console.log('Answer snippet:', results5[0].pageContent.substring(0, 200) + '...\n');
    
    // ========================================================================
    // Summary
    // ========================================================================
    console.log('='.repeat(80));
    console.log('Congratulations! 🎉');
    console.log('='.repeat(80));
    console.log("You've successfully built a semantic search system!");
    console.log('\nWhat you learned:');
    console.log('✅ Load and parse PDF documents');
    console.log('✅ Split large documents into meaningful chunks');
    console.log('✅ Generate embeddings using Azure OpenAI');
    console.log('✅ Store embeddings in a vector database');
    console.log('✅ Perform semantic similarity searches');
    console.log('✅ Understand similarity scores');
    console.log('✅ Work with pre-computed embeddings');
    console.log('\nNext Steps:');
    console.log('- Try different queries and explore the results');
    console.log('- Experiment with chunk sizes and overlap values');
    console.log('- Move on to the RAG exercise to build a Q&A system!');
}

// Run the main function
main().catch(console.error);
