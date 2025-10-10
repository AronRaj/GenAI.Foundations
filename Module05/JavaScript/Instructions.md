# Module 05: LangGraph MCP Agent - JavaScript Implementation

## Navigate to Module 05 - JavaScript Directory

Before setting up the project, make sure you're in the correct directory:

1. **Navigate to the Module 05 JavaScript directory**:

   ```bash
   cd Module05/JavaScript
   ```

2. **Verify you're in the correct location** by checking the contents:

   ```bash
   dir
   ```

   You should see files like `Instructions.md`, `langgraph-mcp-agent.js`, and `package.json`.

## Installing Dependencies

This module uses Node.js and npm to manage dependencies. Make sure you have Node.js installed (version 18 or higher recommended).

To install the project dependencies, follow these steps:

1. **Install npm packages**:

   ```bash
   npm install
   ```

   This will install the following key dependencies:
   - `@langchain/langgraph` - For building stateful agent workflows
   - `@langchain/openai` - Azure OpenAI integration
   - `@langchain/core` - Core LangChain functionality
   - `axios` - HTTP client for MCP server communication
   - `dotenv` - Environment variable management

## Environment Variables Setup

This module requires Azure OpenAI API credentials. Set up your environment variables:

1. **Create a `.env` file** in the `Module05/JavaScript` directory:

   ```bash
   touch .env
   ```

2. **Add your Azure OpenAI credentials** to the `.env` file:

   ```env
   AZURE_OPENAI_API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your actual Azure OpenAI API key.

## Starting the MCP HTTP Server

Before running the JavaScript agent, you need to start the MCP HTTP server:

1. **Navigate to the MCP directory**:

   ```bash
   cd ../MCP
   ```

2. **Install Python dependencies** (if not already done):

   ```bash
   pip install -r requirements.txt
   ```

3. **Start the HTTP server**:

   ```bash
   python mcp-http-server.py
   ```

   The server will start on `http://localhost:8000` and provide the following endpoints:
   - `/health` - Health check endpoint
   - `/math` - Mathematical operations (statistics, quadratic equations)
   - `/text` - Text analysis and processing operations

4. **Verify the server is running** by visiting `http://localhost:8000/health` in your browser or using curl:

   ```bash
   curl http://localhost:8000/health
   ```

## Running the JavaScript Implementation

Once the MCP server is running and dependencies are installed:

1. **Navigate back to the JavaScript directory**:

   ```bash
   cd ../JavaScript
   ```

2. **Run the main MCP agent script**:

   ```bash
   npm run mcp
   ```

   Or directly with Node.js:

   ```bash
   node langgraph-mcp-agent.js
   ```

3. **Run the solution version**:

   ```bash
   npm run mcp:solution
   ```

## Project Structure

```
Module05/JavaScript/
├── Instructions.md              # This file
├── package.json                # Node.js dependencies and scripts
├── langgraph-mcp-agent.js      # Main implementation file (to be completed)
├── Solution/
│   └── langgraph-mcp-agent-solution.js  # Complete solution
└── .env                        # Environment variables (create this)
```

## Key Concepts Covered

### 1. Model Context Protocol (MCP)
- **HTTP-based MCP Communication**: Connect to external MCP servers via REST API
- **Tool Registration**: Register MCP tools as LangChain tools for agent use
- **Error Handling**: Robust error handling for network communication
- **Server Health Monitoring**: Check server availability before making requests

### 2. LangGraph ReAct Agent
- **Tool-Enabled Agents**: Create agents that can use external tools
- **Memory Persistence**: Maintain conversation state across interactions
- **Streaming Responses**: Real-time response streaming for better UX
- **Async/Await Patterns**: Modern JavaScript async programming

### 3. Azure OpenAI Integration
- **GPT-4o Model**: Latest model with enhanced tool usage capabilities
- **Temperature Control**: Optimized settings for consistent tool execution
- **API Key Management**: Secure credential handling

### 4. HTTP Client Integration
- **Axios Library**: Modern HTTP client for API communication
- **Request/Response Handling**: Proper data serialization and error handling
- **Timeout Management**: Prevent hanging requests with timeout configuration

## Learning Objectives

By completing this module, you will learn how to:

1. **Build MCP-Enabled Agents**: Create LangGraph agents that communicate with external MCP servers
2. **HTTP Tool Integration**: Register HTTP-based tools with LangChain agents
3. **Async Agent Workflows**: Implement asynchronous agent processing with real-time updates
4. **Error Handling**: Implement robust error handling for network-based tool calls
5. **Tool Composition**: Combine multiple MCP tools for complex workflows
6. **Memory Management**: Use LangGraph checkpointers for conversation persistence

## Expected Outputs

When you run the agent successfully, you should see:

1. **Server Health Check**: Confirmation that the MCP server is accessible
2. **Agent Initialization**: Successful creation of the LangGraph agent with MCP tools
3. **Mathematical Operations**: Statistics calculations and quadratic equation solving
4. **Text Processing**: Text analysis, information extraction, and text transformations
5. **Real-time Streaming**: Live updates as the agent processes queries and calls tools

## Troubleshooting

### Common Issues:

1. **"MCP server not accessible"**:
   - Ensure the Python MCP server is running on `http://localhost:8000`
   - Check that port 8000 is not blocked by firewall
   - Verify server dependencies are installed

2. **"Module not found" errors**:
   - Run `npm install` to install all dependencies
   - Ensure you're in the correct directory (`Module05/JavaScript`)

3. **Azure OpenAI API errors**:
   - Verify your API key is correct in the `.env` file
   - Check that your Azure OpenAI deployment is active
   - Ensure the model name and endpoint are correct

4. **Network timeout errors**:
   - Check your internet connection
   - Verify the MCP server is responding to health checks
   - Increase timeout values if needed

## Next Steps

After completing this module, you'll have hands-on experience with:
- Building agent systems that integrate with external services
- Implementing HTTP-based tool communication
- Managing stateful agent workflows with LangGraph
- Combining multiple AI capabilities in a single agent system

This foundation prepares you for building production-ready AI agents that can interact with various external systems and APIs.