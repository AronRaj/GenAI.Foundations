/**
 * Module 05: LangGraph MCP Agent - JavaScript Solution
 * 
 * This module demonstrates how to build a LangGraph agent that communicates
 * with external MCP (Model Context Protocol) servers via HTTP.
 * 
 * Key concepts:
 * - HTTP-based MCP client implementation
 * - LangGraph ReAct agent with external tools
 * - Async/await patterns for tool integration
 * - Memory persistence and streaming responses
 */

import dotenv from 'dotenv';
import axios from 'axios';
import { tool } from '@langchain/core/tools';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { MemorySaver } from '@langchain/langgraph';
import { AzureChatOpenAI } from '@langchain/openai';

// Load environment variables
dotenv.config();

// MCP Server Configuration
const MCP_SERVER_BASE_URL = 'http://localhost:8000';

console.log("Loading environment and dependencies...");

// Initialize Azure OpenAI Chat model
const llm = new AzureChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiInstanceName: 'aoi-ext-eus-aiml-profx-01',
    azureOpenAIApiDeploymentName: 'gpt-4o',
    azureOpenAIApiVersion: '2024-12-01-preview',
    temperature: 0.1, // Lower temperature for more consistent tool usage
});

console.log("Azure OpenAI LLM initialized successfully!");
console.log("Model: gpt-4o");
console.log("Temperature: 0.1 (optimized for tool usage)");

/**
 * Check if the MCP HTTP server is running and accessible
 */
