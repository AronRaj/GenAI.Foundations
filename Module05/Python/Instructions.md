# Module 05: LangGraph ReAct Agent with MCP Integration

## Navigate to Module 05 - Python Directory

Before setting up the virtual environment, make sure you're in the correct directory:

1. **Navigate to the Module 05 Python directory**:

   ```bash
   cd Module05/Python
   ```

2. **Verify you're in the correct location** by checking the contents:

   ```bash
   ls
   ```

   You should see files like `Instructions.md`, `requirements.txt`, and the `Solution/` directory.

## Setting Up a Virtual Environment

When working on Python projects, it's a good practice to set up a virtual environment. A virtual environment allows you to create an isolated space for your project, where you can manage dependencies without affecting the global Python installation.

To set up a virtual environment, follow these steps:

1. **Install `virtualenv`** (if not already installed):

   ```bash
   pip install virtualenv
   ```

2. **Create a new virtual environment**:

   ```bash
   python -m venv .venv-module05
   ```

3. **Activate the virtual environment**:
   - On Windows:

     ```bash
     .venv-module05\Scripts\Activate.ps1
     ```

   - On macOS and Linux:

     ```bash
     source .venv-module05/bin/activate
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

Instead of exporting environment variables in your terminal, you can create a `.env` file in the `Module05/Python` directory:

1. Create a file named `.env` in the `Module05/Python` directory
2. Add the following line to the file:

   ```text
   AZURE_OPENAI_API_KEY=your-api-key-here
   ```

3. Replace `your-api-key-here` with your actual API key
4. The `python-dotenv` package (included in `requirements.txt`) will automatically load these variables

**Important**: Never commit the `.env` file to version control. It should be added to your `.gitignore` file.

## MCP Server Setup

This module also includes a Model Context Protocol (MCP) server that provides extended capabilities to the LangGraph agent:

1. **Navigate to the MCP directory**:

   ```bash
   cd ../MCP
   ```

2. **Install MCP server dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Start the MCP server** (if needed for advanced exercises):

   ```bash
   python -m mcp_server
   ```

## Exercise: LangGraph ReAct Agent with MCP Integration

### Overview

The `langgraph-mcp-agent.ipynb` notebook is your hands-on exercise for building advanced AI agents using LangGraph with Model Context Protocol integration. You'll implement:

1. **ReAct Agents** - Create sophisticated reasoning and acting agents
2. **MCP Tool Integration** - Connect to external tools and services via HTTP
3. **Multi-step Reasoning** - Handle complex queries requiring multiple tool calls
4. **HTTP Client Architecture** - Build tools that communicate with separate MCP servers
5. **Async Agent Workflows** - Process real-time streaming interactions

### Key Concepts

- **Model Context Protocol (MCP)**: Standardized protocol for secure tool integration
- **ReAct Pattern**: Reasoning and Acting cycle for intelligent agent behavior
- **LangGraph**: Framework for building stateful, multi-step agent workflows
- **HTTP Tool Architecture**: Distributed tool execution via HTTP APIs
- **Tool Orchestration**: Dynamic tool selection and execution

### Learning Objectives

By completing this exercise, you will:

- ✅ Understand MCP architecture and its benefits
- ✅ Build HTTP-based LangChain tools using the `@tool` decorator
- ✅ Create ReAct agents with LangGraph's `create_react_agent`
- ✅ Implement real-time streaming with async/await patterns
- ✅ Handle external service lifecycle management
- ✅ Process complex multi-tool workflows

### Prerequisites

Before starting this exercise:

1. **Complete Modules 01-04** to understand LangChain and LangGraph basics
2. **Understand HTTP/REST APIs** and JSON data formats
3. **Be familiar with async/await** programming in Python
4. **Have experience with tool integration** patterns

### Exercise Instructions

#### Part 1: Setup and Configuration (Steps 1-4)

1. **Open `langgraph-mcp-agent.ipynb`** in VS Code or Jupyter
2. **Complete Step 1**: Import all required libraries
   - Focus on HTTP libraries (`requests`)
   - LangChain and LangGraph components
   - Async programming utilities
3. **Complete Step 2**: Configure environment variables
   - Set up secure API key management
   - Use `.env` file or environment variables
4. **Complete Step 3**: Initialize Azure OpenAI model
   - Configure for optimal tool usage (low temperature)
5. **Complete Step 4**: Set up MCP server configuration
   - Define server URL and health check function

#### Part 2: Tool Implementation (Steps 5-6)

6. **Complete Step 5**: Implement mathematical tools
   - `http_math_statistics`: Statistical analysis tool
   - `http_solve_quadratic`: Quadratic equation solver
   - Focus on HTTP POST requests and error handling
7. **Complete Step 6**: Implement text processing tools
   - `http_text_analysis`: Comprehensive text analysis
   - `http_extract_information`: Pattern extraction (emails, phones, etc.)
   - `http_transform_text`: Text transformations

#### Part 3: Agent Creation (Steps 7-8)

8. **Complete Step 7**: Build the ReAct agent
   - Collect tools into a list
   - Create agent with memory persistence
   - Implement health checking
9. **Complete Step 8**: Implement streaming interface
   - Build async query processing
   - Handle real-time agent responses
   - Manage conversation threading

#### Part 4: Testing and Validation (Steps 9-11)

10. **Complete Step 9**: (Optional) Server management
    - Implement automatic server startup/shutdown
    - Handle process management and health monitoring
11. **Complete Steps 10-11**: Test agent capabilities
    - Mathematical operations with complex datasets
    - Text processing with information extraction
    - Multi-step reasoning workflows

### Key Implementation Tips

#### Tool Design Patterns
- **Consistent Error Handling**: Always wrap HTTP calls in try-catch blocks
- **Descriptive Docstrings**: Help the LLM understand tool capabilities
- **JSON Payload Structure**: Follow MCP server's expected format
- **Timeout Management**: Use appropriate timeouts for external calls

#### Agent Configuration
- **Memory Persistence**: Use `MemorySaver` for conversation context
- **Thread Management**: Configure unique thread IDs for sessions
- **Tool Selection**: Let the agent choose tools based on query analysis

#### HTTP Communication
- **Health Checks**: Always verify server availability before agent creation
- **Status Code Handling**: Use `response.raise_for_status()` for error detection
- **Response Processing**: Parse JSON responses and format for agent consumption

### Expected Outcomes

After completing this exercise, you should see:

1. **Successful Tool Integration**: All HTTP tools connecting to MCP server
2. **Multi-step Reasoning**: Agent using multiple tools for complex queries
3. **Real-time Streaming**: Live updates during agent execution
4. **Error Resilience**: Graceful handling of server issues and API errors

### Testing Scenarios

Test your implementation with these scenarios:

#### Mathematical Queries
```
Calculate statistics for [85, 92, 78, 96, 89, 91, 87, 94, 82, 88] 
and solve 2x² - 7x + 3 = 0
```

#### Text Processing Queries
```
Analyze this text: "Contact sales@company.com or call (555) 123-4567 
for more information about our AI solutions!"
Extract emails, phone numbers, and transform to pig latin.
```

#### Complex Multi-step Queries
```
I have survey scores [8.5, 9.2, 7.8, 9.6, 8.9]. Calculate the mean and 
standard deviation. Then extract any phone numbers from this text: 
"Call us at (555) 987-6543 for a consultation." Finally, transform 
the word "consultation" to uppercase.
```

### Troubleshooting Guide

**Issue**: `Connection refused` when calling MCP server
- **Solution**: Start the MCP server with `python ../../MCP/mcp-http-server.py`
- **Check**: Verify server is running on `http://localhost:8000`

