/**
 * Last-Mile Delivery Optimizer with LangGraph - SOLUTION
 * 
 * This solution demonstrates a sophisticated real-world application using LangGraph
 * for delivery optimization with:
 * 1. Multiple specialized data sources and tools
 * 2. Complex decision-making workflows
 * 3. Priority assessment and route optimization
 * 4. Customer communication generation
 * 5. Multi-agent coordination patterns
 */

import { config } from 'dotenv';
import { AzureOpenAIEmbeddings, AzureChatOpenAI } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { 
    MessagesAnnotation, 
    StateGraph, 
    START, 
    END 
} from '@langchain/langgraph';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import { MemorySaver } from '@langchain/langgraph';
import { v4 as uuidv4 } from 'uuid';

// Load environment variables
config();

console.log('\\n' + '='.repeat(80));
console.log('Last-Mile Delivery Optimizer with LangGraph - SOLUTION');
console.log('='.repeat(80) + '\\n');

async function main() {
    // ========================================================================
    // Step 1: Environment Setup
    // ========================================================================
    console.log('Step 1: Verifying API credentials...');
    
    if (!process.env.AZURE_OPENAI_API_KEY) {
        throw new Error('AZURE_OPENAI_API_KEY environment variable is not set');
    }
    
    console.log('✓ API key loaded\\n');
    
    // ========================================================================
    // Step 2: Initialize Models
    // ========================================================================
    console.log('Step 2: Initializing Azure OpenAI models...');
    
    const embeddings = new AzureOpenAIEmbeddings({
        azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
        azureOpenAIApiInstanceName: 'aoi-ext-eus-aiml-profx-01',
        azureOpenAIApiDeploymentName: 'text-embedding-ada-002',
        azureOpenAIApiVersion: '2024-12-01-preview',
    });
    
    const llm = new AzureChatOpenAI({
        azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
        azureOpenAIApiInstanceName: 'aoi-ext-eus-aiml-profx-01',
        azureOpenAIApiDeploymentName: 'gpt-4o',
        azureOpenAIApiVersion: '2024-12-01-preview',
    });
    
    console.log('✓ Models initialized\\n');
    
    // ========================================================================
    // Step 3: Create Mock Delivery Data
    // ========================================================================
    console.log('Step 3: Creating realistic delivery data...');
    
    const deliveryData = [
        {
            type: 'delivery_schedule',
            content: `DELIVERY SCHEDULE - Route 101
Date: 2024-10-09
Driver: Sarah Johnson
Vehicle: Van-001
Capacity: 50 packages

Delivery Windows:
- Stop 1: 123 Main St, Seattle, WA - 9:00-10:00 AM - Priority: High - Package Value: $250
- Stop 2: 456 Oak Ave, Seattle, WA - 10:30-11:30 AM - Priority: Medium - Package Value: $75
- Stop 3: 789 Pine Rd, Seattle, WA - 1:00-2:00 PM - Priority: High - Package Value: $400
- Stop 4: 321 Elm St, Seattle, WA - 2:30-3:30 PM - Priority: Low - Package Value: $25
- Stop 5: 654 Cedar Blvd, Seattle, WA - 4:00-5:00 PM - Priority: High - Package Value: $180

Current Status: In Progress (Stop 2 completed, Stop 3 delayed due to traffic)
Estimated Completion: 5:45 PM (45 minutes behind schedule)`,
            metadata: { route: '101', driver: 'Sarah Johnson', date: '2024-10-09' }
        },
        {
            type: 'traffic_data',
            content: `TRAFFIC CONDITIONS - Seattle Metropolitan Area
Timestamp: 2024-10-09 2:15 PM

Current Incidents:
- I-5 Southbound: Accident at Mile 165, 25-minute delay, 2 lanes blocked
- Highway 99: Road construction from Pine St to Oak Ave, 15-minute delay
- Downtown Seattle: Heavy traffic due to sporting event, avoid 1st Ave area

Recommended Reroutes:
- To reach Pine Rd area: Use I-405 instead of I-5, saves 20 minutes
- Downtown deliveries: Use Alaskan Way bypass, saves 15 minutes
- Evening rush hour (4-6 PM): Expect 30% longer travel times on all major routes

Weather Impact: Light rain, reduce speeds by 10%, allow 5 extra minutes per stop`,
            metadata: { location: 'Seattle', timestamp: '2024-10-09 14:15' }
        },
        {
            type: 'customer_feedback',
            content: `CUSTOMER FEEDBACK SUMMARY - Recent Deliveries

Positive Feedback:
- Customer at 456 Oak Ave (Route 101): "Driver was professional and on time. Package arrived in perfect condition."
- Customer at 222 5th Ave (Route 102): "Excellent service! Received SMS updates and driver called ahead."

Complaints and Issues:
- Customer at 789 Pine Rd (Route 101): "Package was supposed to arrive between 1-2 PM but came at 2:45 PM. No notification about delay."
- Customer at 123 Main St: "Driver left package at wrong door, had to search for it. Please improve delivery accuracy."

Special Requests:
- 654 Cedar Blvd: "Please call before delivery, recipient works from home but takes calls"
- 333 Park St: "Leave packages with building concierge if recipient not available"
- 555 Hill Dr: "Fragile items - customer reports previous damage, handle with extra care"

Delivery Preferences:
- High-value packages ($200+): Customers prefer signature confirmation and real-time tracking
- Evening deliveries (after 4 PM): 85% customer satisfaction vs 78% for morning deliveries`,
            metadata: { date_range: '2024-10-01 to 2024-10-09' }
        },
        {
            type: 'performance_data',
            content: `DELIVERY PERFORMANCE ANALYTICS - Last 30 Days

Route Efficiency:
- Route 101 (Seattle): Average delivery time 6.2 hours, 12% delays, 88% on-time rate
- Route 102 (Portland): Average delivery time 5.8 hours, 8% delays, 92% on-time rate

Common Delay Causes:
1. Traffic incidents (45% of delays): Average impact 25 minutes
2. Customer unavailable (30% of delays): Average impact 15 minutes
3. Package issues/wrong address (15% of delays): Average impact 35 minutes
4. Vehicle/mechanical problems (10% of delays): Average impact 90 minutes

Optimization Opportunities:
- Morning start times: Starting 30 minutes earlier reduces day-end delays by 60%
- High-value deliveries: Prioritizing these reduces customer complaints by 40%
- Weather contingency: Having backup routes ready reduces weather delays by 50%
- Customer communication: Proactive SMS updates increase satisfaction by 25%

Peak Performance Windows:
- Best delivery success rate: 10 AM - 2 PM (95% success)
- Most challenging: 4 PM - 6 PM (78% success due to traffic and customer unavailability)`,
            metadata: { period: '2024-09-09 to 2024-10-09' }
        }
    ];
    
    console.log(`✓ Created ${deliveryData.length} delivery data sources\\n`);
    
    // ========================================================================
    // Step 4: Setup Vector Store and Index Data
    // ========================================================================
    console.log('Step 4: Setting up vector store and indexing data...');
    
    const vectorStore = new MemoryVectorStore(embeddings);
    
    // Convert data to documents and add to vector store
    const documents = deliveryData.map(item => ({
        pageContent: item.content,
        metadata: { type: item.type, ...item.metadata }
    }));
    
    await vectorStore.addDocuments(documents);
    
    console.log('✓ Delivery data indexed in vector store\\n');
    
    // ========================================================================
    // Step 5: Create Specialized Delivery Tools
    // ========================================================================
    console.log('Step 5: Creating specialized delivery tools...');
    
    const getDeliverySchedules = new DynamicStructuredTool({
        name: 'get_delivery_schedules',
        description: 'Retrieve current delivery schedules, route status, and driver assignments.',
        schema: z.object({
            query: z.string().describe('Search query for delivery schedules (e.g., route number, driver name, location)'),
        }),
        func: async ({ query }) => {
            const results = await vectorStore.similaritySearch(`delivery schedule route ${query}`, 3);
            const scheduleResults = results.filter(doc => doc.metadata?.type === 'delivery_schedule');
            
            if (scheduleResults.length === 0) {
                return 'No delivery schedules found for the query.';
            }
            
            let formatted = 'CURRENT DELIVERY SCHEDULES:\\n\\n';
            scheduleResults.forEach((doc, index) => {
                formatted += `Schedule ${index + 1}:\\n${doc.pageContent}\\n${'='.repeat(50)}\\n\\n`;
            });
            
            return formatted;
        },
    });
    
    const getTrafficInfo = new DynamicStructuredTool({
        name: 'get_traffic_info',
        description: 'Retrieve real-time traffic conditions, incidents, and route recommendations.',
        schema: z.object({
            query: z.string().describe('Search query for traffic information (e.g., location, route, incident type)'),
        }),
        func: async ({ query }) => {
            const results = await vectorStore.similaritySearch(`traffic conditions incidents ${query}`, 2);
            const trafficResults = results.filter(doc => doc.metadata?.type === 'traffic_data');
            
            if (trafficResults.length === 0) {
                return 'No traffic information found for the query.';
            }
            
            let formatted = 'CURRENT TRAFFIC CONDITIONS:\\n\\n';
            trafficResults.forEach((doc, index) => {
                formatted += `Traffic Report ${index + 1}:\\n${doc.pageContent}\\n${'='.repeat(50)}\\n\\n`;
            });
            
            return formatted;
        },
    });
    
    const getCustomerFeedback = new DynamicStructuredTool({
        name: 'get_customer_feedback',
        description: 'Retrieve customer feedback, complaints, special requests, and delivery preferences.',
        schema: z.object({
            query: z.string().describe('Search query for customer feedback (e.g., address, complaint type, preference)'),
        }),
        func: async ({ query }) => {
            const results = await vectorStore.similaritySearch(`customer feedback complaints preferences ${query}`, 2);
            const feedbackResults = results.filter(doc => doc.metadata?.type === 'customer_feedback');
            
            if (feedbackResults.length === 0) {
                return 'No customer feedback found for the query.';
            }
            
            let formatted = 'CUSTOMER FEEDBACK & PREFERENCES:\\n\\n';
            feedbackResults.forEach((doc, index) => {
                formatted += `Feedback Report ${index + 1}:\\n${doc.pageContent}\\n${'='.repeat(50)}\\n\\n`;
            });
            
            return formatted;
        },
    });
    
    const getPerformanceData = new DynamicStructuredTool({
        name: 'get_performance_data',
        description: 'Retrieve historical delivery performance, analytics, and optimization opportunities.',
        schema: z.object({
            query: z.string().describe('Search query for performance data (e.g., route efficiency, delay analysis, optimization)'),
        }),
        func: async ({ query }) => {
            const results = await vectorStore.similaritySearch(`performance analytics optimization ${query}`, 2);
            const performanceResults = results.filter(doc => doc.metadata?.type === 'performance_data');
            
            if (performanceResults.length === 0) {
                return 'No performance data found for the query.';
            }
            
            let formatted = 'DELIVERY PERFORMANCE ANALYTICS:\\n\\n';
            performanceResults.forEach((doc, index) => {
                formatted += `Performance Report ${index + 1}:\\n${doc.pageContent}\\n${'='.repeat(50)}\\n\\n`;
            });
            
            return formatted;
        },
    });
    
    const deliveryTools = [getDeliverySchedules, getTrafficInfo, getCustomerFeedback, getPerformanceData];
    
    console.log(`✓ Created ${deliveryTools.length} specialized delivery tools\\n`);
    
    // ========================================================================
    // Step 6: Build Delivery Optimization Workflow
    // ========================================================================
    console.log('Step 6: Building delivery optimization workflow...');
    
    const GraphAnnotation = MessagesAnnotation;
    const toolNode = new ToolNode(deliveryTools);
    
    // Agent node that analyzes delivery situations
    function deliveryAgent(state) {
        const systemPrompt = `You are an expert Last-Mile Delivery Optimizer.

Your role is to:
1. Analyze delivery situations (delays, route issues, customer complaints)
2. Gather relevant information using available tools:
   - get_delivery_schedules: Current routes and driver assignments
   - get_traffic_info: Traffic conditions and route recommendations
   - get_customer_feedback: Customer preferences and complaints
   - get_performance_data: Historical insights and optimization opportunities

3. Provide specific, actionable recommendations for:
   - Route optimization and timing adjustments
   - Priority assessment for high-value or delayed deliveries
   - Customer communication strategies
   - Performance improvements

Always be strategic about which tools to use and provide concrete, actionable advice.`;
        
        const llmWithTools = llm.bindTools(deliveryTools);
        const messages = [
            { role: 'system', content: systemPrompt },
            ...state.messages
        ];
        
        const response = llmWithTools.invoke(messages);
        return { messages: [response] };
    }
    
    // Optimization planning node
    function generateOptimizationPlan(state) {
        const systemPrompt = `Based on the gathered delivery data, provide a comprehensive optimization plan with:

1. **SITUATION ANALYSIS**: Summarize current delivery status and issues
2. **PRIORITY ASSESSMENT**: Identify high-value or time-sensitive deliveries
3. **ROUTE OPTIMIZATION**: Suggest specific route changes and timing adjustments
4. **CUSTOMER COMMUNICATION**: Draft proactive messages for customers
5. **PERFORMANCE RECOMMENDATIONS**: Suggest improvements based on data

Be specific and actionable in your recommendations.`;
        
        const messages = [
            { role: 'system', content: systemPrompt },
            ...state.messages
        ];
        
        const response = llm.invoke(messages);
        return { messages: [response] };
    }
    
    // Routing logic
    function shouldContinue(state) {
        const lastMessage = state.messages[state.messages.length - 1];
        
        // If the LLM makes a tool call, continue to tools
        if (lastMessage._getType() === 'ai' && lastMessage.tool_calls?.length > 0) {
            return 'tools';
        }
        
        // Check if we have tool results and need optimization planning
        const hasToolResults = state.messages.some(msg => msg._getType() === 'tool');
        const hasOptimizationPlan = state.messages.some(msg => 
            msg.content && msg.content.includes('SITUATION ANALYSIS')
        );
        
        if (hasToolResults && !hasOptimizationPlan) {
            return 'optimize';
        }
        
        return END;
    }
    
    // Build the workflow
    const deliveryWorkflow = new StateGraph(GraphAnnotation)
        .addNode('agent', deliveryAgent)
        .addNode('tools', toolNode)
        .addNode('optimize', generateOptimizationPlan)
        .addEdge(START, 'agent')
        .addConditionalEdges('agent', shouldContinue)
        .addEdge('tools', 'agent')
        .addEdge('optimize', END);
    
    const memory = new MemorySaver();
    const deliveryApp = deliveryWorkflow.compile({ checkpointer: memory });
    
    console.log('✓ Delivery optimization workflow compiled\\n');
    
    // ========================================================================
    // Step 7: Test Delivery Scenarios
    // ========================================================================
    console.log('Step 7: Testing delivery optimization scenarios...\\n');
    
    const scenarios = [
        {
            title: 'Route Delay Scenario',
            query: 'Route 101 is experiencing delays. Sarah Johnson needs help optimizing the remaining deliveries. What should we do?'
        },
        {
            title: 'High-Value Package Priority',
            query: 'We have several high-value packages on Route 101. How should we prioritize them and ensure customer satisfaction?'
        },
        {
            title: 'Traffic Incident Response',
            query: 'There is a major traffic incident affecting Seattle routes. What immediate actions should we take?'
        }
    ];
    
    for (let i = 0; i < scenarios.length; i++) {
        const scenario = scenarios[i];
        console.log(`🚚 Scenario ${i + 1}: ${scenario.title}`);
        console.log(`📝 Query: ${scenario.query}\\n`);
        
        const conversationId = uuidv4();
        const config = { configurable: { thread_id: conversationId } };
        
        try {
            const finalState = await deliveryApp.invoke(
                { messages: [{ role: 'user', content: scenario.query }] },
                config
            );
            
            const lastMessage = finalState.messages[finalState.messages.length - 1];
            console.log('🤖 Optimization Recommendation:');
            console.log(lastMessage.content);
            console.log('\\n' + '='.repeat(80) + '\\n');
            
        } catch (error) {
            console.log(`❌ Error in scenario ${i + 1}:`, error.message);
            console.log('\\n' + '='.repeat(80) + '\\n');
        }
        
        // Small delay between scenarios
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // ========================================================================
    // Step 8: Interactive Mode Demo
    // ========================================================================
    console.log('Step 8: Interactive delivery optimization session...\\n');
    
    const interactiveQuery = 'I need a complete analysis of Route 101 performance today, including any recommendations for improvement.';
    console.log(`📋 Complex Analysis Request: ${interactiveQuery}\\n`);
    
    const interactiveId = uuidv4();
    const interactiveConfig = { configurable: { thread_id: interactiveId } };
    
    try {
        const interactiveState = await deliveryApp.invoke(
            { messages: [{ role: 'user', content: interactiveQuery }] },
            interactiveConfig
        );
        
        const interactiveResponse = interactiveState.messages[interactiveState.messages.length - 1];
        console.log('🤖 Comprehensive Analysis:');
        console.log(interactiveResponse.content);
        
    } catch (error) {
        console.log('❌ Error in interactive session:', error.message);
    }
    
    console.log('\\n' + '='.repeat(80) + '\\n');
    
    // ========================================================================
    // Summary
    // ========================================================================
    console.log('🎉 Last-Mile Delivery Optimizer Complete!\\n');
    console.log('What we accomplished:');
    console.log('✓ Built a sophisticated delivery optimization system');
    console.log('✓ Created specialized tools for different data sources');
    console.log('✓ Implemented complex multi-step workflows');
    console.log('✓ Added intelligent routing and decision-making');
    console.log('✓ Demonstrated real-world AI application patterns');
    console.log('\\nKey LangGraph Features Demonstrated:');
    console.log('• Multi-tool coordination for complex data analysis');
    console.log('• Conditional workflow routing based on context');
    console.log('• State management for multi-step optimization');
    console.log('• Memory persistence for ongoing conversations');
    console.log('• Agentic behavior for autonomous decision-making');
}

// Run the main function
main().catch(console.error);