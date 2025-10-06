/**
 * Module 02: Prompt Engineering for Retail/eCommerce
 * JavaScript/LangChain Implementation
 * 
 * Learning Objectives:
 * 1. Prompt Engineering Techniques
 * 2. Zero-Shot & Few-Shot Prompting
 * 3. Prompt Templates
 * 4. Temperature & Top_p Parameters
 */

import { AzureChatOpenAI } from '@langchain/openai';
import { PromptTemplate, ChatPromptTemplate, FewShotPromptTemplate } from '@langchain/core/prompts';
import { readFileSync } from 'fs';
import { config } from 'dotenv';

// Load environment variables
config();

// Verify the API key is loaded
console.log(process.env.AZURE_OPENAI_API_KEY ? 'API Key loaded successfully' : 'API Key not found');

// Initialize Azure OpenAI
const model = new AzureChatOpenAI({
    azureOpenAIEndpoint: "https://aoi-ext-eus-aiml-profx-01.openai.azure.com/",
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiDeploymentName: "gpt-4o",
    azureOpenAIApiVersion: "2024-12-01-preview",
    temperature: 0.7,
    topP: 1.0,
});

// Load Walmart data
const walmartData = JSON.parse(readFileSync('../data/walmart_data.json', 'utf-8'));

console.log('📦 Data loaded successfully!');
console.log(`   Products: ${walmartData.products.length}`);
console.log(`   Reviews: ${walmartData.customer_reviews.length}`);
console.log(`   Tickets: ${walmartData.customer_support_tickets.length}`);
console.log('');

/**
 * Helper function to get completion from Azure OpenAI
 */
async function getCompletion(prompt, temperature = 0.7) {
    const tempModel = new AzureChatOpenAI({
        azureOpenAIEndpoint: "https://aoi-ext-eus-aiml-profx-01.openai.azure.com/",
        azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
        azureOpenAIApiDeploymentName: "gpt-4o",
        azureOpenAIApiVersion: "2024-12-01-preview",
        temperature: temperature,
        topP: 1.0,
    });
    const response = await tempModel.invoke(prompt);
    return response.content;
}

/**
 * Helper function with top_p parameter
 */
async function getCompletionWithTopP(prompt, topP = 1.0, temperature = 1.0) {
    const tempModel = new AzureChatOpenAI({
        azureOpenAIEndpoint: "https://aoi-ext-eus-aiml-profx-01.openai.azure.com/",
        azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
        azureOpenAIApiDeploymentName: "gpt-4o",
        azureOpenAIApiVersion: "2024-12-01-preview",
        temperature: temperature,
        topP: topP,
    });
    const response = await tempModel.invoke(prompt);
    return response.content;
}

// ============================================================================
// 1. PROMPT ENGINEERING TECHNIQUES
// ============================================================================

console.log('='``.repeat(80));
console.log('SECTION 1: Prompt Engineering Techniques');
console.log('='``.repeat(80) + '\n');

async function demonstratePromptEngineering() {
    const product = walmartData.products[0]; // Samsung TV

    // Poor prompt - vague and lacks context
    const poorPrompt = `Write about this product: ${product.name}`;

    // Good prompt - clear, specific, with role and structure
    const goodPrompt = `You are a professional eCommerce product copywriter for Walmart.

Product Details:
- Name: ${product.name}
- Category: ${product.category}
- Price: $${product.price}
- Description: ${product.description}
- Rating: ${product.rating}/5 (${product.reviews_count} reviews)

Task: Write a compelling 100-word product highlight for the website homepage that:
1. Emphasizes key features
2. Appeals to budget-conscious shoppers
3. Creates urgency
4. Ends with a call-to-action

Use an enthusiastic but professional tone.`;

    console.log('🔴 POOR PROMPT:');
    console.log(poorPrompt);
    console.log('\n' + '='.repeat(80) + '\n');
    console.log('🟢 GOOD PROMPT:');
    console.log(goodPrompt);
    console.log('\n' + '='.repeat(80) + '\n');

    console.log('🔴 Response to POOR PROMPT:');
    const poorResponse = await getCompletion(poorPrompt);
    console.log(poorResponse);
    console.log('\n' + '='.repeat(80) + '\n');
    console.log('🟢 Response to GOOD PROMPT:');
    const goodResponse = await getCompletion(goodPrompt);
    console.log(goodResponse);
    console.log('\n');
}

