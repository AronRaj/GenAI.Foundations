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

   You should see files like `Instructions.md`, `rag-langgraph.ipynb`, `retail-usecase.ipynb`, and `requirements.txt`.

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

## What is LangGraph?

**LangGraph** is a powerful framework for building stateful, multi-step applications with Large Language Models (LLMs). It extends LangChain with graph-based workflows that enable:

- **Stateful Workflows**: Maintain context and state across multiple steps
- **Conditional Logic**: Make dynamic decisions based on intermediate results
- **Tool Integration**: Seamlessly incorporate external tools and APIs
- **Memory Management**: Handle conversation history and persistence
- **Complex Reasoning**: Build sophisticated multi-step reasoning patterns

### LangGraph vs Traditional RAG

- **Traditional RAG**: Simple pipeline (Query → Retrieve → Generate)
- **LangGraph RAG**: Stateful workflow with conditional paths, tool calls, and memory

### Key Concepts

1. **MessagesState**: Built-in state management for conversation history
2. **Tools**: Functions that LLMs can call to perform specific tasks
3. **Conditional Edges**: Dynamic routing based on LLM decisions
4. **Memory/Checkpointing**: Conversation persistence across sessions
5. **Graph Visualization**: Visual representation of workflow structure

## Exercise 1: Advanced RAG with LangGraph

### Overview

The `rag-langgraph.ipynb` notebook demonstrates advanced Retrieval Augmented Generation (RAG) using LangGraph. You'll learn how to:

1. **Build stateful RAG workflows** - Create sophisticated document processing pipelines
2. **Implement graph-based reasoning** - Use LangGraph for multi-step reasoning
3. **Handle complex queries** - Process questions that require multiple retrieval steps
4. **Optimize RAG performance** - Implement advanced techniques for better results
5. **Create custom and ReAct agents** - Compare different agent architectures
6. **Add memory and persistence** - Enable multi-turn conversations

### Key Learning Objectives

- **LangGraph Fundamentals**: Understanding stateful AI workflows
- **Advanced RAG Patterns**: Moving beyond simple retrieval-generation
- **Tool Integration**: Creating and using custom tools
- **State Management**: Managing conversation context and memory
- **Agent Comparison**: Custom graphs vs pre-built ReAct agents

### Instructions

1. Open `rag-langgraph.ipynb` in Jupyter or VS Code
2. Follow the notebook cells in order
3. Complete each TODO section before moving to the next
4. Run each cell and observe the outputs
5. Experiment with different queries and document sources

### What You'll Build

By the end of this exercise, you'll have created:

- A custom LangGraph RAG system with explicit state management
- A ReAct agent using pre-built patterns
- Memory-enabled systems for multi-turn conversations
- Tools for document retrieval and processing

## Exercise 2: Real-World Application - Last-Mile Delivery Optimizer

### Use Case Overview

The `retail-usecase.ipynb` notebook demonstrates a sophisticated **Last-Mile Delivery Optimizer** using LangGraph and RAG. This real-world application showcases how to build enterprise-grade AI systems for complex business processes.

### Use Case: Last-Mile Delivery Optimization

Last-mile delivery is one of the most complex and expensive parts of the supply chain. Our system addresses:

- **Dynamic Route Planning**: Real-time optimization based on traffic and priorities
- **Customer Communication**: Proactive updates and issue resolution
- **Priority Management**: Handling urgent deliveries and complaints
- **Performance Analytics**: Data-driven optimization insights

### What You'll Learn

1. **Domain-Specific RAG**: Building specialized retrieval systems
2. **Multi-Tool Architectures**: Creating specialized tools for different data sources
3. **Complex Workflow Design**: Handling multi-step business processes
4. **Real-Time Decision Making**: Implementing autonomous business logic
5. **Performance Monitoring**: Analytics and optimization strategies

### Data Sources Integration

The system integrates multiple data sources:

- **📅 Delivery Schedules**: Routes, time windows, driver assignments
- **🚦 Traffic Data**: Real-time conditions and route optimization
- **💬 Customer Feedback**: Reviews, complaints, and special requests
- **📊 Performance Metrics**: Historical data and analytics

### Exercise Instructions

1. Open `retail-usecase.ipynb` in Jupyter or VS Code
2. Work through each step systematically
3. Pay attention to the tool design patterns
4. Complete the custom graph and ReAct agent implementations
5. Test with complex, multi-step scenarios

### Final Deliverables

By the end of this exercise, you'll have created:

- A complete delivery optimization system
- Specialized tools for different business functions
- Custom LangGraph workflows for complex decision making
- A production-ready AI system architecture

## Key Differences from Previous Modules

### Module 03 vs Module 04

| Aspect | Module 03 | Module 04 |
|--------|-----------|-----------|
| **RAG Type** | Traditional Pipeline | Stateful Workflows |
| **Complexity** | Single-step retrieval | Multi-step reasoning |
| **State** | Stateless | Stateful with memory |
| **Tools** | Simple retrieval | Multiple specialized tools |
| **Agents** | Basic RAG chain | Custom graphs + ReAct |
| **Use Cases** | General Q&A | Enterprise applications |

### Advanced Concepts Introduced

1. **Stateful AI**: Maintaining context across multiple interactions
2. **Graph-Based Reasoning**: Non-linear AI workflows
3. **Tool Orchestration**: Coordinating multiple specialized functions
4. **Memory Systems**: Persistent conversation state
5. **Enterprise Architecture**: Production-ready AI system design

## Troubleshooting Common Issues

### Graph Compilation Errors

- Ensure all nodes are properly defined before compilation
- Check that conditional edges have valid return values
- Verify tool signatures match expected parameters

### Memory Issues

- Make sure to use consistent thread IDs for conversation continuity
- Check that MemorySaver is properly configured
- Verify checkpointer is passed to graph compilation

### Tool Execution Problems

- Confirm tools are properly decorated with `@tool`
- Check tool documentation strings are descriptive
- Verify vector store has been populated with documents

## Performance Optimization Tips

1. **Chunk Size Optimization**: Balance between context and performance
2. **Vector Store Efficiency**: Consider persistent storage for production
3. **Tool Response Size**: Limit tool output to essential information
4. **Memory Management**: Clean up old conversation threads periodically
5. **Parallel Processing**: Use concurrent tool execution where possible

## Additional Resources

- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [LangChain Documentation](https://python.langchain.com/docs/get_started/introduction)
- [Azure OpenAI Service Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Advanced RAG Techniques](https://blog.langchain.dev/improving-rag-performance/)
- [Enterprise AI Architecture Patterns](https://docs.microsoft.com/en-us/azure/architecture/ai-ml/)

## Next Steps

After completing this module, consider exploring:

1. **Production Deployment**: Deploy your LangGraph applications to cloud platforms
2. **Advanced Memory Systems**: Implement persistent, distributed memory
3. **Multi-Agent Systems**: Build systems with multiple cooperating agents
4. **Real-Time Integration**: Connect to live data sources and APIs
5. **Monitoring and Observability**: Add logging, metrics, and debugging tools

## Support and Community

If you encounter issues or have questions:

1. Check the troubleshooting section above
2. Review the LangGraph documentation
3. Experiment with simpler versions of complex workflows
4. Test individual components before building complete systems

Happy learning, and welcome to the world of advanced AI workflows with LangGraph! 🚀
