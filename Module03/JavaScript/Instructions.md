# Module 03: Retrieval Augmented Generation (RAG) and Semantic Search

## Navigate to Module 03 - JavaScript Directory

Before setting up the project, make sure you're in the correct directory:

1. **Navigate to the Module 03 JavaScript directory**:

   ```bash
   cd Module03/JavaScript
   ```

2. **Verify you're in the correct location** by checking the contents:

   ```bash
   dir
   ```

   You should see files like `Instructions.md`, `semantic-search.js`, `rag-langchain.js`, and `package.json`.

## Installing Dependencies

This module uses Node.js and npm to manage dependencies. Make sure you have Node.js installed (version 18 or higher recommended).

To install the project dependencies, follow these steps:

1. **Install npm packages**:

   ```bash
   npm install
   ```

This will install all the required packages specified in `package.json`, including:
- `@langchain/openai` - Azure OpenAI integration
- `@langchain/community` - Community integrations (PDF loaders, etc.)
- `@langchain/core` - Core LangChain functionality
- `@langchain/textsplitters` - Text splitting utilities
- `pdf-parse` - PDF parsing library
- `dotenv` - Environment variable management

## Export Environment Variables

To run the JavaScript scripts in this module, you need to set up environment variables for your Azure OpenAI service.

### Using a .env File (Recommended)

Create a `.env` file in the `Module03/JavaScript` directory:

1. Create a file named `.env` in the `Module03/JavaScript` directory
2. Add the following line to the file:

   ```text
   AZURE_OPENAI_API_KEY=your-api-key-here
   ```

3. Replace `your-api-key-here` with your actual API key
4. The `dotenv` package will automatically load these variables when you run the scripts

**Important**: Never commit the `.env` file to version control. It should be added to your `.gitignore` file.

### Alternative: Export in Terminal

You can also export environment variables in your PowerShell terminal:

```powershell
$env:AZURE_OPENAI_API_KEY="{your-api-key}"
```

Make sure to replace `{your-api-key}` with your actual Azure OpenAI API key.

## Exercise 1: Semantic Search

### Overview

The `semantic-search.js` script introduces you to semantic search concepts. You'll learn how to:

1. **Understand vector embeddings** - Convert text to numerical representations
2. **Implement similarity search** - Find semantically similar content
3. **Work with vector databases** - Store and query embeddings efficiently
4. **Load and process PDFs** - Extract text from PDF documents

### Instructions

1. Open `semantic-search.js` in your code editor
2. Follow the TODO comments in the file
3. Complete each section step by step
4. Run the script to test your implementation:

   ```bash
   node semantic-search.js
   ```

5. Compare your implementation with the solution in `Solution/semantic-search-solution.js`

### Key Concepts

- **Document Loading**: Using PDF loaders to extract text from documents
- **Text Splitting**: Breaking large documents into manageable chunks
- **Embeddings**: Converting text to vector representations
- **Vector Stores**: Storing and querying embeddings
- **Similarity Search**: Finding semantically similar content

## Exercise 2: RAG with LangChain

### Overview

The `rag-langchain.js` script demonstrates Retrieval Augmented Generation (RAG) using LangChain. You'll learn how to:

1. **Load and process documents** - Prepare data for RAG
2. **Create vector stores** - Build searchable knowledge bases
3. **Implement RAG pipelines** - Combine retrieval with generation
4. **Query your data** - Ask questions about your documents
5. **Stream responses** - Display real-time output from the LLM

### Instructions

1. Open `rag-langchain.js` in your code editor
2. Follow the TODO comments in the file
3. Complete each section step by step
4. Run the script to test your implementation:

   ```bash
   node rag-langchain.js
   ```

5. Compare your implementation with the solution in `Solution/rag-langchain-solution.js`

### Key Concepts

- **RAG Architecture**: Combining retrieval and generation
- **Vector Store Integration**: Using embeddings for retrieval
- **LLM Integration**: Generating answers with language models
- **Prompt Engineering**: Crafting effective prompts for RAG
- **Streaming Responses**: Real-time output display

## Running the Solutions

To run the solution files:

```bash
# Semantic Search Solution
node Solution/semantic-search-solution.js

# RAG Solution
node Solution/rag-langchain-solution.js
```

## Additional Resources

- [LangChain JS Documentation](https://js.langchain.com/docs/get_started/introduction)
- [Azure OpenAI Service Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Vector Databases Overview](https://www.pinecone.io/learn/vector-database/)
- [LangChain RAG Tutorial](https://js.langchain.com/docs/tutorials/rag)

## Troubleshooting

### Common Issues

1. **Module not found errors**: Make sure you've run `npm install`
2. **API key errors**: Verify your `.env` file is in the correct directory and contains the correct key
3. **PDF loading errors**: Ensure the PDF file exists at `../data/nke-10k-2023.pdf`
4. **Memory issues**: The in-memory vector store may use significant RAM for large documents

### Need Help?

- Check the solution files in the `Solution/` folder
- Review the Python notebooks for additional context
- Consult the LangChain JS documentation
