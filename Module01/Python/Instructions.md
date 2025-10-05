# Module 01: Language Models and Generative AI Foundations

## Navigate to Module 01 - Python Directory

Before setting up the virtual environment, make sure you're in the correct directory:

1. **Navigate to the Module 01 Python directory**:

   ```bash
   cd Module01/Python
   ```

2. **Verify you're in the correct location** by checking the contents:

   ```bash
   ls
   ```

   You should see files like `Instructions.md`, `langchain.ipynb`, `langgraph.ipynb`, and `requirements.txt`.

## Setting Up a Virtual Environment

When working on Python projects, it's a good practice to set up a virtual environment. A virtual environment allows you to create an isolated space for your project, where you can manage dependencies without affecting the global Python installation.

To set up a virtual environment, follow these steps:

1. **Install `virtualenv`** (if not already installed):

   ```bash
   pip install virtualenv
   ```

2. **Create a new virtual environment**:

   ```bash
   python -m venv .venv-module01
   ```

3. **Activate the virtual environment**:
   - On Windows:

     ```bash
     .venv-module01\Scripts\Activate.ps1
     ```

   - On macOS and Linux:

     ```bash
     source .venv-module01/bin/activate
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

Instead of exporting environment variables in your terminal, you can create a `.env` file in the `Module01/Python` directory:

1. Create a file named `.env` in the `Module01/Python` directory
2. Add the following line to the file:

   ```text
   AZURE_OPENAI_API_KEY=your-api-key-here
   ```

3. Replace `your-api-key-here` with your actual API key
4. The `python-dotenv` package (included in `requirements.txt`) will automatically load these variables

**Important**: Never commit the `.env` file to version control. It should be added to your `.gitignore` file.

## Exercise 1: LangChain Basics

### Overview

The `langchain.ipynb` notebook introduces you to the fundamentals of using LangChain with Azure OpenAI. You'll learn how to:

1. **Set up secure environment variables** - Load API credentials safely
2. **Initialize an Azure OpenAI model** - Configure the LangChain chat model
3. **Send simple prompts** - Make basic API calls
4. **Work with message types** - Use SystemMessage and HumanMessage for structured conversations

### Learning Objectives

- Understand how to securely manage API credentials
- Learn the basic structure of LangChain's Azure OpenAI integration
- Explore the difference between system and user messages
- Understand key parameters like `temperature` and `top_p`

### Key Concepts

#### Temperature and Top_p Parameters

- **Temperature** (0.0 to 1.0): Controls randomness in responses
  - `0.0` = Deterministic, consistent outputs
  - `1.0` = Very creative, random outputs
  - Use lower values for factual tasks, higher for creative tasks

- **Top_p** (0.0 to 1.0): Controls diversity via nucleus sampling
  - Lower values make responses more focused
  - Higher values allow more diverse word choices

#### Message Types in LangChain

- **SystemMessage**: Defines the AI's behavior, role, or instructions
  - Example: "You are a helpful translator" or "Translate English to Italian"
  
- **HumanMessage**: Represents the user's input or question
  - Example: "Hello!" or "What is the weather today?"

- **AIMessage**: The model's response (returned automatically)

### Exercise Steps

1. Open `langchain.ipynb` in VS Code or Jupyter
2. Follow the instructions in each cell
3. Complete the TODO sections with appropriate code
4. Run each cell and observe the outputs
5. Compare your solution with `Solution/langchain-solution.ipynb` when complete

### Expected Outcomes

By the end of this exercise, you should be able to:

- ✅ Load environment variables securely using `python-dotenv`
- ✅ Create and configure an `AzureChatOpenAI` model instance
- ✅ Send simple text prompts to the model
- ✅ Structure conversations using system and user messages
- ✅ Understand how to control model behavior with parameters

### Troubleshooting

**Issue**: `ModuleNotFoundError: No module named 'langchain'`

- **Solution**: Make sure you've activated the virtual environment and installed dependencies:

  ```bash
  .venv-module01\Scripts\Activate.ps1
  pip install -r requirements.txt
  ```

**Issue**: `Authentication failed` or `Invalid API key`

- **Solution**: Verify your API key is correctly set in the environment variables or `.env` file

**Issue**: `Model not found` error

- **Solution**: Ensure the `model` parameter matches your Azure OpenAI deployment name

### Additional Resources

- [LangChain Documentation](https://python.langchain.com/docs/get_started/introduction)
- [Azure OpenAI Service Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [LangChain Azure OpenAI Integration](https://python.langchain.com/docs/integrations/chat/azure_chat_openai)