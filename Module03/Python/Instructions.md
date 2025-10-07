# Module 03: Retrieval Augmented Generation (RAG) and Semantic Search

## Navigate to Module 03 - Python Directory

Before setting up the virtual environment, make sure you're in the correct directory:

1. **Navigate to the Module 03 Python directory**:

   ```bash
   cd Module03/Python
   ```

2. **Verify you're in the correct location** by checking the contents:

   ```bash
   ls
   ```

   You should see files like `Instructions.md`, `rag-langchain.ipynb`, `semantic-search.ipynb`, and `requirements.txt`.

## Setting Up a Virtual Environment

When working on Python projects, it's a good practice to set up a virtual environment. A virtual environment allows you to create an isolated space for your project, where you can manage dependencies without affecting the global Python installation.

To set up a virtual environment, follow these steps:

1. **Install `virtualenv`** (if not already installed):

   ```bash
   pip install virtualenv
   ```

2. **Create a new virtual environment**:

   ```bash
   python -m venv .venv-module03
   ```

3. **Activate the virtual environment**:
   - On Windows:

     ```bash
     .venv-module03\Scripts\Activate.ps1
     ```

   - On macOS and Linux:

     ```bash
     source .venv-module03/bin/activate
     ```

4. **Install project dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

By using a virtual environment, you can ensure that your project has its own dependencies, separate from other projects and the global Python installation.

## Deactivating the Virtual Environment

When you are done working in the virtual environment, you can deactivate it by simply running:

```bash
deactivate
```

## Export Environment Variables

To run the Python scripts in this module, you need to set up environment variables for your Azure OpenAI service. You can do this by exporting the variables in your terminal session.

```bash
$env:AZURE_OPENAI_API_KEY="{your-api-key}"
```

Make sure to replace `{your-api-key}` with your actual Azure OpenAI API key.

### Alternative: Using a .env File

Instead of exporting environment variables in your terminal, you can create a `.env` file in the `Module03/Python` directory:

1. Create a file named `.env` in the `Module03/Python` directory
2. Add the following line to the file:

   ```text
   AZURE_OPENAI_API_KEY=your-api-key-here
   ```

3. Replace `your-api-key-here` with your actual API key
4. The `python-dotenv` package (included in `requirements.txt`) will automatically load these variables

**Important**: Never commit the `.env` file to version control. It should be added to your `.gitignore` file.

## Exercise 1: Semantic Search

### Overview

The `semantic-search.ipynb` notebook introduces you to semantic search concepts. You'll learn how to:

1. **Understand vector embeddings** - Convert text to numerical representations
2. **Implement similarity search** - Find semantically similar content
3. **Work with vector databases** - Store and query embeddings efficiently

### Instructions

1. Open `semantic-search.ipynb` in Jupyter or VS Code
2. Follow the notebook cells in order
3. Run each cell and observe the outputs
4. Experiment with different queries and data

## Exercise 2: RAG with LangChain

### Overview

The `rag-langchain.ipynb` notebook demonstrates Retrieval Augmented Generation (RAG) using LangChain. You'll learn how to:

1. **Load and process documents** - Prepare data for RAG
2. **Create vector stores** - Build searchable knowledge bases
3. **Implement RAG pipelines** - Combine retrieval with generation
4. **Query your data** - Ask questions about your documents

### Instructions

1. Open `rag-langchain.ipynb` in Jupyter or VS Code
2. Follow the notebook cells in order
3. Run each cell and observe the outputs
4. Experiment with different documents and queries

## Additional Resources

- [LangChain Documentation](https://python.langchain.com/docs/get_started/introduction)
- [Azure OpenAI Service Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Vector Databases Overview](https://www.pinecone.io/learn/vector-database/)
