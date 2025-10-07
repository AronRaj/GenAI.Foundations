/**
 * RAG (Retrieval-Augmented Generation) with LangChain
 * 
 * This script demonstrates how to build a complete RAG pipeline using LangChain and
 * Azure OpenAI. RAG enhances language model responses by retrieving relevant context
 * from a knowledge base before generating answers.
 * 
 * What is RAG?
 * ============
 * Retrieval-Augmented Generation (RAG) is a technique that combines:
 * - Retrieval: Finding relevant information from a knowledge base
 * - Generation: Using an LLM to create answers based on retrieved context
 * 
 * This approach helps LLMs provide accurate, grounded responses without hallucinating.
 * 
 * Workflow Overview:
 * ==================
 * 1. Environment Setup: Load API credentials securely
 * 2. Initialize Embeddings: Create an embedding model for text-to-vector conversion
 * 3. Initialize LLM: Set up the language model for generating responses
 * 4. Create Vector Store: Initialize an in-memory vector database
 * 5. Load Documents: Fetch and parse web content
 * 6. Split Documents: Break large documents into smaller chunks
 * 7. Store Embeddings: Add document chunks to the vector store
 * 8. Create RAG Chain: Build a retrieval-augmented generation workflow
 * 9. Test the System: Query the RAG system and stream results
 * 
 * Let's build an intelligent question-answering system!
 */

// ============================================================================
// Step 1: Environment Setup and API Key Management
// ============================================================================
// This section handles the secure loading of API credentials.
//
// Your Task:
// Set up environment variables for Azure OpenAI API access.
//
// Steps:
// 1. Import dotenv: import { config } from 'dotenv'
// 2. Call config() to load environment variables from .env file
// 3. Verify the API key is loaded (optional debugging step)
//
// Security Best Practice:
// - Never hardcode API keys in code
// - Use environment variables or .env files
// - Works both locally and in production
//
// Expected Output: No visible output, but API key will be available
// ============================================================================

// TODO: Import dotenv and configure


// TODO: Verify API key is loaded (optional)


// ============================================================================
// Step 2: Initialize the Embedding Model
// ============================================================================
// Embeddings convert text into numerical vectors that capture semantic meaning.
//
// Your Task:
// Configure Azure OpenAI embeddings for converting text to vectors.
//
// Steps:
// 1. Import AzureOpenAIEmbeddings from @langchain/openai
// 2. Create an embeddings instance with these parameters:
//    - azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY
//    - azureOpenAIApiInstanceName: "aoi-ext-eus-aiml-profx-01"
//    - azureOpenAIApiDeploymentName: "text-embedding-ada-002"
//    - azureOpenAIApiVersion: "2024-12-01-preview"
//
// Why embeddings matter in RAG:
// Similar concepts have similar vector representations, allowing us to find
// relevant documents by comparing vector similarity rather than exact keywords.
//
// Model Details:
// - text-embedding-ada-002: Azure OpenAI's powerful embedding model
// - Output: 1536-dimensional vectors
// - Use Cases: Semantic search, clustering, similarity comparison
//
// Expected Output: No output, but embeddings object will be ready
// ============================================================================

// TODO: Import AzureOpenAIEmbeddings


// TODO: Create embeddings instance


// ============================================================================
// Step 3: Initialize the Language Model (LLM)
// ============================================================================
// Large Language Models (LLMs) generate human-like text responses.
//
// Your Task:
// Set up Azure Chat OpenAI for generating answers.
//
// Steps:
// 1. Import AzureChatOpenAI from @langchain/openai
// 2. Create an LLM instance with these parameters:
//    - azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY
//    - azureOpenAIApiInstanceName: "aoi-ext-eus-aiml-profx-01"
//    - azureOpenAIApiDeploymentName: "gpt-4o"
//    - azureOpenAIApiVersion: "2024-12-01-preview"
//
// Role in RAG:
// The LLM will generate the final answer by:
// 1. Receiving the user's question
// 2. Receiving relevant context retrieved from the vector store
// 3. Synthesizing a response that combines both
//
// Model Details:
// - gpt-4o: GPT-4 Optimized version
// - Capabilities: Advanced reasoning, following instructions, grounded responses
//
// Expected Output: No output, but LLM object will be ready
// ============================================================================

// TODO: Import AzureChatOpenAI


// TODO: Create LLM instance


