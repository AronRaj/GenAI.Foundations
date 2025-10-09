# Module 04: Advanced RAG with LangGraph

## Navigate to Module 04 - Python Directory

Before setting up the virtual environment, make sure you're in the correct directory:

1. **Navigate to the Module 04 Python directory**:

   ```bash
   cd Module04/Python
   ```

2. **Verify you're in the correct location** by checking the contents:

   ```bash
   ls
   ```

   You should see files like `Instructions.md`, `rag-langgraph.ipynb`, and `requirements.txt`.

## Setting Up a Virtual Environment

When working on Python projects, it's a good practice to set up a virtual environment. A virtual environment allows you to create an isolated space for your project, where you can manage dependencies without affecting the global Python installation.

To set up a virtual environment, follow these steps:

1. **Install `virtualenv`** (if not already installed):

   ```bash
   pip install virtualenv
   ```

2. **Create a new virtual environment**:

   ```bash
   python -m venv .venv-module04
   ```

3. **Activate the virtual environment**:
   - On Windows:

     ```bash
     .venv-module04\Scripts\Activate.ps1
     ```

   - On macOS and Linux:

     ```bash
     source .venv-module04/bin/activate
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

Instead of exporting environment variables in your terminal, you can create a `.env` file in the `Module04/Python` directory:

1. Create a file named `.env` in the `Module04/Python` directory
2. Add the following line to the file:

   ```text
   AZURE_OPENAI_API_KEY=your-api-key-here
   ```

3. Replace `your-api-key-here` with your actual API key
4. The `python-dotenv` package (included in `requirements.txt`) will automatically load these variables

**Important**: Never commit the `.env` file to version control. It should be added to your `.gitignore` file.

## Exercise: Advanced RAG with LangGraph

### Overview

The `rag-langgraph.ipynb` notebook demonstrates advanced Retrieval Augmented Generation (RAG) using LangGraph. You'll learn how to:

1. **Build complex RAG workflows** - Create sophisticated document processing pipelines
2. **Implement graph-based reasoning** - Use LangGraph for multi-step reasoning
3. **Handle complex queries** - Process questions that require multiple retrieval steps
4. **Optimize RAG performance** - Implement advanced techniques for better results

### Instructions

1. Open `rag-langgraph.ipynb` in Jupyter or VS Code
2. Follow the notebook cells in order
3. Run each cell and observe the outputs
4. Experiment with different documents and complex queries

## Additional Resources

- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [LangChain Documentation](https://python.langchain.com/docs/get_started/introduction)
- [Azure OpenAI Service Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Advanced RAG Techniques](https://blog.langchain.dev/improving-rag-performance/)