/**
 * Semantic Search with LangChain and Azure OpenAI
 * 
 * This script demonstrates how to build a semantic search system using vector embeddings.
 * Unlike traditional keyword-based search, semantic search understands the **meaning** of
 * queries and documents, enabling more intelligent and context-aware information retrieval.
 * 
 * What is Semantic Search?
 * ========================
 * Semantic search uses machine learning models to convert text into numerical vectors
 * (embeddings) that capture semantic meaning. Documents with similar meanings will have
 * similar vector representations, allowing us to find relevant information based on
 * conceptual similarity rather than just keyword matching.
 * 
 * Workflow Overview:
 * ==================
 * 1. Load Documents: Import PDF documents into processable format
 * 2. Split Text: Divide large documents into smaller, focused chunks
 * 3. Generate Embeddings: Convert text chunks into vector representations
 * 4. Store Vectors: Index embeddings in a vector database
 * 5. Search: Query the system to find semantically similar content
 * 
 * Let's dive into each step!
 */

// ============================================================================
// Step 1: Loading Documents
// ============================================================================
// Document loading is the foundation of any information retrieval system.
// We'll load a PDF file containing Nike's 10-K financial report from 2023.
//
// Why PDFs?
// - Common format for reports, papers, and documentation
// - Contains structured and unstructured data
// - Requires specialized parsing to extract text accurately
//
// Your Task:
// Import the PDFLoader class from LangChain and load the PDF document
// located at "../data/nke-10k-2023.pdf"
//
// Steps:
// 1. Import PDFLoader from @langchain/community/document_loaders/fs/pdf
// 2. Create a variable filePath with the value "../data/nke-10k-2023.pdf"
// 3. Create a loader instance: const loader = new PDFLoader(filePath)
// 4. Call load() method to extract all pages: const docs = await loader.load()
// 5. Log the number of documents loaded: console.log(docs.length)
//
// Expected Output: A number representing the total pages in the PDF (around 110-120)
// ============================================================================

// TODO: Import PDFLoader from @langchain/community/document_loaders/fs/pdf


// TODO: Set filePath variable to "../data/nke-10k-2023.pdf"


// TODO: Create a function to load documents


// ============================================================================
// Step 1b: Understanding Document Structure
// ============================================================================
// Each Document object created by PDFLoader contains:
// - pageContent: The string content of the page (all text extracted)
// - metadata: An object with:
//   - source: File path to the original PDF
//   - pdf.pageNumber: Page number (1-indexed in JS, vs 0-indexed in Python)
//
// Your Task:
// Inspect the first document to understand its structure.
//
// Steps:
// 1. Log the first 200 characters of the first document's content
// 2. Log the metadata of the first document
//
// Expected Output:
// - A preview of text from the first page
// - Metadata showing the source file path and page number
// ============================================================================

// TODO: Add code to print first 200 characters of first document


// TODO: Add code to print metadata of first document


// ============================================================================
// Step 2: Document Splitting Strategy
// ============================================================================
// Why Split Documents?
//
// Problem: A full PDF page is often too large and contains multiple topics.
// - Mixing different concepts in one chunk dilutes the semantic meaning
// - Large chunks make it harder to pinpoint specific information
// - Retrieval accuracy suffers when relevant details are buried in context
//
// Solution: Split documents into smaller, focused chunks.
//
// Your Task:
// Use RecursiveCharacterTextSplitter to split documents into manageable chunks.
//
// Steps:
// 1. Import RecursiveCharacterTextSplitter from @langchain/textsplitters
// 2. Create a text splitter with these parameters:
//    - chunkSize: 1000 (target 1000 characters per chunk)
//    - chunkOverlap: 200 (overlap consecutive chunks by 200 characters)
// 3. Split the documents: const allSplits = await textSplitter.splitDocuments(docs)
// 4. Log the number of chunks created
//
// Why "Recursive"?
// The splitter tries to split on natural boundaries in this order:
// 1. Paragraphs (double newlines)
// 2. Sentences (single newlines)
// 3. Words (spaces)
// 4. Characters (as last resort)
//
// Expected Output: A number much larger than the original page count (500-800 chunks)
// ============================================================================

