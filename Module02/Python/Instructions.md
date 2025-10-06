# Module 02: Prompt Engineering for Retail/eCommerce

## Navigate to Module 02 - Python Directory

Before setting up the virtual environment, make sure you're in the correct directory:

1. **Navigate to the Module 02 Python directory**:

   ```bash
   cd Module02/Python
   ```

2. **Verify you're in the correct location** by checking the contents:

   ```bash
   ls
   ```

   You should see files like `Instructions.md`, `prompt-engineering.ipynb`, `requirements.txt`, and the `data` folder.

## Setting Up a Virtual Environment

When working on Python projects, it's a good practice to set up a virtual environment. A virtual environment allows you to create an isolated space for your project, where you can manage dependencies without affecting the global Python installation.

To set up a virtual environment, follow these steps:

1. **Install `virtualenv`** (if not already installed):

   ```bash
   pip install virtualenv
   ```

2. **Create a new virtual environment**:

   ```bash
   python -m venv .venv-module02
   ```

3. **Activate the virtual environment**:
   - On Windows:

     ```bash
     .venv-module02\Scripts\Activate.ps1
     ```

   - On macOS and Linux:

     ```bash
     source .venv-module02/bin/activate
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

Instead of exporting environment variables in your terminal, you can create a `.env` file in the `Module02/Python` directory:

1. Create a file named `.env` in the `Module02/Python` directory
2. Add the following line to the file:

   ```text
   AZURE_OPENAI_API_KEY=your-api-key-here
   ```

3. Replace `your-api-key-here` with your actual API key
4. The `python-dotenv` package (included in `requirements.txt`) will automatically load these variables

**Important**: Never commit the `.env` file to version control. It should be added to your `.gitignore` file.

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

## Dataset
The module uses `walmart_data.json` which includes:
- **8 Products** across various categories (Electronics, Grocery, Sports, Home & Kitchen, etc.)
- **8 Customer Reviews** with ratings and feedback
- **4 Support Tickets** representing common customer issues
- **3 Orders** with shipping information
- **Product FAQs** for common questions

This realistic dataset allows you to practice prompt engineering in authentic retail scenarios.


## Exercises

### Exercise 1: Improve This Prompt

**Difficulty**: Beginner  
**Topic**: Prompt Engineering Basics

#### Overview

Transform a vague prompt into a well-structured one for analyzing customer reviews. You'll learn how to add clarity and structure to prompts for better results.

#### Learning Objectives

- Understand the components of an effective prompt
- Learn to add clear role definitions
- Practice specifying output format requirements
- Include relevant contextual information

#### Exercise Steps

1. Open `prompt-engineering.ipynb` in VS Code or Jupyter
2. Navigate to Exercise 1
3. Review the vague prompt example
4. Complete the TODO section with an improved prompt that includes:
   - Clear role definition
   - Specific output format requirements
   - Contextual information
5. Run the cell and compare outputs
6. Compare your solution with `Solution/prompt-engineering-solution.ipynb` when complete

#### Expected Outcomes

By the end of this exercise, you should be able to:

- ✅ Write clear, structured prompts with role definitions
- ✅ Specify output formats effectively
- ✅ Include relevant context in prompts
- ✅ Understand the impact of prompt structure on results

### Exercise 2: Zero-Shot Support Ticket Classification

**Difficulty**: Beginner  
**Topic**: Zero-Shot Prompting

#### Overview

Create a zero-shot prompt to classify support tickets by priority level without providing examples. The AI should classify tickets as Critical, High, Medium, or Low based on clear criteria.

#### Learning Objectives

- Understand zero-shot prompting concepts
- Learn to provide clear classification criteria
- Practice creating deterministic classification prompts
- Understand when zero-shot is appropriate

#### Exercise Steps

1. Navigate to Exercise 2 in the notebook
2. Review the support ticket data
3. Complete the TODO section with a zero-shot classification prompt
4. Define clear criteria for each priority level
5. Run the cell and verify classification accuracy
6. Compare your solution with the solution notebook

#### Expected Outcomes

By the end of this exercise, you should be able to:

- ✅ Create effective zero-shot prompts
- ✅ Define clear classification criteria
- ✅ Classify support tickets accurately without examples
- ✅ Understand the limitations of zero-shot prompting

### Exercise 3: Few-Shot Product Description Writer

**Difficulty**: Intermediate  
**Topic**: Few-Shot Prompting

#### Overview

Develop a few-shot prompt that teaches the AI to write product descriptions in a specific engaging style. Include at least 2 quality examples showing the desired tone and structure.

#### Learning Objectives

- Understand few-shot prompting techniques
- Learn to select effective training examples
- Practice creating consistent output styles
- Understand the difference between zero-shot and few-shot

#### Exercise Steps

1. Navigate to Exercise 3 in the notebook
2. Review the product data
3. Complete the TODO section with at least 2 quality examples
4. Ensure examples demonstrate the desired tone and structure
5. Run the cell and generate a new product description
6. Compare your solution with the solution notebook

#### Expected Outcomes

By the end of this exercise, you should be able to:

- ✅ Create effective few-shot prompts
- ✅ Select quality training examples
- ✅ Generate consistent output styles
- ✅ Understand when to use few-shot over zero-shot

### Exercise 4: Product Comparison Template

**Difficulty**: Intermediate  
**Topic**: Prompt Templates

#### Overview

Build a reusable LangChain prompt template for comparing two products. The template should accept multiple variables and generate comprehensive comparison reports.

#### Learning Objectives

- Understand LangChain prompt templates
- Learn to create reusable prompt structures
- Practice using template variables
- Build modular, maintainable prompts

#### Exercise Steps

1. Navigate to Exercise 4 in the notebook
2. Review the LangChain template documentation
3. Complete the TODO section with a prompt template
4. Define template variables for product comparison
5. Run the cell with different product pairs
6. Compare your solution with the solution notebook

#### Expected Outcomes

By the end of this exercise, you should be able to:

- ✅ Create LangChain prompt templates
- ✅ Use template variables effectively
- ✅ Build reusable prompt structures
- ✅ Generate consistent comparison reports

### Exercise 5: Choose the Right Parameters

**Difficulty**: Intermediate  
**Topic**: Temperature & Top_p

#### Overview

For two different scenarios (data extraction and creative brainstorming), select appropriate temperature and top_p values and justify your choices.

#### Learning Objectives

- Understand temperature and top_p parameters
- Learn to select parameters for different use cases
- Practice balancing creativity and consistency
- Understand the impact of parameters on outputs

#### Key Concepts

#### Temperature Parameter (0.0 to 1.0)

Controls randomness in responses:
- `0.0` = Deterministic, consistent outputs
- `0.5` = Balanced creativity and consistency
- `1.0` = Very creative, random outputs

Use cases:
- **Low (0.0-0.3)**: Data extraction, classification, factual tasks
- **Medium (0.4-0.7)**: Customer support, balanced responses
- **High (0.8-1.0)**: Creative writing, brainstorming, marketing

#### Top_p Parameter (0.0 to 1.0)

Controls diversity via nucleus sampling:
- Lower values make responses more focused
- Higher values allow more diverse word choices
- Works in conjunction with temperature

#### Exercise Steps

1. Navigate to Exercise 5 in the notebook
2. Review the two scenarios provided
3. Complete the TODO section with parameter selections
4. Justify your choices for each scenario
5. Run the cells and compare outputs
6. Experiment with different parameter values
7. Compare your solution with the solution notebook

#### Expected Outcomes

By the end of this exercise, you should be able to:

- ✅ Understand temperature and top_p parameters
- ✅ Select appropriate parameters for different use cases
- ✅ Justify parameter choices based on requirements
- ✅ Balance creativity and consistency effectively


## Key Concepts

### Prompt Engineering Techniques
- **Role-Based Prompting**: Give the AI a specific persona
- **Structured Output**: Define clear formatting requirements
- **Context Provision**: Include relevant background information
- **Task Decomposition**: Break complex tasks into steps

### Zero-Shot vs Few-Shot
| Aspect | Zero-Shot | Few-Shot |
|--------|-----------|----------|
| **Examples Needed** | None | 2-5 typically |
| **Best For** | Simple, well-known tasks | Specific formats, consistent style |
| **Flexibility** | High | Medium |
| **Consistency** | Variable | High |

### Temperature & Top_p Guide
| Use Case | Temperature | Top_p | Rationale |
|----------|------------|-------|-----------|
| Classification | 0.0 - 0.2 | 1.0 | Need deterministic results |
| Data Extraction | 0.0 - 0.2 | 1.0 | Factual accuracy required |
| Customer Support | 0.5 - 0.7 | 0.9 | Balance helpfulness & consistency |
| Product Descriptions | 0.6 - 0.8 | 0.9 | Some creativity, maintain clarity |
| Marketing Copy | 0.8 - 1.0 | 0.95 | High creativity needed |
| Brainstorming | 0.9 - 1.0 | 0.95 | Maximum diversity |

## Common Patterns

### 1. Customer Review Analysis
```
You are a [role].