// ============================================================================
// Step 4: Create the Vector Store
// ============================================================================
// Vector Stores store document embeddings and enable fast similarity searches.
//
// Your Task:
// Initialize an in-memory vector store for storing document embeddings.
//
// Steps:
// 1. Import MemoryVectorStore from @langchain/core/vectorstores
// 2. Create a vector store instance: const vectorStore = new MemoryVectorStore(embeddings)
//
// What is MemoryVectorStore?
// - Stores vectors in RAM (not persisted to disk)
// - Fast for development and small datasets
// - Automatically uses the embeddings model we configured earlier
// - Data exists only during the session
//
// How it works:
// 1. Documents are converted to embeddings using our embedding model
// 2. Embeddings are stored along with the original text
// 3. When queried, finds most similar vectors using cosine similarity
//
// Production Alternatives:
// - Chroma: Local, persistent vector database
// - Pinecone: Managed cloud vector database
// - Azure AI Search: Azure's vector search service
//
// Expected Output: No output, but vector store is ready
// ============================================================================

// TODO: Import MemoryVectorStore


// TODO: Create vector store instance


// ============================================================================
// Step 5: Load Documents from the Web
// ============================================================================
// Document Loading is the first step in building a knowledge base for RAG.
//
// Your Task:
// Load content from a blog post about AI agents.
//
// Steps:
// 1. Import CheerioWebBaseLoader from @langchain/community/document_loaders/web/cheerio
// 2. Create a loader with the URL: "https://lilianweng.github.io/posts/2023-06-23-agent/"
// 3. Load the documents: const docs = await loader.load()
// 4. Verify one document was loaded
// 5. Log the total characters loaded
//
// Why load from web?
// - Demonstrates real-world use case
// - Content is automatically fetched and parsed
// - No local files needed
//
// Note: CheerioWebBaseLoader is the JavaScript equivalent of Python's WebBaseLoader
// It automatically parses HTML and extracts text content.
//
// Expected Output: Message showing total characters loaded (several thousand)
// ============================================================================

// TODO: Import CheerioWebBaseLoader


// TODO: Create loader and load documents


// TODO: Verify one document and log character count


// ============================================================================
// Step 5b: Preview the Document Content
// ============================================================================
// Let's inspect the loaded content to verify it was extracted correctly.
//
// Your Task:
// Log the first 500 characters of the loaded document.
//
// Expected Output: Preview of blog post content showing title and beginning
// ============================================================================

// TODO: Log first 500 characters of document content


// ============================================================================
// Step 6: Split Documents into Chunks
// ============================================================================
// Why split documents?
// - LLMs have context window limits (maximum input size)
// - Smaller chunks create more precise embeddings
// - Retrieval can target specific relevant sections
//
// Your Task:
// Split the large blog post into manageable chunks.
//
// Steps:
// 1. Import RecursiveCharacterTextSplitter from @langchain/textsplitters
// 2. Create a text splitter with:
//    - chunkSize: 1000
//    - chunkOverlap: 200
// 3. Split the documents: const allSplits = await textSplitter.splitDocuments(docs)
// 4. Log the number of chunks
//
// The RecursiveCharacterTextSplitter:
// - Tries to split on natural boundaries (paragraphs, sentences, words)
// - Falls back to character-level splitting if needed
// - Preserves semantic coherence within chunks
//
// Expected Output: Message showing blog post split into 40-80 chunks
// ============================================================================

// TODO: Import RecursiveCharacterTextSplitter


// TODO: Create text splitter and split documents


// TODO: Log number of chunks created


// ============================================================================
// Step 7: Add Documents to Vector Store
// ============================================================================
// Indexing the documents by converting them to embeddings and storing them.
//
// Your Task:
// Store all document chunks in the vector store with their embeddings.
//
// Steps:
// 1. Call vectorStore.addDocuments() with the split documents
// 2. Log a message when complete
//
// What happens during indexing:
// 1. Each document chunk is sent to the embedding model
// 2. The embedding model returns a vector for each chunk
// 3. The vector store saves both the embedding and the original text
//
// The Magic:
// Documents with similar semantic meaning will have similar embedding vectors.
// When we search with a question, the vector store finds chunks with similar
// embeddings, enabling semantic search (meaning-based) not keyword matching.
//
// Performance Note: This may take 30-60 seconds for API calls
//
// Expected Output: Confirmation message after indexing completes
// ============================================================================

// TODO: Add documents to vector store