// ============================================================================
// EXERCISE 1: Improve This Prompt
// ============================================================================

async function exercise1() {
    console.log('='``.repeat(80));
    console.log('EXERCISE 1: Improve Review Analysis Prompt');
    console.log('='``.repeat(80) + '\n');

    const tvReviews = walmartData.customer_reviews.filter(r => r.product_id === 'P001');

    // TODO: Create an improved prompt for review analysis
    const improvedPrompt = `# Your improved prompt here

`;

    console.log('TODO: Implement your improved prompt');
    console.log('Uncomment the code below to test your solution:\n');
    console.log('// const response = await getCompletion(improvedPrompt);');
    console.log('// console.log(response);');
    console.log('');
}

// ============================================================================
// 2. ZERO-SHOT PROMPTING
// ============================================================================

console.log('='``.repeat(80));
console.log('SECTION 2: Zero-Shot Prompting');
console.log('='``.repeat(80) + '\n');

async function demonstrateZeroShot() {
    // Zero-Shot Example: Product Categorization
    const zeroShotPrompt = `Classify the following product into ONE of these categories:
- Electronics
- Grocery
- Sports & Outdoors
- Home & Kitchen
- Health & Personal Care
- Toys & Games

Product: Wireless Bluetooth Speaker with 20-hour battery life

Category:`;

    console.log('Zero-Shot Classification:');
    const classification = await getCompletion(zeroShotPrompt, 0);
    console.log(classification);
    console.log('');

    // Zero-Shot Example: Sentiment Analysis
    const review = walmartData.customer_reviews[2]; // Instant Pot review

    const zeroShotSentiment = `Analyze the sentiment of this customer review and classify it as Positive, Negative, or Neutral.
Also provide a brief explanation.

Review: ${review.review_text}

Sentiment:`;

    console.log('Zero-Shot Sentiment Analysis:');
    const sentiment = await getCompletion(zeroShotSentiment, 0);
    console.log(sentiment);
    console.log('');
}

// ============================================================================
// EXERCISE 2: Zero-Shot Support Ticket Classification
// ============================================================================

async function exercise2() {
    console.log('='``.repeat(80));
    console.log('EXERCISE 2: Zero-Shot Support Ticket Classification');
    console.log('='``.repeat(80) + '\n');

    const ticket = walmartData.customer_support_tickets[0];

    // TODO: Create a zero-shot prompt for ticket priority classification
    const zeroShotTicketPrompt = `# TODO: Write your prompt

`;

    console.log('TODO: Implement zero-shot ticket classification');
    console.log('Uncomment the code below to test:\n');
    console.log('// const response = await getCompletion(zeroShotTicketPrompt, 0);');
    console.log('// console.log(response);');
    console.log('');
}

// ============================================================================
// 3. FEW-SHOT PROMPTING
// ============================================================================

console.log('='``.repeat(80));
console.log('SECTION 3: Few-Shot Prompting');
console.log('='``.repeat(80) + '\n');

