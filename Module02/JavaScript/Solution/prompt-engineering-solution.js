/**
 * Module 02: Prompt Engineering for Retail/eCommerce - SOLUTION
 * JavaScript/LangChain Implementation
 */

import { AzureChatOpenAI } from '@langchain/openai';
import { PromptTemplate, ChatPromptTemplate, FewShotPromptTemplate } from '@langchain/core/prompts';
import { readFileSync } from 'fs';
import { config } from 'dotenv';

config();

// Verify the API key is loaded
console.log(process.env.AZURE_OPENAI_API_KEY ? 'API Key loaded successfully' : 'API Key not found');

const walmartData = JSON.parse(readFileSync('../../data/walmart_data.json', 'utf-8'));

// Initialize Azure OpenAI model
const model = new AzureChatOpenAI({
    azureOpenAIEndpoint: "https://aoi-ext-eus-aiml-profx-01.openai.azure.com/",
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiDeploymentName: "gpt-4o",
    azureOpenAIApiVersion: "2024-12-01-preview",
    temperature: 0.7,
    topP: 1.0,
});

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
// EXERCISE 1 SOLUTION: Improved Review Analysis Prompt
// ============================================================================

async function exercise1Solution() {
    console.log('='``.repeat(80));
    console.log('EXERCISE 1 SOLUTION: Improved Review Analysis Prompt');
    console.log('='``.repeat(80) + '\n');

    const tvReviews = walmartData.customer_reviews.filter(r => r.product_id === 'P001');
    const product = walmartData.products[0];

    // SOLUTION: Improved prompt with clear role, structure, and requirements
    const improvedPrompt = `You are a senior customer insights analyst for Walmart's eCommerce platform.
Your expertise is in extracting actionable insights from customer feedback to improve products and services.

Task: Analyze the following customer reviews for ${product.name}

Reviews:
${tvReviews.map((r, i) => `${i + 1}. Rating: ${r.rating}/5 - ${r.review_text}`).join('\n')}

Please provide your analysis in the following format:

1. **Overall Sentiment**: (Positive/Negative/Mixed) with percentage breakdown
2. **Common Praise**: Top 3 features customers love
3. **Common Complaints**: Top 3 issues or concerns
4. **Product Team Recommendations**: 2-3 specific actionable improvements
5. **Marketing Opportunities**: Which positive aspects should be highlighted in marketing?

Keep your analysis concise and data-driven.`;

    console.log('IMPROVED PROMPT:');
    console.log(improvedPrompt);
    console.log('\n' + '='.repeat(80) + '\n');
    console.log('AI RESPONSE:');
    const response = await getCompletion(improvedPrompt, 0.3);
    console.log(response);
    console.log('');
}

// ============================================================================
// EXERCISE 2 SOLUTION: Zero-Shot Support Ticket Classification
// ============================================================================

async function exercise2Solution() {
    console.log('='``.repeat(80));
    console.log('EXERCISE 2 SOLUTION: Zero-Shot Support Ticket Classification');
    console.log('='``.repeat(80) + '\n');

    const ticket = walmartData.customer_support_tickets[0];

    // SOLUTION: Zero-shot prompt with clear criteria
    const zeroShotTicketPrompt = `You are a customer support ticket triage specialist.

Classify the priority of this support ticket based on these criteria:

Priority Levels:
- CRITICAL: Product safety issues, data breaches, or legal concerns
- HIGH: Product defects, significant customer impact, time-sensitive issues
- MEDIUM: Shipping delays, minor product issues, general inquiries
- LOW: Questions, feature requests, non-urgent feedback

Support Ticket:
Type: ${ticket.issue_type}
Description: ${ticket.description}
Current Status: ${ticket.status}

Provide:
1. Priority Level: (CRITICAL/HIGH/MEDIUM/LOW)
2. Reasoning: (2-3 sentences explaining the classification)
3. Suggested Response Time: (e.g., within 1 hour, within 24 hours, within 3 days)
`;

    console.log('Zero-Shot Ticket Classification:');
    const response = await getCompletion(zeroShotTicketPrompt, 0);
    console.log(response);
    console.log('');
}

// ============================================================================
// EXERCISE 3 SOLUTION: Few-Shot Product Description Writer
// ============================================================================