// TODO: Import RecursiveCharacterTextSplitter


// TODO: Create text splitter with appropriate parameters


// TODO: Split documents and log the count


// ============================================================================
// Step 3: Configure Azure OpenAI Embeddings
// ============================================================================
// Embeddings are the heart of semantic search - they convert text into
// numerical vectors that capture meaning.
//
// What are Embeddings?
// - Input: Text string (query or document)
// - Output: Vector of numbers (e.g., 1536 dimensions for text-embedding-ada-002)
// - Property: Similar meanings → Similar vectors
//
// Your Task:
// Set up Azure OpenAI embeddings to convert text into vectors.
//
// Steps:
// 1. Import dotenv and configure it at the top of the file
// 2. Import AzureOpenAIEmbeddings from @langchain/openai
// 3. Create an embeddings instance with:
//    - azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY
//    - azureOpenAIApiInstanceName: "aoi-ext-eus-aiml-profx-01"
//    - azureOpenAIApiDeploymentName: "text-embedding-ada-002"
//    - azureOpenAIApiVersion: "2024-12-01-preview"
//
// Security Note: Never hardcode API keys! Always use environment variables.
//
// Expected Output: No output, but the embeddings object will be ready to use
// ============================================================================

// TODO: Import dotenv and configure (add at the top of file)
// import { config } from 'dotenv';
// config();

// TODO: Import AzureOpenAIEmbeddings


// TODO: Create embeddings instance


// ============================================================================
// Step 3b: Test the Embeddings Model
// ============================================================================
// Let's verify the embeddings are working by converting two document chunks
// into vectors.
//
// Your Task:
// Generate embeddings for the first two document chunks and verify they work.
//
// Steps:
// 1. Use embeddings.embedQuery() to convert the first chunk to a vector
// 2. Do the same for the second chunk
// 3. Verify both vectors have the same length
// 4. Log the vector length
// 5. Log the first 10 values of vector1
//
// Expected Output:
// - Message showing vectors of length 1536
// - An array of 10 floating-point numbers
// ============================================================================

// TODO: Generate embeddings for first two chunks


// TODO: Verify vectors have same length and log results


// ============================================================================
// Step 4: Initialize the Vector Store
// ============================================================================
// Vector Stores are specialized databases optimized for storing and searching
// high-dimensional vectors.
//
// What is MemoryVectorStore?
// - Type: In-memory storage (not persisted to disk)
// - Speed: Fast for development and prototyping
// - Scope: Data exists only during the session
// - Best For: Testing, small datasets, demonstrations
//
// Your Task:
// Create an in-memory vector store to hold our document embeddings.
//
// Steps:
// 1. Import MemoryVectorStore from @langchain/core/vectorstores
// 2. Create a vector store instance: const vectorStore = new MemoryVectorStore(embeddings)
//
// Production Alternatives:
// - Chroma: Local, persistent vector database
// - Pinecone: Managed cloud vector database
// - Azure AI Search: Azure's vector search service
//
// Expected Output: No output, but the vector store is ready
// ============================================================================

// TODO: Import MemoryVectorStore


// TODO: Create vector store instance


// ============================================================================
// Step 5: Index Documents in the Vector Store
// ============================================================================
// Indexing is the process of storing documents with their embeddings for
// later retrieval.
//
// What happens during indexing:
// 1. For each document chunk:
//    - Send the text to the embeddings model
//    - Receive back a 1536-dimensional vector
//    - Store both the text and vector in the database
//
// Your Task:
// Add all document chunks to the vector store.
//
// Steps:
// 1. Call vectorStore.addDocuments() with the allSplits array
// 2. Log a message when indexing is complete
//
// Performance Note: This may take 1-2 minutes as it makes API calls for
// each chunk.
//
// Expected Output: Confirmation message after indexing completes
// ============================================================================