async function checkMcpServer() {
    try {
        const response = await axios.get(`${MCP_SERVER_BASE_URL}/health`, { timeout: 5000 });
        if (response.status === 200) {
            return true;
        } else {
            console.log(`Server responded with status code: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.log(`Server not accessible: ${error.message}`);
        return false;
    }
}

/**
 * Tool for calculating comprehensive statistics
 */
const httpMathStatistics = tool(
    async ({ values }) => {
        try {
            const response = await axios.post(
                `${MCP_SERVER_BASE_URL}/math`,
                {
                    operation: "statistics",
                    values: values
                },
                { timeout: 10000 }
            );

            if (response.data.success) {
                const stats = response.data.result;
                return `Statistical Analysis:
- Count: ${stats.count}
- Mean: ${stats.mean.toFixed(4)}
- Median: ${stats.median.toFixed(4)}
- Standard Deviation: ${stats.std_dev.toFixed(4)}
- Variance: ${stats.variance.toFixed(4)}
- Min: ${stats.min}
- Max: ${stats.max}
- Range: ${stats.range}
- Sum: ${stats.sum}`;
            } else {
                return `Error: ${response.data.message || 'Unknown error'}`;
            }
        } catch (error) {
            return `Error calling math statistics: ${error.message}`;
        }
    },
    {
        name: "http_math_statistics",
        description: "Calculate comprehensive statistics (mean, median, std dev, etc.) for a dataset",
        schema: {
            type: "object",
            properties: {
                values: {
                    type: "array",
                    items: { type: "number" },
                    description: "List of numerical values"
                }
            },
            required: ["values"]
        }
    }
);

/**
 * Tool for solving quadratic equations
 */
const httpSolveQuadratic = tool(
    async ({ a, b, c }) => {
        try {
            const response = await axios.post(
                `${MCP_SERVER_BASE_URL}/math`,
                {
                    operation: "quadratic",
                    values: [],
                    a: a,
                    b: b,
                    c: c
                },
                { timeout: 10000 }
            );

            if (response.data.success) {
                const quadResult = response.data.result;
                const roots = quadResult.roots;
                const rootType = quadResult.root_type;
                const discriminant = quadResult.discriminant;

                return `Quadratic Equation ${a}x² + ${b}x + ${c} = 0:
- Discriminant: ${discriminant}
- Root Type: ${rootType}
- Solutions: ${JSON.stringify(roots)}`;
            } else {
                return `Error: ${response.data.message || 'Unknown error'}`;
            }
        } catch (error) {
            return `Error calling quadratic solver: ${error.message}`;
        }
    },
    {
        name: "http_solve_quadratic",
        description: "Solve a quadratic equation ax² + bx + c = 0",
        schema: {
            type: "object",
            properties: {
                a: { type: "number", description: "Coefficient of x²" },
                b: { type: "number", description: "Coefficient of x" },
                c: { type: "number", description: "Constant term" }
            },
            required: ["a", "b", "c"]
        }
    }
);

/**
 * Tool for text analysis
 */
const httpTextAnalysis = tool(
    async ({ text }) => {
        try {
            const response = await axios.post(
                `${MCP_SERVER_BASE_URL}/text`,
                {
                    text: text,
                    operation: "analyze"
                },
                { timeout: 10000 }
            );

            if (response.data.success) {
                const analysis = response.data.result;
                return `Text Analysis Results:
- Character Count: ${analysis.char_count}
- Word Count: ${analysis.word_count}
- Sentence Count: ${analysis.sentence_count}
- Paragraph Count: ${analysis.paragraph_count}
- Average Word Length: ${analysis.avg_word_length.toFixed(2)}
- Average Sentence Length: ${analysis.avg_sentence_length.toFixed(2)}
- Longest Word: "${analysis.longest_word}"
- Most Common Words: ${JSON.stringify(analysis.most_common_words)}`;
            } else {
                return `Error: ${response.data.message || 'Unknown error'}`;
            }
        } catch (error) {
            return `Error calling text analysis: ${error.message}`;
        }
    },
    {
        name: "http_text_analysis",
        description: "Analyze text for word count, character analysis, and structure",
        schema: {
            type: "object",
            properties: {
                text: { type: "string", description: "Text to analyze" }
            },
            required: ["text"]
        }
    }
);

/**
 * Tool for extracting information from text
 */
const httpExtractInformation = tool(
    async ({ text, extractionType }) => {
        try {
            const response = await axios.post(
                `${MCP_SERVER_BASE_URL}/text`,
                {
                    text: text,
                    operation: "extract",
                    extraction_type: extractionType
                },
                { timeout: 10000 }
            );

            if (response.data.success) {
                const extracted = response.data.result;
                return `Information Extraction (${extractionType}):
Found items: ${JSON.stringify(extracted, null, 2)}`;
            } else {
                return `Error: ${response.data.message || 'Unknown error'}`;
            }
        } catch (error) {
            return `Error calling information extraction: ${error.message}`;
        }
    },
    {
        name: "http_extract_information",
        description: "Extract specific information (emails, phone numbers, etc.) from text",
        schema: {
            type: "object",
            properties: {
                text: { type: "string", description: "Text to extract information from" },
                extractionType: { 
                    type: "string", 
                    description: "Type of information to extract (emails, phones, urls, etc.)" 
                }
            },
            required: ["text", "extractionType"]
        }
    }
);

/**
 * Tool for text transformation
 */
const httpTransformText = tool(
    async ({ text, operation }) => {
        try {
            const response = await axios.post(
                `${MCP_SERVER_BASE_URL}/text`,
                {
                    text: text,
                    operation: "transform",
                    extraction_type: operation
                },
                { timeout: 10000 }
            );

            if (response.data.success) {
                return `Text Transformation (${operation}):
Original: "${text}"
Transformed: "${response.data.result}"`;
            } else {
                return `Error: ${response.data.message || 'Unknown error'}`;
            }
        } catch (error) {
            return `Error calling text transformation: ${error.message}`;
        }
    },
    {
        name: "http_transform_text",
        description: "Transform text using various operations (pig_latin, reverse, etc.)",
        schema: {
            type: "object",
            properties: {
                text: { type: "string", description: "Text to transform" },
                operation: { type: "string", description: "Transformation operation to perform" }
            },
            required: ["text", "operation"]
        }
    }
);

// Collect all HTTP MCP tools
const httpMcpTools = [
    httpMathStatistics,
    httpSolveQuadratic,
    httpTextAnalysis,
    httpExtractInformation,
    httpTransformText
];

console.log("HTTP MCP Client Tools Created Successfully!");
console.log(`Available tools: ${httpMcpTools.length}`);
console.log("Tools can connect to MCP server at:", MCP_SERVER_BASE_URL);

/**
 * Create a LangGraph ReAct agent using HTTP-based MCP tools
 */
async function createHttpMcpAgent() {
    // Check if MCP server is running
    if (!(await checkMcpServer())) {
        console.log("ERROR: MCP HTTP server is not running!");
        console.log("Please start it with: python ../MCP/mcp-http-server.py");
        return null;
    }

    console.log("MCP HTTP server is accessible");

    // Initialize memory for conversation persistence
    const memory = new MemorySaver();

    // Create the ReAct agent with HTTP-based MCP tools
    const agent = createReactAgent({
        llm: llm,
        tools: httpMcpTools,
        checkpointSaver: memory
    });

    console.log("HTTP-based MCP Agent created successfully!");
    console.log(`Configured with ${httpMcpTools.length} tools`);
    console.log("Connected to separately hosted MCP server");

    return agent;
}

/**
 * Stream updates from the HTTP-based MCP agent
 */
async function streamHttpAgentUpdates(userInput) {
    // Create the agent
    const agent = await createHttpMcpAgent();
    if (agent === null) {
        return;
    }

    // Configuration for conversation threading
    const config = { configurable: { thread_id: "http-mcp-demo-thread" } };

    console.log(`\\nProcessing query with HTTP MCP Agent...`);
    console.log(`Query: ${userInput}`);
    console.log("\\n" + "=".repeat(60));

    try {
        // Stream the agent's response
        const stream = agent.stream(
            { messages: [new HumanMessage(userInput)] },
            config
        );

        for await (const event of stream) {
            try {
                for (const [key, value] of Object.entries(event)) {
                    if (value.messages && value.messages.length > 0) {
                        const lastMessage = value.messages[value.messages.length - 1];
                        if (lastMessage.content) {
                            console.log("Assistant:", lastMessage.content);
                            console.log("-".repeat(40));
                        }
                    }
                }
            } catch (error) {
                console.log(`WARNING: Error processing event: ${error.message}`);
            }
        }
    } catch (error) {
        console.log(`ERROR: Error with HTTP MCP agent: ${error.message}`);
    }

    console.log("\\nHTTP MCP Agent response completed!");
}

/**
 * Main execution function
 */
async function main() {
    console.log("=".repeat(60));
    console.log("Module 05: LangGraph MCP Agent - JavaScript Solution");
    console.log("=".repeat(60));
    
    console.log("\\nChecking MCP server availability...");
    const serverAvailable = await checkMcpServer();
    
    if (!serverAvailable) {
        console.log("\\nERROR: MCP HTTP server is not running!");
        console.log("Please start it with: python ../MCP/mcp-http-server.py");
        console.log("\\nMake sure to:");
        console.log("1. Navigate to the MCP directory: cd ../MCP");
        console.log("2. Install dependencies: pip install -r requirements.txt");
        console.log("3. Start the server: python mcp-http-server.py");
        return;
    }
    
    console.log("SUCCESS: MCP HTTP server is accessible!");
    console.log(`Server available at: ${MCP_SERVER_BASE_URL}`);

    // Test 1: Mathematical Operations
    console.log("\\n" + "=".repeat(60));
    console.log("Testing Mathematical Operations via HTTP MCP Server");
    console.log("=".repeat(60));

    const mathQuery = `I have a dataset with the following values: [85, 92, 78, 96, 89, 91, 87, 94, 82, 88].
Please calculate the mean, median, and standard deviation for this dataset.
Also, solve the quadratic equation 2x² - 7x + 3 = 0.
Finally, analyze the distribution characteristics of the data.`;

    console.log(`Query: ${mathQuery}`);
    console.log("\\nAgent Response (via HTTP MCP Server):");
    console.log("=".repeat(60));

    await streamHttpAgentUpdates(mathQuery);

    // Test 2: Text Processing
    console.log("\\n" + "=".repeat(60));
    console.log("Testing Text Processing via HTTP MCP Server");
    console.log("=".repeat(60));

    const textQuery = `Please analyze the following text and extract useful information:

"Artificial Intelligence and Machine Learning are revolutionizing technology. 
Our research team has achieved 95.3% accuracy in natural language processing tasks.
Contact us at research@aicompany.com or call (555) 123-4567 for collaboration.
Visit our website at https://ai-revolution.com to learn more about our work!"

I need:
1. A comprehensive text analysis with word count, character analysis, etc.
2. Extract all email addresses and phone numbers from the text
3. Transform the first sentence to pig latin
4. Provide insights about the text structure and content`;

    console.log(`Query: ${textQuery}`);
    console.log("\\nAgent Response (via HTTP MCP Server):");
    console.log("=".repeat(60));

    await streamHttpAgentUpdates(textQuery);

    console.log("\\n" + "=".repeat(60));
    console.log("All tests completed successfully!");
    console.log("HTTP MCP Agent demonstrated successful integration with external server");
    console.log("=".repeat(60));
}

// Run the main function if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export {
    checkMcpServer,
    httpMcpTools,
    createHttpMcpAgent,
    streamHttpAgentUpdates,
    main
};