Review Data:
- Product: [name]
- Rating: [X]/5
- Review: [text]

Provide:
1. Sentiment
2. Key insights
3. Action items
```

### 2. Product Categorization
```
Classify into ONE category:
[List categories]

Product: [description]

Category:
```

### 3. Support Response Generation
```
Examples:
Issue: [example 1]
Response: [response 1]

Issue: [example 2]
Response: [response 2]

Now respond to:
Issue: [new issue]
Response:
```

## Tips for Success

1. **Start Simple**: Begin with zero-shot, add examples if results aren't satisfactory
2. **Be Specific**: Vague prompts produce vague results
3. **Test Iteratively**: Run prompts multiple times to check consistency
4. **Use Low Temperature for Facts**: When accuracy matters, use 0.0-0.3
5. **Use High Temperature for Creativity**: For unique content, use 0.7-1.0
6. **Provide Examples**: Quality examples in few-shot prompting are crucial
7. **Format Matters**: Use markdown, bullet points, numbering for clarity
8. **Test Edge Cases**: Try your prompts with unusual inputs

## Real-World Applications

This module's techniques apply to:
- **eCommerce Platforms**: Product descriptions, reviews, recommendations
- **Customer Support**: Ticket classification, response generation
- **Content Marketing**: Ad copy, email campaigns, social media posts
- **Data Analysis**: Sentiment analysis, trend identification
- **Personalization**: Tailored product suggestions, custom messaging


## Troubleshooting

**Issue**: `ModuleNotFoundError: No module named 'langchain'`

- **Solution**: Make sure you've activated the virtual environment and installed dependencies:

  ```bash
  .venv-module02\Scripts\Activate.ps1
  pip install -r requirements.txt
  ```

**Issue**: `Authentication failed` or `Invalid API key`

- **Solution**: Verify your API key is correctly set in the environment variables or `.env` file

**Issue**: Inconsistent results with same prompt  

- **Solution**: Lower the temperature (try 0.0-0.3)

**Issue**: Outputs too similar/boring  

- **Solution**: Increase temperature or top_p

**Issue**: AI not following format  

- **Solution**: Add explicit formatting instructions and examples

**Issue**: API rate limits  

- **Solution**: Add delays between calls or upgrade API plan

## Additional Resources

### Prompt Engineering Guides
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [LangChain Prompting Guide](https://python.langchain.com/docs/modules/model_io/prompts/)
- [Prompt Engineering Best Practices](https://www.promptingguide.ai/)

### LangChain Documentation
- [Prompt Templates](https://python.langchain.com/docs/modules/model_io/prompts/prompt_templates/)
- [Few-Shot Prompting](https://python.langchain.com/docs/modules/model_io/prompts/few_shot_examples)
- [Chat Prompt Templates](https://python.langchain.com/docs/modules/model_io/prompts/chat_prompt_template/)

## Next Steps

After completing this module:
1. Experiment with your own datasets
2. Build a prompt library for common tasks
3. Combine techniques (e.g., few-shot + templates)
4. Explore advanced LangChain features (chains, agents)
5. Move on to Module 03 (if available)

## Troubleshooting

**Issue**: Inconsistent results with same prompt  
**Solution**: Lower the temperature (try 0.0-0.3)

**Issue**: Outputs too similar/boring  
**Solution**: Increase temperature or top_p

**Issue**: AI not following format  
**Solution**: Add explicit formatting instructions and examples

**Issue**: API rate limits  
**Solution**: Add delays between calls or upgrade API plan

## Support

If you encounter issues:
1. Check that your API key is set correctly
2. Verify all dependencies are installed
3. Review the solution files for reference
4. Consult the LangChain/OpenAI documentation

---

**Happy Learning! 🚀**

Remember: Great prompts are iterative. Don't expect perfection on the first try—experiment, refine, and learn from the results!