// ============================================================================
// Step 8: Create the RAG Chain
// ============================================================================
// Building the complete RAG pipeline using LangChain Expression Language (LCEL).
//
// Your Task:
// Create a retrieval-augmented generation chain.
//
// Steps:
// 1. Import required modules:
//    - ChatPromptTemplate from @langchain/core/prompts
//    - RunnableSequence, RunnablePassthrough from @langchain/core/runnables
//    - StringOutputParser from @langchain/core/output_parsers
// 2. Create a retriever: const retriever = vectorStore.asRetriever()
// 3. Define a prompt template with placeholders for context and question
// 4. Create a chain that:
//    a. Retrieves context documents
//    b. Formats them as a string
//    c. Passes to the prompt template
//    d. Sends to the LLM
//    e. Parses the output
//
// The RAG Chain Flow:
// Question → Retrieve Context → Format Prompt → Generate Answer → Parse Output
//
// Example Chain Structure:
// const ragChain = RunnableSequence.from([
//   {
//     context: (input) => retriever.invoke(input.question).then(docs => 
//       docs.map(d => d.pageContent).join('\n\n')
//     ),
//     question: (input) => input.question
//   },
//   prompt,
//   llm,
//   new StringOutputParser()
// ]);
//
// Expected Output: No output, but chain is ready to process questions
// ============================================================================

// TODO: Import required modules for RAG chain


// TODO: Create retriever from vector store


// TODO: Define prompt template


// TODO: Create RAG chain using RunnableSequence


// ============================================================================
// Step 9: Test the RAG System
// ============================================================================
// First Query - Testing the complete pipeline with a sample question.
//
// Your Task:
// Invoke the RAG chain with a question and examine the results.
//
// Steps:
// 1. Invoke the chain with: "What is Task Decomposition?"
// 2. Log the answer
//
// Execution Flow:
// 1. Input: Question about task decomposition
// 2. Retrieve Step: Converts question to embedding, finds similar chunks
// 3. Generate Step: Formats prompt with question + context, LLM generates answer
// 4. Output: Complete answer based on retrieved context
//
// This is RAG in action! The LLM answers based on retrieved context,
// not just its training data.
//
// Expected Output: A concise explanation of Task Decomposition
// ============================================================================

// TODO: Invoke RAG chain with question


// ============================================================================
// Step 10: Stream the Response
// ============================================================================
// Streaming Mode - Watch the LLM generate the response in real-time.
//
// Your Task:
// Stream the LLM's response as it's generated, token by token.
//
// Steps:
// 1. Use the stream() method on the chain
// 2. Iterate through chunks and print them
//
// What is streaming?
// - Shows individual tokens/chunks as they're generated by the LLM
// - Similar to how ChatGPT displays responses word-by-word
// - Better user experience in chat interfaces
//
// Use Cases:
// - User Experience: Display progressive responses
// - Real-time Feedback: Users see that processing is happening
// - Early Termination: Can stop generation if answer is sufficient
//
// Expected Output: Answer text appearing gradually
// ============================================================================

// TODO: Stream the response and log each chunk


// ============================================================================
// Main Execution Function
// ============================================================================
async function main() {
    console.log('\\n' + '='.repeat(80));
    console.log('RAG (Retrieval-Augmented Generation) with LangChain');
    console.log('='.repeat(80) + '\\n');

    // TODO: Call all your functions here in order
    // 1. Load documents from web
    // 2. Preview document content
    // 3. Split documents
    // 4. Add to vector store
    // 5. Create RAG chain
    // 6. Test with a question
    // 7. Stream a response

    console.log('\n' + '='.repeat(80));
    console.log('Congratulations! 🎉');
    console.log('='.repeat(80));
    console.log("You've built a complete RAG system!");
    console.log("\nWhat you've accomplished:");
    console.log('✅ Set up secure API key management');
    console.log('✅ Configured Azure OpenAI embeddings and LLM');
    console.log('✅ Created a vector store for semantic search');
    console.log('✅ Loaded and parsed web content');
    console.log('✅ Split documents into optimal chunks');
    console.log('✅ Indexed documents with embeddings');
    console.log('✅ Built a complete RAG pipeline');
    console.log('✅ Tested with queries');
    console.log('✅ Implemented streaming responses');
    console.log('\nNext Steps:');
    console.log('- Try different questions about AI agents');
    console.log('- Experiment with chunk sizes and retrieval parameters');
    console.log('- Add more documents to the knowledge base');
    console.log('- Deploy as a web API or chatbot');
}

// Run the main function
main().catch(console.error);
