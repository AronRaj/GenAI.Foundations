# Module 04: Agentic RAG with LangGraph - JavaScript Implementation

## Navigate to Module 04 - JavaScript Directory

Before setting up the project, make sure you're in the correct directory:

1. **Navigate to the Module 04 JavaScript directory**:

   ```bash
   cd Module04/JavaScript
   ```

2. **Verify you're in the correct location** by checking the contents:

   ```bash
   dir
   ```

   You should see files like `Instructions.md`, `rag-langgraph.js`, `retail-usecase.js`, and `package.json`.

## Installing Dependencies

This module uses Node.js and npm to manage dependencies. Make sure you have Node.js installed (version 18 or higher recommended).

To install the project dependencies, follow these steps:

1. **Install npm packages**:

   ```bash
   npm install
   ```

This will install all the required packages specified in `package.json`, including:
- `@langchain/openai` - Azure OpenAI integration
- `@langchain/community` - Community integrations
- `@langchain/core` - Core LangChain functionality
- `@langchain/langgraph` - LangGraph for building stateful AI workflows
- `uuid` - For generating unique identifiers
- `dotenv` - Environment variable management

## Export Environment Variables

To run the JavaScript scripts in this module, you need to set up environment variables for your Azure OpenAI service.

### Using a .env File (Recommended)

Create a `.env` file in the `Module04/JavaScript` directory:

1. Create a file named `.env` in the `Module04/JavaScript` directory
2. Add the following line to the file:

   ```bash
   AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here
   ```

   Replace `your_azure_openai_api_key_here` with your actual Azure OpenAI API key.

### Using PowerShell

If you prefer to set environment variables directly in your terminal session:

```powershell
$env:AZURE_OPENAI_API_KEY="your_azure_openai_api_key_here"
```

### Using Command Prompt

```cmd
set AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here
```

## Module Overview

This module introduces **LangGraph** - a powerful framework for building stateful, multi-step AI applications that go beyond simple prompt-response interactions.

### What is LangGraph?

LangGraph extends LangChain with graph-based workflows that enable:
- **Stateful Conversations**: Maintain context across multiple interactions
- **Conditional Logic**: Make dynamic decisions based on intermediate results
- **Tool Integration**: Seamlessly incorporate external tools and APIs
- **Memory Management**: Persist conversation history across sessions
- **Multi-Agent Workflows**: Coordinate multiple AI agents working together

### What We'll Build

This module contains two comprehensive examples:

1. **📚 RAG LangGraph Agent** (`rag-langgraph.js`)
   - Custom LangGraph workflow with explicit state management
   - ReAct (Reasoning and Acting) pattern implementation
   - Tool integration for document retrieval
   - Memory persistence and conversation history
   - Graph visualization and workflow understanding

2. **🚚 Last-Mile Delivery Optimizer** (`retail-usecase.js`)
   - Real-world application using LangGraph for delivery optimization
   - Multiple specialized tools for different data sources
   - Complex decision-making workflows
   - Priority assessment and route optimization
   - Customer communication generation

### Key Concepts Covered

- **MessagesState**: LangGraph's built-in state for managing conversation history
- **Tools and Tool Nodes**: Functions the LLM can call to retrieve information
- **Conditional Edges**: Dynamic routing based on LLM decisions
- **Memory/Checkpointing**: Conversation persistence across sessions
- **Graph Visualization**: Understanding workflow structure
- **Multi-turn Conversations**: Handling follow-up questions with context
- **Agentic Behavior**: Building AI systems that can reason, plan, and act autonomously

## Running the Examples

### 1. RAG LangGraph Agent

This example demonstrates basic LangGraph concepts with document retrieval:

```bash
npm run rag
```

Or run the solution version:

```bash
npm run rag:solution
```

### 2. Retail Use Case - Last-Mile Delivery Optimizer

This example shows a complex real-world application:

```bash
npm run retail
```

Or run the solution version:

```bash
npm run retail:solution
```

## Understanding the Code Structure

### RAG LangGraph (`rag-langgraph.js`)
- **Environment Setup**: Secure API key management
- **Model Initialization**: Embeddings and chat models
- **Document Loading**: Web scraping and text processing
- **Vector Store**: Semantic search setup
- **Tool Creation**: Document retrieval tools
- **Graph Construction**: Building the workflow graph
- **Execution**: Running queries and conversations

### Retail Use Case (`retail-usecase.js`)
- **Mock Data Generation**: Realistic delivery scenarios
- **Specialized Tools**: Multiple tools for different data types
- **Complex Workflows**: Multi-step decision making
- **State Management**: Maintaining context across workflow steps
- **Real-world Application**: Practical AI system design

## Learning Objectives

By completing this module, you will:

1. **Understand LangGraph Architecture**: Learn how to build stateful AI workflows
2. **Master Tool Integration**: Create and use tools for external data access
3. **Implement State Management**: Handle conversation context and memory
4. **Build Agentic Systems**: Create AI that can reason, plan, and act
5. **Apply to Real Scenarios**: Use LangGraph for practical business applications
6. **Debug and Visualize**: Understand workflow execution and troubleshooting

## Next Steps

1. **Explore the Code**: Start with `rag-langgraph.js` to understand basic concepts
2. **Run the Examples**: Execute both scripts to see LangGraph in action
3. **Experiment**: Modify the prompts, tools, and workflows to see different behaviors
4. **Build Your Own**: Create custom workflows for your specific use cases

## Common Issues and Troubleshooting

### API Key Issues
- Ensure your `.env` file is in the correct directory
- Verify your Azure OpenAI API key is valid and has proper permissions
- Check that you're using the correct API version

### Dependency Issues
- Make sure Node.js version is 18 or higher
- Clear npm cache if installation fails: `npm cache clean --force`
- Delete `node_modules` and reinstall if needed

### Runtime Issues
- Check console output for detailed error messages
- Verify network connectivity for web scraping operations
- Ensure sufficient API credits for Azure OpenAI calls

For additional help, refer to the [LangChain](https://js.langchain.com/) and [LangGraph](https://langchain-ai.github.io/langgraphjs/) documentation.