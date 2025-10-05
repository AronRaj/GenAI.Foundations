# Generative AI Foundations

A comprehensive 5-day training program covering the fundamentals of Generative AI, Large Language Models (LLMs), and advanced AI architectures.

## Course Overview

This hands-on course takes you from the basics of generative AI to building production-ready agentic systems. Each day builds on the previous, combining theory with practical labs using Azure OpenAI, LangChain, and modern AI frameworks.

---

## Day 1: Foundations of Generative AI and LLMs

### Topics Covered:

- **Evolution of AI to Generative AI**  
  Understand how AI evolved from rule-based systems to deep learning and transformers, leading to generative models.

- **How LLMs Work**  
  Learn the architecture of transformers and attention mechanisms, and how LLMs are trained to generate coherent text.

- **Types of LLMs and Use Cases**  
  Compare GPT, Claude, Gemini, and LLaMA, and explore their strengths in different domains.

- **Grounding and Reliability Techniques**  
  Discover how grounding improves model relevance and reduces hallucinations, along with techniques like RLHF and tool use.

### Lab:
Use Azure OpenAI to analyze delivery feedback and generate summaries. Experiment with different LLMs and observe output differences.

---

## Day 2: Prompt Engineering Deep Dive

### Topics Covered:

- **Types of Prompts**  
  Learn how basic, structured, and contextual prompts influence model responses.

- **Prompt Engineering Techniques**  
  Explore zero-shot, few-shot, and chain-of-thought prompting to guide model reasoning.

- **Prompt Templates**  
  Design reusable templates for tasks like ETA prediction, delivery issue classification, and customer communication.

- **Sampling Parameters**  
  Understand how temperature and top-p affect creativity and determinism, and compare across models.

### Lab:
Create prompt templates for delivery ETA estimation and customer messaging. Tune temperature/top-p and compare outputs across GPT, Claude, and Gemini.

---

## Day 3: Embeddings, Semantic Search, and RAG

### Topics Covered:

- **Understanding Embeddings**  
  Learn how embeddings represent semantic meaning and enable similarity-based search.

- **Semantic Search and Vector Databases**  
  Explore Azure AI Search and Cosmos DB for semantic and hybrid search capabilities.

- **RAG Architecture**  
  Understand how RAG combines retrieval with generation to provide context-aware responses.

- **Hands-on RAG Build**  
  Build a simple RAG system using LangChain/LangGraph (JavaScript) and Azure OpenAI.

### Lab:
Build a RAG system that retrieves delivery logs and traffic updates, then generates contextual responses to customer queries.

---

## Day 4: Agentic AI and Autonomous Systems

### Topics Covered:

- **Agentic AI Concepts**  
  Understand autonomous agents, their goals, and how they operate in dynamic environments.

- **Agentic Patterns and Architectures**  
  Learn about function calling, memory management, and human-in-the-loop systems.

- **Single-Agent Architecture and Scaling**  
  Explore design principles, limitations, and strategies for scaling agentic systems.

- **Hands-on Agentic System**  
  Build a modular agent using Azure AI Foundry or Semantic Kernel with LangChain and LangSmith.

### Lab:
Create an agent that monitors delivery status, reprioritizes orders, and communicates updates. Use LangSmith to trace agent decisions.

---

## Day 5: Advanced Architectures and Model Context Protocol (MCP)

### Topics Covered:

- **Model Context Protocol (MCP) Overview**  
  Learn MCP's architecture and how it enables context sharing across systems.

- **Connecting LLMs to Tools and APIs**  
  Understand how LLMs interact with logistics APIs, GPS data, and customer service platforms.

- **Final Hands-on Project**  
  Combine RAG, Agentic AI, and MCP to build a fully integrated delivery assistant.

### Lab:
Build a mini assistant that uses RAG for data retrieval, agentic logic for decision-making, and MCP for tool integration. Test with simulated delivery scenarios.

---

## Repository Structure

```
GenAI.Foundations/
├── Module01/          # Day 1 content
│   ├── JavaScript/    # JavaScript exercises and solutions
│   └── Python/        # Python exercises and solutions
├── Module02/          # Day 2 content (coming soon)
├── Module03/          # Day 3 content (coming soon)
├── Module04/          # Day 4 content (coming soon)
└── Module05/          # Day 5 content (coming soon)
```

Each day's folder contains detailed instructions for labs and hands-on exercises.

---

## Prerequisites

- Basic programming knowledge (JavaScript or Python)
- Node.js 18+ (for JavaScript exercises)
- Python 3.8+ (for Python exercises)
- Azure OpenAI access
- VS Code with relevant extensions

## Getting Started

1. Clone this repository
2. Navigate to the module you want to work on
3. Follow the `Instructions.md` file in each module's folder
4. Set up your environment variables (see module-specific instructions)

## Technologies Used

- **Azure OpenAI** - LLM provider
- **LangChain** - AI orchestration framework
- **LangGraph** - Agentic workflow management
- **LangSmith** - Observability and tracing
- **Azure AI Search** - Vector database and semantic search
- **Semantic Kernel** - AI application development

---

## License

This project is for educational purposes.

## Contributing

Contributions and improvements are welcome! Please submit a pull request or open an issue.