async function demonstrateFewShot() {
    // Few-Shot Example: Product Title Optimization
    const fewShotPrompt = `You are optimizing product titles for better search visibility and click-through rates.
Transform generic titles into SEO-optimized titles following these examples:

Example 1:
Input: Coffee Maker
Output: Keurig K-Classic Single Serve K-Cup Pod Coffee Maker - Black, Quick Brew

Example 2:
Input: Running Shoes
Output: Nike Air Max Men's Running Shoes - Breathable Mesh, Cushioned Sole, Size 8-13

Example 3:
Input: Pressure Cooker
Output: Instant Pot Duo 7-in-1 Electric Pressure Cooker - 6 Qt, Stainless Steel, Slow Cook

Now optimize this title:
Input: Toothpaste
Output:`;

    console.log('Few-Shot Title Optimization:');
    const optimized = await getCompletion(fewShotPrompt, 0.3);
    console.log(optimized);
    console.log('\n' + '='.repeat(80) + '\n');

    // Few-Shot Example: Customer Support Response Template
    const fewShotSupport = `Generate professional customer support responses following these examples:

Example 1:
Issue: Product arrived damaged
Response: We sincerely apologize for receiving a damaged product. This is not the experience we want for our customers. We'll immediately send you a replacement at no charge, and you can keep or dispose of the damaged item. Your replacement will ship within 24 hours with expedited delivery. We've also added a $20 Walmart credit to your account for the inconvenience.

Example 2:
Issue: Late delivery
Response: We understand how frustrating delivery delays can be, and we apologize for not meeting your expectations. We've contacted our shipping partner to expedite your order, and it should arrive within 2 business days. As a gesture of goodwill, we're refunding your shipping fee and providing free shipping on your next order.

Now generate a response for this issue:
Issue: Product stopped working after 3 weeks
Response:`;

    console.log('Few-Shot Support Response:');
    const supportResponse = await getCompletion(fewShotSupport, 0.5);
    console.log(supportResponse);
    console.log('');
}

// ============================================================================
// EXERCISE 3: Create Few-Shot Product Description Writer
// ============================================================================

async function exercise3() {
    console.log('='``.repeat(80));
    console.log('EXERCISE 3: Few-Shot Product Description Writer');
    console.log('='``.repeat(80) + '\n');

    // TODO: Create a few-shot prompt for product descriptions
    const fewShotDescriptionPrompt = `# TODO: Add your examples and prompt here

`;

    console.log('TODO: Implement few-shot product description writer');
    console.log('Test with LEGO product:');
    const testProduct = walmartData.products[5];
    console.log(`Product: ${testProduct.name}`);
    console.log('Uncomment to test:\n');
    console.log('// const response = await getCompletion(fewShotDescriptionPrompt, 0.6);');
    console.log('// console.log(response);');
    console.log('');
}

// ============================================================================
// 4. PROMPT TEMPLATES WITH LANGCHAIN
// ============================================================================

console.log('='``.repeat(80));
console.log('SECTION 4: Prompt Templates with LangChain');
console.log('='``.repeat(80) + '\n');

async function demonstratePromptTemplates() {
    // Simple Prompt Template Example
    const recommendationTemplate = new PromptTemplate({
        inputVariables: ['category', 'price_range', 'customer_preference'],
        template: `You are a Walmart product recommendation assistant.
    
Customer is looking for:
- Category: {category}
- Budget: {price_range}
- Preference: {customer_preference}

Based on our inventory, recommend 3 products and explain why each is a good fit.
Format your response as a numbered list with product name and brief reasoning.
`
    });

    const prompt = await recommendationTemplate.format({
        category: 'Electronics',
        price_range: '$200-$300',
        customer_preference: 'Something for entertainment and gaming'
    });

    console.log('Generated Prompt:');
    console.log(prompt);
    console.log('\n' + '='.repeat(80) + '\n');
    console.log('AI Response:');
    const response = await getCompletion(prompt);
    console.log(response);
    console.log('');
}

async function demonstrateChatPromptTemplate() {
    const review = walmartData.customer_reviews[0];
    const product = walmartData.products[0];

    const chatTemplate = ChatPromptTemplate.fromMessages([
        ['system', 'You are an expert customer review analyst for Walmart\'s eCommerce platform. Your job is to extract insights from customer reviews.'],
        ['human', `Analyze this product review and provide:
1. Overall sentiment (Positive/Negative/Mixed)
2. Key points mentioned
3. Suggested action for the product team

Product: {product_name}
Review: {review_text}
Rating: {rating}/5
`]
    ]);

    const messages = await chatTemplate.formatMessages({
        product_name: product.name,
        review_text: review.review_text,
        rating: review.rating
    });

    console.log('Chat Template Messages:');
    messages.forEach(msg => {
        console.log(`${msg._getType().toUpperCase()}: ${msg.content}\n`);
    });
}

// ============================================================================
// EXERCISE 4: Create a Prompt Template
// ============================================================================

