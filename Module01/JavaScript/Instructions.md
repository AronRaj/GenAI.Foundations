# Module 01: Language Models and Generative AI Foundations

## Navigate to Module 01 - JavaScript Directory

Before setting up the project, make sure you're in the correct directory:

1. **Navigate to the Module 01 JavaScript directory**:

   ```bash
   cd Module01/JavaScript
   ```

2. **Verify you're in the correct location** by checking the contents:

   ```bash
   ls
   ```

   You should see files like `Instructions.md`, `langchain.js`, `package.json`, and a `Solution` folder.

## Setting Up the Node.js Project

When working on JavaScript/Node.js projects, it's a good practice to set up a local project with its own dependencies.

To set up the project, follow these steps:

1. **Install Node.js dependencies**:

   ```bash
   npm install
   ```

   This will install all the required packages listed in `package.json`.

2. **Verify installation**:

   ```bash
   npm list --depth=0
   ```

   You should see packages like `@langchain/openai`, `@langchain/core`, `dotenv`, and others.

By using a local `node_modules` folder, you ensure that your project has its own dependencies, separate from other projects and the global Node.js installation.

## Export Environment Variables

To run the JavaScript code in this module, you need to set up environment variables for your Azure OpenAI service. You can do this by exporting the variables in your terminal session.

```powershell
$env:AZURE_OPENAI_API_KEY="{your-api-key}"
```

Make sure to replace `{your-api-key}` with your actual Azure OpenAI API key.

### Alternative: Using a .env File

Instead of exporting environment variables in your terminal, you can create a `.env` file in the `Module01/JavaScript` directory:

1. Create a file named `.env` in the `Module01/JavaScript` directory
2. Add the following line to the file:

   ```text
   AZURE_OPENAI_API_KEY=your-api-key-here
   ```

3. Replace `your-api-key-here` with your actual API key
4. The `dotenv` package (included in `package.json`) will automatically load these variables

**Important**: Never commit the `.env` file to version control. It should be added to your `.gitignore` file.

## Exercise 1: LangChain Basics

### Overview

The `langchain.js` file introduces you to the fundamentals of using LangChain with Azure OpenAI in JavaScript. You'll learn how to:

1. **Set up secure environment variables** - Load API credentials safely
2. **Initialize an Azure OpenAI model** - Configure the LangChain chat model
3. **Send simple prompts** - Make basic API calls
4. **Work with message types** - Use SystemMessage and HumanMessage for structured conversations

### Learning Objectives

- Understand how to securely manage API credentials
- Learn the basic structure of LangChain's Azure OpenAI integration in JavaScript
- Explore the difference between system and user messages
- Understand key parameters like `temperature` and `topP`

### Key Concepts

#### Temperature and TopP Parameters

- **Temperature** (0.0 to 1.0): Controls randomness in responses
  - `0.0` = Deterministic, consistent outputs
  - `1.0` = Very creative, random outputs
  - Use lower values for factual tasks, higher for creative tasks

- **TopP** (0.0 to 1.0): Controls diversity via nucleus sampling
  - Lower values make responses more focused
  - Higher values allow more diverse word choices

#### Message Types in LangChain

- **SystemMessage**: Defines the AI's behavior, role, or instructions
  - Example: "You are a helpful translator" or "Translate English to Italian"
  
- **HumanMessage**: Represents the user's input or question
  - Example: "Hello!" or "What is the weather today?"

- **AIMessage**: The model's response (returned automatically)

### Exercise Steps

1. Open `langchain.js` in VS Code
2. Follow the instructions in each section (marked with Step 1, Step 2, etc.)
3. Complete the TODO sections with appropriate code
4. Run the file using Node.js: `node langchain.js`
5. Test individual steps by uncommenting the function calls
6. Compare your solution with `Solution/langchain-solution.js` when complete

### Running the Code

Run your code:

```bash
node langchain.js
```

### Expected Outcomes

By the end of this exercise, you should be able to:

- ✅ Load environment variables securely using `dotenv`
- ✅ Create and configure an `AzureChatOpenAI` model instance in JavaScript
- ✅ Send simple text prompts to the model and receive responses
- ✅ Structure conversations using system and user messages
- ✅ Understand how to control model behavior with `temperature` and `topP` parameters
- ✅ Work with async/await in Node.js for API calls

### Troubleshooting

**Issue**: `Cannot find module '@langchain/openai'`

- **Solution**: Make sure you've installed dependencies:

  ```bash
  npm install
  ```

**Issue**: `Authentication failed` or `Invalid API key`

- **Solution**: Verify your API key is correctly set in the environment variables or `.env` file

**Issue**: `Model not found` error

- **Solution**: Ensure the `model` parameter matches your Azure OpenAI deployment name

**Issue**: `SyntaxError: Cannot use import statement outside a module`

- **Solution**: Make sure `package.json` has `"type": "module"` set, or rename your file to `.mjs`

**Issue**: Code runs but no output appears

- **Solution**: Make sure you've uncommented the function calls at the bottom of `langchain.js`:
  ```javascript
  main().catch(console.error);
  ```

**Issue**: `TypeError: Cannot read properties of undefined`

- **Solution**: Check that your `.env` file is in the correct directory (`Module01/JavaScript`) and that the variable name matches exactly: `AZURE_OPENAI_API_KEY`

### Debugging Tips

- Use `console.log()` statements to check if variables are loaded correctly
- Test each step individually before running the full script
- Check the Node.js version: `node --version` (should be v18 or higher recommended)
- Review error messages carefully - they often point to the exact line with issues

### Additional Resources

- [LangChain.js Documentation](https://js.langchain.com/docs/get_started/introduction)
- [Azure OpenAI Service Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [LangChain.js Azure OpenAI Integration](https://js.langchain.com/docs/integrations/chat/azure)