async function exercise3Solution() {
    console.log('='``.repeat(80));
    console.log('EXERCISE 3 SOLUTION: Few-Shot Product Description Writer');
    console.log('='``.repeat(80) + '\n');

    // SOLUTION: Few-shot prompt with examples demonstrating desired style
    const testProduct = walmartData.products[5]; // LEGO set

    const fewShotDescriptionPrompt = `You are writing engaging product descriptions for Walmart's website.
Follow the style and structure shown in these examples:

Example 1:
Product: Samsung 55-inch 4K Smart TV
Description: Transform your living room into a home theater! 🎬 This stunning Samsung 4K Smart TV delivers crystal-clear picture quality with vibrant HDR colors that bring every scene to life. Stream your favorite shows effortlessly with built-in apps, control everything with your voice, and enjoy the sleek, modern design that complements any décor. Perfect for movie nights, sports, and gaming!

Example 2:
Product: Instant Pot Duo 7-in-1
Description: Say goodbye to kitchen chaos! 👨‍🍳 The Instant Pot Duo replaces 7 appliances in one compact design—pressure cook, slow cook, steam, sauté, and more! Cut cooking time in half while keeping all the flavor. From weeknight dinners to meal prep Sundays, this kitchen powerhouse makes healthy, delicious meals easier than ever. Your family will wonder what took you so long!

Now write a description for this product following the same style:
Product: ${testProduct.name}
Key Features: ${testProduct.description}
Price: $${testProduct.price}
Description:`;

    console.log('Few-Shot Product Description:');
    const response = await getCompletion(fewShotDescriptionPrompt, 0.7);
    console.log(response);
    console.log('');
}

// ============================================================================
// EXERCISE 4 SOLUTION: Product Comparison Prompt Template
// ============================================================================

async function exercise4Solution() {
    console.log('='``.repeat(80));
    console.log('EXERCISE 4 SOLUTION: Product Comparison Prompt Template');
    console.log('='``.repeat(80) + '\n');

    // SOLUTION: Comprehensive product comparison template
    const comparisonTemplate = new PromptTemplate({
        inputVariables: [
            'product1_name', 'product1_price', 'product1_desc', 'product1_rating',
            'product2_name', 'product2_price', 'product2_desc', 'product2_rating',
            'criteria', 'target_audience'
        ],
        template: `You are a product comparison expert helping Walmart customers make informed decisions.

Compare these two products for {target_audience}:

**Product A:**
- Name: {product1_name}
- Price: ${'{product1_price}'}
- Description: {product1_desc}
- Rating: {product1_rating}/5

**Product B:**
- Name: {product2_name}
- Price: ${'{product2_price}'}
- Description: {product2_desc}
- Rating: {product2_rating}/5

Comparison Criteria: {criteria}

Provide a detailed comparison that includes:
1. **Head-to-Head**: Compare both products across each criterion
2. **Best For**: Who should buy Product A vs Product B
3. **Value Analysis**: Which offers better value and why
4. **Final Recommendation**: Your top pick with clear reasoning

Format your response with clear headings and bullet points.
        `
    });

    // Test with Samsung TV vs AirPods
    const product1 = walmartData.products[0];
    const product2 = walmartData.products[7];

    const prompt = await comparisonTemplate.format({
        product1_name: product1.name,
        product1_price: product1.price,
        product1_desc: product1.description,
        product1_rating: product1.rating,
        product2_name: product2.name,
        product2_price: product2.price,
        product2_desc: product2.description,
        product2_rating: product2.rating,
        criteria: 'entertainment value, features, customer reviews, price-to-value ratio',
        target_audience: 'tech enthusiasts on a $300 budget'
    });

    console.log('Product Comparison Report:');
    const response = await getCompletion(prompt, 0.5);
    console.log(response);
    console.log('');
}

// ============================================================================
// EXERCISE 5 SOLUTION: Choosing the Right Parameters
// ============================================================================