async function exercise4() {
    console.log('='``.repeat(80));
    console.log('EXERCISE 4: Product Comparison Prompt Template');
    console.log('='``.repeat(80) + '\n');

    // TODO: Create a product comparison prompt template
    const comparisonTemplate = new PromptTemplate({
        inputVariables: [], // TODO: Add your input variables
        template: `# TODO: Write your template
        
        `
    });

    console.log('TODO: Implement product comparison template');
    console.log('Test with Samsung TV vs AirPods');
    console.log('');
}

// ============================================================================
// 5. TEMPERATURE AND TOP_P PARAMETERS
// ============================================================================

console.log('='``.repeat(80));
console.log('SECTION 5: Temperature and Top_p Parameters');
console.log('='``.repeat(80) + '\n');

async function demonstrateTemperature() {
    const product = walmartData.products[6]; // Keurig Coffee Maker

    const prompt = `Write a catchy 2-sentence marketing tagline for this product:
${product.name} - ${product.description}
`;

    console.log('🌡️ TEMPERATURE COMPARISON\n');
    console.log('='.repeat(80));

    // Low temperature - Consistent, focused
    console.log('\n❄️ Temperature 0.0 (Deterministic):');
    for (let i = 0; i < 3; i++) {
        const response = await getCompletion(prompt, 0.0);
        console.log(`  Attempt ${i + 1}: ${response}`);
    }

    console.log('\n' + '='.repeat(80));

    // Medium temperature - Balanced
    console.log('\n🌤️ Temperature 0.7 (Balanced):');
    for (let i = 0; i < 3; i++) {
        const response = await getCompletion(prompt, 0.7);
        console.log(`  Attempt ${i + 1}: ${response}`);
    }

    console.log('\n' + '='.repeat(80));

    // High temperature - Creative, varied
    console.log('\n🔥 Temperature 1.0 (Creative):');
    for (let i = 0; i < 3; i++) {
        const response = await getCompletion(prompt, 1.0);
        console.log(`  Attempt ${i + 1}: ${response}`);
    }
    console.log('');
}

async function demonstrateTopP() {
    const prompt = 'Describe the Instant Pot in one creative sentence:';

    console.log('🎯 TOP_P COMPARISON\n');
    console.log('='.repeat(80));

    console.log('\nLow Top_p (0.1) - Focused:');
    for (let i = 0; i < 3; i++) {
        const response = await getCompletionWithTopP(prompt, 0.1, 0.8);
        console.log(`  ${i + 1}. ${response}`);
    }

    console.log('\n' + '='.repeat(80));

    console.log('\nHigh Top_p (0.95) - Diverse:');
    for (let i = 0; i < 3; i++) {
        const response = await getCompletionWithTopP(prompt, 0.95, 0.8);
        console.log(`  ${i + 1}. ${response}`);
    }
    console.log('');
}

// ============================================================================
// EXERCISE 5: Choose the Right Parameters
// ============================================================================

async function exercise5() {
    console.log('='``.repeat(80));
    console.log('EXERCISE 5: Choose the Right Parameters');
    console.log('='``.repeat(80) + '\n');

    // Scenario 1: Extract product prices from customer support tickets
    const ticket = walmartData.customer_support_tickets[0];

    const extractionPrompt = `Extract the product ID from this support ticket. Return only the product ID.

Ticket: ${ticket.description}
Product ID mentioned: ${ticket.product_id}

Product ID:`;

    console.log('Scenario 1: Data Extraction');
    console.log('TODO: Choose appropriate temperature and top_p');
    console.log('// const temperature = ?');
    console.log('// const top_p = ?');
    console.log('// Why did you choose these values?');
    console.log('');

    // Scenario 2: Generate creative product bundle ideas
    const products = walmartData.products.slice(0, 3);

    const bundlePrompt = `Create 3 creative product bundle ideas combining these products:
1. ${products[0].name}
2. ${products[1].name}
3. ${products[2].name}

Make the bundles appealing and give each a catchy name.
`;

    console.log('Scenario 2: Creative Bundle Generation');
    console.log('TODO: Choose appropriate temperature and top_p');
    console.log('// const temperature = ?');
    console.log('// const top_p = ?');
    console.log('// Why did you choose these values?');
    console.log('');
}

// ============================================================================
// 6. COMPLETE RETAIL AI ASSISTANT
// ============================================================================

