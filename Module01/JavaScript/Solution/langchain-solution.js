/**
 * LangChain Exercise: Getting Started with Azure OpenAI - SOLUTION
 * 
 * In this exercise, you'll learn how to:
 * 1. Set up environment variables securely
 * 2. Initialize an Azure OpenAI chat model using LangChain
 * 3. Send simple prompts to the model
 * 4. Work with system and user messages
 */

// ============================================================================
// Step 1: Load Environment Variables
// ============================================================================
import { config } from 'dotenv';

// Load environment variables from a .env file if present
config();

// Verify the API key is loaded
console.log(process.env.AZURE_OPENAI_API_KEY ? 'API Key loaded successfully' : 'API Key not found');


// ============================================================================
// Step 2: Initialize the Azure OpenAI Chat Model
// ============================================================================
import { AzureChatOpenAI } from '@langchain/openai';

const model = new AzureChatOpenAI({
    azureOpenAIEndpoint: "https://aoi-ext-eus-aiml-profx-01.openai.azure.com/",
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiDeploymentName: "gpt-4o",
    azureOpenAIApiVersion: "2024-12-01-preview",
    temperature: 0,
    topP: 0.5,
});


// ============================================================================
// Step 3: Send a Simple Prompt
// ============================================================================
async function step3_simplePrompt() {
    console.log('Sending simple prompt: "Hello, world!"');
    
    const response = await model.invoke("Hello, world!");
    
    console.log('Response:', response.content);
    console.log('Full AIMessage:', response);
}


// ============================================================================
// Step 4: Working with System and User Messages
// ============================================================================
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

async function step4_systemAndUserMessages() {
    console.log('Translating "hi!" from English to Italian');
    
    const messages = [
        new SystemMessage("Translate the following from English into Italian"),
        new HumanMessage("hi!"),
    ];
    
    const response = await model.invoke(messages);
    
    console.log('Translation:', response.content);
    console.log('Full AIMessage:', response);
}


// ============================================================================
// Main function to run all steps
// ============================================================================
async function main() {
    console.log('=== LangChain Exercise: Getting Started with Azure OpenAI ===\n');
    
    console.log('Step 3: Simple Prompt');
    console.log('---');
    await step3_simplePrompt();
    
    console.log('\n\nStep 4: System and User Messages');
    console.log('---');
    await step4_systemAndUserMessages();
}

// Run all steps
main().catch(console.error);