async function exercise5Solution() {
    console.log('='``.repeat(80));
    console.log('EXERCISE 5 SOLUTION: Choosing the Right Parameters');
    console.log('='``.repeat(80) + '\n');

    // Scenario 1 SOLUTION: Extract product prices from customer support tickets
    const ticket = walmartData.customer_support_tickets[0];

    const extractionPrompt = `Extract the product ID from this support ticket. Return only the product ID.

Ticket Description: ${ticket.description}
Product ID mentioned: ${ticket.product_id}

Product ID:`;

    // SOLUTION: Low temperature for factual extraction
    const temp1 = 0.0; // Deterministic, factual output
    const topP1 = 1.0; // Not adjusting top_p when using temperature

    console.log('Scenario 1: Data Extraction');
    console.log(`Temperature: ${temp1} (Deterministic - need exact, consistent extraction)`);
    console.log(`Top_p: ${topP1} (Default)\n`);

    console.log('Testing consistency (should be identical):');
    for (let i = 0; i < 3; i++) {
        const response = await getCompletionWithTopP(extractionPrompt, topP1, temp1);
        console.log(`  Attempt ${i + 1}: ${response}`);
    }

    console.log('\n' + '='.repeat(80) + '\n');

    // Scenario 2 SOLUTION: Generate creative product bundle ideas
    const products = walmartData.products.slice(0, 3);

    const bundlePrompt = `Create 3 creative product bundle ideas combining these products:
1. ${products[0].name} - $${products[0].price}
2. ${products[1].name} - $${products[1].price}
3. ${products[2].name} - $${products[2].price}

For each bundle:
- Give it a catchy, memorable name
- Explain the value proposition
- Suggest a bundle price with discount
- Identify the target customer
`;

    // SOLUTION: High temperature for creative brainstorming
    const temp2 = 0.9; // High creativity for diverse bundle ideas
    const topP2 = 0.95; // Slightly focused to maintain coherence

    console.log('Scenario 2: Creative Bundle Generation');
    console.log(`Temperature: ${temp2} (High creativity - need diverse, innovative ideas)`);
    console.log(`Top_p: ${topP2} (Diverse but coherent)\n`);

    console.log('Generated Bundle Ideas (showing variation):');
    for (let i = 0; i < 2; i++) {
        console.log(`\n${'='.repeat(80)}`);
        console.log(`Variation ${i + 1}:`);
        console.log('='.repeat(80));
        const response = await getCompletionWithTopP(bundlePrompt, topP2, temp2);
        console.log(response);
    }
    console.log('');
}

// ============================================================================
// BONUS SOLUTION: Advanced Review Response System
// ============================================================================

class ReviewResponseSystem {
    constructor() {
        this.examples = [
            {
                rating: '5',
                review: 'Love this product! Works perfectly and exceeded my expectations.',
                response: 'Thank you so much for your wonderful review! We\'re thrilled to hear our product exceeded your expectations. Your satisfaction means the world to us, and we appreciate you taking the time to share your experience. Happy shopping!'
            },
            {
                rating: '3',
                review: 'Product is okay but the delivery was late.',
                response: 'Thank you for your honest feedback. We\'re glad the product meets your needs, but we sincerely apologize for the delivery delay. This isn\'t the experience we want for our customers. We\'re working to improve our delivery times and would love to make this right with a discount on your next order.'
            },
            {
                rating: '1',
                review: 'Terrible quality. Broke after one week.',
                response: 'We\'re extremely sorry to hear about your experience. This is absolutely not acceptable, and we want to make this right immediately. Please contact our support team at 1-800-WALMART or DM us your order number, and we\'ll send you a replacement with expedited shipping at no cost, plus a full refund. Your satisfaction is our priority.'
            }
        ];
    }

    async generateResponse(reviewText, rating) {
        const examplesText = this.examples
            .map(ex => `Review (Rating ${ex.rating}/5): ${ex.review}\nResponse: ${ex.response}`)
            .join('\n\n');

        const prompt = `You are Walmart's customer service representative responding to product reviews.
Follow these examples to maintain consistent tone and approach:

${examplesText}

Now generate a response for:
Review (Rating ${rating}/5): ${reviewText}
Response:`;

        const tempModel = new AzureChatOpenAI({
            azureOpenAIEndpoint: "https://aoi-ext-eus-aiml-profx-01.openai.azure.com/",
            azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
            azureOpenAIApiDeploymentName: "gpt-4o",
            azureOpenAIApiVersion: "2024-12-01-preview",
            temperature: 0.5,
            topP: 1.0,
        });
        const response = await tempModel.invoke(prompt);
        return response.content;
    }
}

async function bonusSolution() {
    console.log('='``.repeat(80));
    console.log('BONUS: Automated Review Response System');
    console.log('='``.repeat(80) + '\n');

    const system = new ReviewResponseSystem();

    for (let i = 0; i < 3; i++) {
        const review = walmartData.customer_reviews[i];
        console.log(`\nReview ${i + 1}:`);
        console.log(`Rating: ${review.rating}/5`);
        console.log(`Review: ${review.review_text}`);
        console.log(`\nGenerated Response:`);
        const response = await system.generateResponse(review.review_text, review.rating);
        console.log(response);
        console.log('\n' + '='.repeat(80));
    }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
    try {
        console.log('✅ Module 02 Solutions - JavaScript/LangChain\n');

        // Uncomment the solutions you want to run:
        
        // await exercise1Solution();
        // await exercise2Solution();
        // await exercise3Solution();
        // await exercise4Solution();
        // await exercise5Solution();
        // await bonusSolution();

        console.log('\n🎉 All solutions implemented!');
        console.log('Uncomment the solution functions in main() to run them.');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
