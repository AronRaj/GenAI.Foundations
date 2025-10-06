# Module 02: Prompt Engineering for Retail/eCommerce

## Overview
This module teaches essential prompt engineering techniques using real-world retail/eCommerce scenarios based on a Walmart-style platform. You'll learn how to craft effective prompts, leverage zero-shot and few-shot learning, use prompt templates, and control AI behavior with temperature and top_p parameters.

## Learning Objectives
By the end of this module, you will be able to:

1. **Apply Prompt Engineering Best Practices**
   - Write clear, specific, and well-structured prompts
   - Use role-based prompting effectively
   - Structure prompts for optimal results

2. **Implement Zero-Shot and Few-Shot Prompting**
   - Understand when to use each technique
   - Provide effective examples for few-shot learning
   - Achieve consistent outputs across similar tasks

3. **Create and Use Prompt Templates**
   - Build reusable prompt structures with LangChain
   - Implement chat prompt templates
   - Design few-shot prompt templates

4. **Control AI Behavior with Parameters**
   - Adjust temperature for different use cases
   - Use top_p for controlled diversity
   - Choose optimal parameters for specific scenarios

## Prerequisites
- Completion of Module 01 or equivalent LangChain knowledge
- Basic understanding of AI/LLM concepts
- Node.js 18+
- OpenAI API key

## Dataset
The module uses `walmart_data.json` which includes:
- **8 Products** across various categories (Electronics, Grocery, Sports, Home & Kitchen, etc.)
- **8 Customer Reviews** with ratings and feedback
- **4 Support Tickets** representing common customer issues
- **3 Orders** with shipping information
- **Product FAQs** for common questions

This realistic dataset allows you to practice prompt engineering in authentic retail scenarios.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd Module02/JavaScript
   npm install
   ```

2. **Set Up Environment Variables**
   Create a `.env` file in this directory:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

3. **Run the Script**
   ```bash
   node prompt-engineering.js
   ```
   
   By default, all demo sections are commented out. Uncomment the sections in the `main()` function that you want to run.

## File Structure

- `prompt-engineering.js` - Main exercise file with demonstrations
- `Solution/prompt-engineering-solution.js` - Complete solutions to all exercises
- `package.json` - Dependencies configuration
- `Instructions.md` - This file

## Running Specific Sections

Open `prompt-engineering.js` and uncomment the sections you want to run in the `main()` function:

```javascript
async function main() {
    // Uncomment to run:
    await demonstratePromptEngineering();
    await exercise1();
    // ... etc
}
```

## Exercises

### Exercise 1: Improve This Prompt
**File**: `prompt-engineering.js` (line ~140)  
**Difficulty**: Beginner

Transform a vague prompt into a well-structured one for analyzing customer reviews.

### Exercise 2: Zero-Shot Support Ticket Classification
**File**: `prompt-engineering.js` (line ~160)  
**Difficulty**: Beginner

Create a zero-shot prompt to classify support tickets by priority level.

### Exercise 3: Few-Shot Product Description Writer
**File**: `prompt-engineering.js` (line ~220)  
**Difficulty**: Intermediate

Develop a few-shot prompt that teaches the AI to write product descriptions in a specific style.

### Exercise 4: Product Comparison Template
**File**: `prompt-engineering.js` (line ~280)  
**Difficulty**: Intermediate

Build a reusable LangChain prompt template for comparing two products.

### Exercise 5: Choose the Right Parameters
**File**: `prompt-engineering.js` (line ~370)  
**Difficulty**: Intermediate

Select appropriate temperature and top_p values for different scenarios.

## Key Concepts

### Temperature & Top_p Guide
| Use Case | Temperature | Top_p | Rationale |
|----------|------------|-------|-----------|
| Classification | 0.0 - 0.2 | 1.0 | Need deterministic results |
| Data Extraction | 0.0 - 0.2 | 1.0 | Factual accuracy required |
| Customer Support | 0.5 - 0.7 | 0.9 | Balance helpfulness & consistency |
| Product Descriptions | 0.6 - 0.8 | 0.9 | Some creativity, maintain clarity |
| Marketing Copy | 0.8 - 1.0 | 0.95 | High creativity needed |
| Brainstorming | 0.9 - 1.0 | 0.95 | Maximum diversity |

## Tips for Success

1. **Start Simple**: Begin with zero-shot, add examples if results aren't satisfactory
2. **Be Specific**: Vague prompts produce vague results
3. **Test Iteratively**: Run prompts multiple times to check consistency
4. **Use Low Temperature for Facts**: When accuracy matters, use 0.0-0.3
5. **Use High Temperature for Creativity**: For unique content, use 0.7-1.0

## Additional Resources

- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [LangChain Prompting Guide](https://js.langchain.com/docs/modules/model_io/prompts/)
- [Prompt Engineering Best Practices](https://www.promptingguide.ai/)

## Troubleshooting

**Issue**: Module not found errors  
**Solution**: Run `npm install` to install dependencies

**Issue**: API key errors  
**Solution**: Verify your `.env` file has `OPENAI_API_KEY=your_key`

**Issue**: Inconsistent results  
**Solution**: Lower the temperature parameter

---

**Happy Learning! 🚀**
