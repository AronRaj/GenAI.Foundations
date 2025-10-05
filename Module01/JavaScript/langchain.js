/**
 * LangChain Exercise: Getting Started with Azure OpenAI
 * 
 * In this exercise, you'll learn how to:
 * 1. Set up environment variables securely
 * 2. Initialize an Azure OpenAI chat model using LangChain
 * 3. Send simple prompts to the model
 * 4. Work with system and user messages
 * 
 * Follow the instructions in each section and complete the code where indicated.
 */

// ============================================================================
// Step 1: Load Environment Variables
// ============================================================================
// Objective: Load your Azure OpenAI API key from environment variables.
// 
// Instructions:
// - Import the dotenv package
// - Use config() to load variables from a .env file (if it exists)
// - Access environment variables using process.env.AZURE_OPENAI_API_KEY
// 
// Note: In JavaScript, environment variables are accessed via process.env.
// The dotenv package helps load them from a .env file.
// ============================================================================

// TODO: Import dotenv package


// TODO: Load environment variables from .env file


// TODO: Verify the API key is loaded (optional - for debugging)
// console.log(process.env.AZURE_OPENAI_API_KEY ? 'API Key loaded' : 'API Key not found');


// ============================================================================
// Step 2: Initialize the Azure OpenAI Chat Model
// ============================================================================
// Objective: Create an instance of AzureChatOpenAI to interact with Azure OpenAI services.
// 
// Instructions:
// - Import AzureChatOpenAI from @langchain/openai
// - Create a model instance with the following parameters:
//   - azureOpenAIEndpoint: Your Azure OpenAI endpoint URL
//   - azureOpenAIApiKey: Use the API key from environment variables
//   - azureOpenAIApiDeploymentName: The deployment name (e.g., "gpt-4o")
//   - azureOpenAIApiVersion: The API version (e.g., "2024-12-01-preview")
//   - temperature: Set to 0 for deterministic outputs
//   - topP: Set to 0.5
// 
// Note: The temperature parameter controls randomness (0 = deterministic, 1 = very random).
// The topP parameter controls diversity via nucleus sampling.
// ============================================================================

// TODO: Import AzureChatOpenAI from @langchain/openai


// TODO: Create the model instance with the required parameters


// ============================================================================
// Step 3: Send a Simple Prompt
// ============================================================================
// Objective: Test your model by sending a simple text prompt.
// 
// Instructions:
// - Use the invoke() method on your model instance
// - Pass a simple string message like "Hello, world!"
// - Use await since the operation is asynchronous
// - Log the response to the console
// 
// Expected Output: The model should return an AIMessage object with a greeting response.
// ============================================================================

async function step3_simplePrompt() {
    // TODO: Invoke the model with a simple message
    
    
    // TODO: Log the response
    
}

// Uncomment to run:
// step3_simplePrompt();


// ============================================================================
// Step 4: Working with System and User Messages
// ============================================================================
// Objective: Learn how to structure conversations with system and user messages.
// 
// Instructions:
// - Import HumanMessage and SystemMessage from @langchain/core/messages
// - Create an array of messages:
//   - A SystemMessage that instructs the model (e.g., "Translate the following from English into Italian")
//   - A HumanMessage with the user's input (e.g., "hi!")
// - Invoke the model with this messages array
// 
// Key Concept:
// - SystemMessage: Sets the behavior or role of the AI (e.g., translator, teacher, assistant)
// - HumanMessage: Represents the user's input or question
// 
// Expected Output: The model should translate "hi!" to Italian ("ciao!" or similar).
// ============================================================================

// TODO: Import HumanMessage and SystemMessage


async function step4_systemAndUserMessages() {
    // TODO: Create messages array with SystemMessage and HumanMessage
    
    
    // TODO: Invoke the model with the messages array
    
    
    // TODO: Log the response
    
}

// Uncomment to run:
// step4_systemAndUserMessages();


// ============================================================================
// Main function to run all steps
// ============================================================================
async function main() {
    console.log('=== LangChain Exercise: Getting Started with Azure OpenAI ===\n');
    
    console.log('Step 3: Simple Prompt');
    await step3_simplePrompt();
    
    console.log('\nStep 4: System and User Messages');
    await step4_systemAndUserMessages();
}

// Uncomment to run all steps:
// main().catch(console.error);