// TODO: Add documents to vector store


// ============================================================================
// Step 6: Perform Your First Similarity Search
// ============================================================================
// Semantic search in action! Let's query the system to find information.
//
// How Similarity Search Works:
// 1. Convert Query: The question is converted to an embedding vector
// 2. Compare Vectors: The system compares query vector to all stored vectors
// 3. Calculate Similarity: Uses cosine similarity or distance metrics
// 4. Rank Results: Returns the most similar documents (default: top 4)
//
// Your Task:
// Search for information about Nike's distribution centers.
//
// Steps:
// 1. Call vectorStore.similaritySearch() with the query
// 2. Log the first result
//
// Why this is powerful:
// - No exact keyword matching required
// - Understands semantic relationships
// - Finds relevant content with different wording
//
// Expected Output: The most relevant document chunk about distribution centers
// ============================================================================

// TODO: Perform similarity search


// ============================================================================
// Step 7: Similarity Search with Confidence Scores
// ============================================================================
// Understanding search quality by examining similarity scores alongside results.
//
// What are Similarity Scores?
// - Purpose: Quantify how well each result matches the query
// - Range: Depends on the distance metric used
// - Interpretation: Lower scores = higher similarity (for distance metrics)
//
// Your Task:
// Search with scores to understand result quality.
//
// Steps:
// 1. Use vectorStore.similaritySearchWithScore() to search
// 2. Extract the first document and score from results
// 3. Log both the score and the document
//
// Why Scores Matter:
// - Filtering: Set thresholds to exclude low-quality matches
// - Ranking: Sort results by relevance
// - Confidence: Determine if results are trustworthy
//
// Expected Output: A score and the most relevant document chunk
// ============================================================================

// TODO: Perform similarity search with scores


// ============================================================================
// Step 8: Search with Pre-computed Embeddings
// ============================================================================
// Advanced technique: Search using vectors directly instead of text queries.
//
// Why Use Pre-computed Embeddings?
// - Performance: Generate embedding once, reuse for multiple searches
// - Advanced Workflows: Modify/combine embeddings
// - Cross-modal Search: Use embeddings from different sources
//
// Your Task:
// Perform a two-step search using pre-computed embeddings.
//
// Steps:
// 1. Generate an embedding for the query using embeddings.embedQuery()
// 2. Search using vectorStore.similaritySearchVectorWithScore()
// 3. Log the results
//
// Use Case: Especially useful for search APIs, recommendation systems,
// and multi-step search pipelines.
//
// Expected Output: Same quality results with more control over embeddings
// ============================================================================

// TODO: Generate embedding and search with vector


// ============================================================================
// Main Execution Function
// ============================================================================
async function main() {
    console.log('\\n='.repeat(80));
    console.log('Semantic Search with LangChain and Azure OpenAI');
    console.log('='.repeat(80) + '\\n');

    // TODO: Call all your functions here in order
    // 1. Load documents
    // 2. Inspect first document
    // 3. Split documents
    // 4. Test embeddings
    // 5. Create vector store
    // 6. Add documents to vector store
    // 7. Perform searches

    console.log('\\n' + '='.repeat(80));
    console.log('Congratulations! 🎉');
    console.log('='.repeat(80));
    console.log('You\\'ve successfully built a semantic search system!');
    console.log('\\nWhat you\\'ve learned:');
    console.log('✅ Load and parse PDF documents');
    console.log('✅ Split large documents into meaningful chunks');
    console.log('✅ Generate embeddings using Azure OpenAI');
    console.log('✅ Store embeddings in a vector database');
    console.log('✅ Perform semantic similarity searches');
    console.log('✅ Understand similarity scores');
    console.log('✅ Work with pre-computed embeddings');
}

// Run the main function
main().catch(console.error);