**Issue**: Tools not being called by agent
- **Solution**: Check tool docstrings are descriptive and parameters are clear
- **Verify**: LLM understands when each tool should be used

**Issue**: `ModuleNotFoundError` for LangGraph
- **Solution**: Ensure virtual environment is activated and requirements installed
- **Command**: `pip install -r requirements.txt`

**Issue**: Agent responses are incomplete
- **Solution**: Check for exceptions in tool implementations
- **Debug**: Add print statements in tool functions

### Advanced Challenges

Once you complete the basic exercise, try these extensions:

1. **Custom Tool Creation**: Add a new tool to the MCP server and corresponding HTTP client
2. **Error Recovery**: Implement fallback strategies when tools fail
3. **Performance Optimization**: Add response caching to frequently-used tools
4. **Monitoring**: Add logging to track tool usage and performance
5. **Authentication**: Secure the MCP server with API key authentication

### Solution Reference

Compare your implementation with `Solution/langgraph-mcp-agent-solution.ipynb` for:
- Complete code implementations
- Best practices and patterns
- Advanced features and optimizations
- Professional error handling techniques

## Troubleshooting

### Common Issues

1. **MCP Connection Issues**:
   - Ensure the MCP server is properly configured
   - Check network connectivity and permissions
   - Verify API keys and authentication

2. **Virtual Environment Issues**:
   - Make sure you're in the correct directory
   - Verify the virtual environment is activated
   - Reinstall requirements if needed

3. **Dependency Conflicts**:
   - Try creating a fresh virtual environment
   - Update pip: `python -m pip install --upgrade pip`
   - Install dependencies one by one to identify conflicts

## Additional Resources

- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [Model Context Protocol (MCP) Documentation](https://modelcontextprotocol.io/)
- [LangChain Documentation](https://python.langchain.com/docs/get_started/introduction)
- [Azure OpenAI Service Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [ReAct Pattern Paper](https://arxiv.org/abs/2210.03629)
- [Agent Development Best Practices](https://blog.langchain.dev/building-production-ready-agents/)