class RetailAIAssistant {
    constructor(data) {
        this.data = data;
    }

    async classifyProduct(productDescription) {
        const prompt = `Classify this product into ONE category:
Electronics, Grocery, Sports & Outdoors, Home & Kitchen, Health & Personal Care, Toys & Games

Product: ${productDescription}
Category:`;

        const tempModel = new AzureChatOpenAI({
            azureOpenAIEndpoint: "https://aoi-ext-eus-aiml-profx-01.openai.azure.com/",
            azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
            azureOpenAIApiDeploymentName: "gpt-4o",
            azureOpenAIApiVersion: "2024-12-01-preview",
            temperature: 0.0,
            topP: 1.0,
        });
        const response = await tempModel.invoke(prompt);
        return response.content.trim();
    }

    async analyzeReview(productName, reviewText, rating) {
        const prompt = `Product: ${productName}
Review: ${reviewText}
Rating: ${rating}/5

Provide:
1. Sentiment (one word)
2. Key insight (one sentence)
3. Action item (one sentence)`;

        const tempModel = new AzureChatOpenAI({
            azureOpenAIEndpoint: "https://aoi-ext-eus-aiml-profx-01.openai.azure.com/",
            azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
            azureOpenAIApiDeploymentName: "gpt-4o",
            azureOpenAIApiVersion: "2024-12-01-preview",
            temperature: 0.3,
            topP: 1.0,
        });
        const messages = [
            { role: 'system', content: 'You are a customer review analyst. Provide concise, actionable insights.' },
            { role: 'user', content: prompt }
        ];
        const response = await tempModel.invoke(messages);
        return response.content;
    }

    async generateMarketingCopy(productName, description, creativeLevel = 'medium') {
        const tempMap = { low: 0.3, medium: 0.7, high: 0.9 };
        const temperature = tempMap[creativeLevel] || 0.7;

        const prompt = `Create engaging marketing copy for:
Product: ${productName}
Details: ${description}

Write a compelling 50-word product highlight that creates desire and urgency.`;

        const tempModel = new AzureChatOpenAI({
            azureOpenAIEndpoint: "https://aoi-ext-eus-aiml-profx-01.openai.azure.com/",
            azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
            azureOpenAIApiDeploymentName: "gpt-4o",
            azureOpenAIApiVersion: "2024-12-01-preview",
            temperature: temperature,
            topP: 1.0,
        });
        const response = await tempModel.invoke(prompt);
        return response.content;
    }
}

async function demonstrateRetailAssistant() {
    console.log('='``.repeat(80));
    console.log('COMPLETE RETAIL AI ASSISTANT');
    console.log('='``.repeat(80) + '\n');

    const assistant = new RetailAIAssistant(walmartData);

    console.log('🤖 Retail AI Assistant Initialized!\n');

    // Test product classification
    console.log('1️⃣ Product Classification:');
    const category = await assistant.classifyProduct('Wireless Gaming Mouse with RGB Lighting');
    console.log(`   Category: ${category}\n`);

    // Test review analysis
    console.log('2️⃣ Review Analysis:');
    const review = walmartData.customer_reviews[2];
    const analysis = await assistant.analyzeReview('Instant Pot', review.review_text, review.rating);
    console.log(`   ${analysis}\n`);

    // Test marketing copy generation
    console.log('3️⃣ Marketing Copy (High Creativity):');
    const product = walmartData.products[7];
    const copy = await assistant.generateMarketingCopy(product.name, product.description, 'high');
    console.log(`   ${copy}\n`);
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
    try {
        // Uncomment the sections you want to run:
        
        // await demonstratePromptEngineering();
        // await exercise1();
        
        // await demonstrateZeroShot();
        // await exercise2();
        
        // await demonstrateFewShot();
        // await exercise3();
        
        // await demonstratePromptTemplates();
        // await demonstrateChatPromptTemplate();
        // await exercise4();
        
        // await demonstrateTemperature();
        // await demonstrateTopP();
        // await exercise5();
        
        // await demonstrateRetailAssistant();

        console.log('\n✅ Module 02 exercises ready!');
        console.log('Uncomment the sections in main() to run demonstrations and exercises.');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
