"""
HTTP-based MCP Server for Separate Hosting

This demonstrates how to host an MCP server as a standalone HTTP service
that can be deployed independently and accessed via REST API.

This approach shows:
- How to wrap MCP server functionality in HTTP endpoints
- Independent deployment capabilities
- Cross-platform compatibility
- Easy integration with web applications

The server provides:
1. Mathematical operations (statistics, quadratic equations, advanced math)
2. Text processing (analysis, transformations, information extraction)
3. RESTful API endpoints with FastAPI
4. Automatic API documentation
5. Health monitoring endpoints
"""

# Import necessary libraries for the HTTP server
from fastapi import FastAPI, HTTPException  # FastAPI framework for building REST APIs
from pydantic import BaseModel  # Data validation and serialization using Python type annotations
import asyncio  # Asynchronous I/O support (for future async operations)
import json  # JSON encoding and decoding
import math  # Mathematical functions
import statistics  # Statistical functions
from typing import Any, Dict, List, Optional, Union  # Type hints for better code documentation
from datetime import datetime  # Date and time utilities
import re  # Regular expressions for pattern matching
import uvicorn  # ASGI server for running FastAPI applications

# Create FastAPI application instance with metadata
app = FastAPI(
    title="MCP Math-Text-Analysis HTTP Server",  # API title shown in documentation
    description="HTTP wrapper for MCP server functionality",  # API description
    version="1.0.0"  # API version for versioning and compatibility tracking
)

# Pydantic models for request/response validation and documentation
# These models automatically validate incoming data and generate OpenAPI schemas

class MathRequest(BaseModel):
    """Request model for mathematical operations.
    
    Attributes:
        operation: Type of math operation to perform (statistics, quadratic, etc.)
        values: List of numeric values for calculations
        a, b, c: Coefficients for quadratic equations (ax² + bx + c = 0)
    """
    operation: str  # The mathematical operation to perform
    values: List[float]  # Input values for calculations
    a: Optional[float] = None  # Quadratic coefficient 'a'
    b: Optional[float] = None  # Quadratic coefficient 'b'
    c: Optional[float] = None  # Quadratic coefficient 'c'

class TextRequest(BaseModel):
    """Request model for text processing operations.
    
    Attributes:
        text: The input text to process
        operation: Type of text operation (analyze, transform, extract)
        extraction_type: Specific type for transform/extract operations
    """
    text: str  # Input text to be processed
    operation: str  # Type of text operation to perform
    extraction_type: Optional[str] = None  # Specific transformation or extraction type

class MathResponse(BaseModel):
    """Response model for mathematical operations.
    
    Attributes:
        result: The calculated result (can be various types depending on operation)
        operation: Echo of the operation that was performed
        success: Boolean indicating if operation completed successfully
        message: Optional error or informational message
    """
    result: Union[float, List[float], str, Dict[str, Any]]  # Flexible result type
    operation: str  # Echo of the requested operation
    success: bool  # Success indicator
    message: Optional[str] = None  # Optional message for additional info

class TextResponse(BaseModel):
    """Response model for text processing operations.
    
    Attributes:
        result: The processed text result
        operation: Echo of the operation that was performed
        success: Boolean indicating if operation completed successfully
        message: Optional error or informational message
    """
    result: str  # Text processing result
    operation: str  # Echo of the requested operation
    success: bool  # Success indicator
    message: Optional[str] = None  # Optional message for additional info

# Mathematical operation functions
# These functions implement the core mathematical capabilities of the MCP server

def calculate_statistics(values: List[float]) -> Dict[str, float]:
    """Calculate comprehensive statistics for a dataset.
    
    This function computes various statistical measures including:
    - Central tendency (mean, median, mode)
    - Variability (standard deviation, variance, range)
    - Distribution properties (min, max, count, sum)
    
    Args:
        values: List of numeric values to analyze
        
    Returns:
        Dictionary containing all calculated statistics
        
    Raises:
        HTTPException: If calculation fails due to invalid input
    """
    try:
        # Calculate all statistical measures
        result = {
            "count": len(values),  # Number of data points
            "mean": statistics.mean(values),  # Arithmetic average
            "median": statistics.median(values),  # Middle value when sorted
            # Mode only exists if there are repeated values
            "mode": statistics.mode(values) if len(set(values)) < len(values) else None,
            # Standard deviation and variance require at least 2 values
            "std_dev": statistics.stdev(values) if len(values) > 1 else 0.0,
            "variance": statistics.variance(values) if len(values) > 1 else 0.0,
            "min": min(values),  # Minimum value
            "max": max(values),  # Maximum value
            "range": max(values) - min(values),  # Difference between max and min
            "sum": sum(values)  # Sum of all values
        }
        return result
    except Exception as e:
        # Convert any calculation error to HTTP exception
        raise HTTPException(status_code=400, detail=f"Error calculating statistics: {str(e)}")

def solve_quadratic(a: float, b: float, c: float) -> Dict[str, Any]:
    """Solve quadratic equation ax² + bx + c = 0.
    
    Uses the quadratic formula: x = (-b ± √(b²-4ac)) / 2a
    
    The discriminant (b²-4ac) determines the nature of roots:
    - Positive: Two distinct real roots
    - Zero: One repeated real root  
    - Negative: Two complex conjugate roots
    
    Args:
        a: Coefficient of x² (must not be zero)
        b: Coefficient of x
        c: Constant term
        
    Returns:
        Dictionary containing:
        - discriminant: The discriminant value
        - roots: List of root values (real numbers or complex strings)
        - root_type: Classification of root type
        
    Raises:
        HTTPException: If calculation fails or 'a' is zero
    """
    try:
        # Calculate the discriminant to determine root nature
        discriminant = b**2 - 4*a*c
        
        if discriminant > 0:
            # Two distinct real roots
            x1 = (-b + math.sqrt(discriminant)) / (2*a)
            x2 = (-b - math.sqrt(discriminant)) / (2*a)
            return {
                "discriminant": discriminant,
                "roots": [x1, x2],
                "root_type": "real_distinct"
            }
        elif discriminant == 0:
            # One repeated real root
            x = -b / (2*a)
            return {
                "discriminant": discriminant,
                "roots": [x],
                "root_type": "real_repeated"
            }
        else:
            # Two complex conjugate roots
            real_part = -b / (2*a)  # Real component
            imaginary_part = math.sqrt(-discriminant) / (2*a)  # Imaginary component
            return {
                "discriminant": discriminant,
                "roots": [
                    f"{real_part} + {imaginary_part}i",  # Root 1: a + bi
                    f"{real_part} - {imaginary_part}i"   # Root 2: a - bi
                ],
                "root_type": "complex"
            }
    except Exception as e:
        # Handle division by zero (a=0) and other mathematical errors
        raise HTTPException(status_code=400, detail=f"Error solving quadratic: {str(e)}")

def advanced_math_operations(operation: str, values: List[float], **kwargs) -> Union[float, Dict]:
    """Perform various advanced mathematical operations.
    
    Supports multiple mathematical functions:
    - factorial: Calculate n! for non-negative integers
    - logarithm: Natural log or log with custom base
    - trigonometry: Sin, cos, tan for angles in radians
    - power: Calculate base^exponent
    
    Args:
        operation: The type of mathematical operation to perform
        values: Input values for the calculation
        **kwargs: Additional keyword arguments (unused but allows flexibility)
        
    Returns:
        Either a single float result or a dictionary with multiple results
        
    Raises:
        HTTPException: If operation is invalid or calculation fails
    """
    try:
        if operation == "factorial":
            # Factorial requires exactly one non-negative integer
            if len(values) != 1 or values[0] < 0 or values[0] != int(values[0]):
                raise ValueError("Factorial requires a single non-negative integer")
            return math.factorial(int(values[0]))
        
        elif operation == "logarithm":
            # Support both natural log and custom base logarithm
            if len(values) == 1:
                # Natural logarithm (base e)
                return math.log(values[0])
            elif len(values) == 2:
                # Logarithm with custom base: log_base(value)
                return math.log(values[0], values[1])
            else:
                raise ValueError("Logarithm requires 1 or 2 values")
        
        elif operation == "trigonometry":
            # Calculate all basic trigonometric functions
            if len(values) != 1:
                raise ValueError("Trigonometry requires 1 value (angle in radians)")
            angle = values[0]
            return {
                "sin": math.sin(angle),  # Sine function
                "cos": math.cos(angle),  # Cosine function
                "tan": math.tan(angle),  # Tangent function
                "angle_radians": angle,  # Input angle in radians
                "angle_degrees": math.degrees(angle)  # Converted to degrees for reference
            }
        
        elif operation == "power":
            # Calculate base raised to the power of exponent
            if len(values) != 2:
                raise ValueError("Power operation requires base and exponent")
            return math.pow(values[0], values[1])  # base^exponent
        
        else:
            # Unknown operation requested
            raise ValueError(f"Unknown operation: {operation}")
    
    except Exception as e:
        # Convert any calculation error to HTTP exception
        raise HTTPException(status_code=400, detail=f"Error in math operation: {str(e)}")

# Text processing functions
# These functions provide comprehensive text analysis and manipulation capabilities

def analyze_text(text: str) -> Dict[str, Any]:
    """Comprehensive text analysis providing detailed metrics and insights.
    
    Analyzes various aspects of the input text:
    - Word and sentence counting
    - Character analysis (letters, digits, special chars)
    - Average word and sentence lengths
    - Identification of longest/shortest words
    
    Args:
        text: The input text to analyze
        
    Returns:
        Dictionary containing comprehensive text analysis metrics
        
    Raises:
        HTTPException: If analysis fails due to processing errors
    """
    try:
        # Basic text segmentation
        words = text.split()  # Split on whitespace to get words
        sentences = text.split('.')  # Split on periods to estimate sentences
        sentences = [s.strip() for s in sentences if s.strip()]  # Remove empty sentences
        
        # Character-level analysis
        char_counts = {
            'total_chars': len(text),  # Total character count including spaces
            'chars_no_spaces': len(text.replace(' ', '')),  # Characters excluding spaces
            'uppercase': sum(1 for c in text if c.isupper()),  # Count uppercase letters
            'lowercase': sum(1 for c in text if c.islower()),  # Count lowercase letters
            'digits': sum(1 for c in text if c.isdigit()),  # Count numeric digits
            # Count special characters (not alphanumeric or whitespace)
            'special_chars': sum(1 for c in text if not c.isalnum() and not c.isspace())
        }
        
        # Word length analysis (remove common punctuation for accurate length)
        word_lengths = [len(word.strip('.,!?;:"()[]{}')) for word in words]
        avg_word_length = sum(word_lengths) / len(word_lengths) if word_lengths else 0
        
        # Compile comprehensive analysis results
        return {
            'word_count': len(words),  # Total number of words
            'sentence_count': len(sentences),  # Estimated sentence count
            'paragraph_count': len(text.split('\n\n')),  # Count paragraphs (double newlines)
            'avg_word_length': round(avg_word_length, 2),  # Average characters per word
            # Average words per sentence
            'avg_sentence_length': round(len(words) / len(sentences), 2) if sentences else 0,
            'character_analysis': char_counts,  # Detailed character breakdown
            'longest_word': max(words, key=len) if words else "",  # Longest word found
            'shortest_word': min(words, key=len) if words else ""  # Shortest word found
        }
    except Exception as e:
        # Convert any analysis error to HTTP exception
        raise HTTPException(status_code=400, detail=f"Error analyzing text: {str(e)}")

def transform_text(text: str, transformation: str) -> str:
    """Transform text using various methods and algorithms.
    
    Supports multiple text transformation operations:
    - upper: Convert to uppercase
    - lower: Convert to lowercase  
    - title: Convert to title case
    - reverse: Reverse character order
    - pig_latin: Convert to Pig Latin using linguistic rules
    
    Args:
        text: The input text to transform
        transformation: The type of transformation to apply
        
    Returns:
        The transformed text string
        
    Raises:
        HTTPException: If transformation type is invalid or processing fails
    """
    try:
        if transformation == "upper":
            # Convert all characters to uppercase
            return text.upper()
        elif transformation == "lower":
            # Convert all characters to lowercase
            return text.lower()
        elif transformation == "title":
            # Convert to title case (first letter of each word capitalized)
            return text.title()
        elif transformation == "reverse":
            # Reverse the entire string character by character
            return text[::-1]
        elif transformation == "pig_latin":
            # Convert to Pig Latin using traditional rules
            words = text.split()  # Split into individual words
            pig_latin_words = []
            
            for word in words:
                # Preserve punctuation by separating it from the word
                punctuation = ""
                clean_word = word
                if word and word[-1] in ".,!?;:":
                    punctuation = word[-1]  # Extract punctuation
                    clean_word = word[:-1]  # Remove punctuation from word
                
                if clean_word:
                    # Apply Pig Latin rules
                    if clean_word[0].lower() in 'aeiou':
                        # Words starting with vowels: add "way"
                        pig_word = clean_word + "way"
                    else:
                        # Words starting with consonants: move consonant cluster to end + "ay"
                        # Find the first vowel position
                        first_vowel = 0
                        for i, char in enumerate(clean_word.lower()):
                            if char in 'aeiou':
                                first_vowel = i
                                break
                        else:
                            # No vowel found, treat entire word as consonant cluster
                            first_vowel = len(clean_word)
                        
                        # Move consonant cluster to end and add "ay"
                        pig_word = clean_word[first_vowel:] + clean_word[:first_vowel] + "ay"
                    
                    # Reattach punctuation
                    pig_latin_words.append(pig_word + punctuation)
                else:
                    # Empty word, keep as is
                    pig_latin_words.append(word)
            
            # Rejoin words with spaces
            return " ".join(pig_latin_words)
        else:
            # Unknown transformation requested
            raise ValueError(f"Unknown transformation: {transformation}")
    except Exception as e:
        # Convert any transformation error to HTTP exception
        raise HTTPException(status_code=400, detail=f"Error transforming text: {str(e)}")

def extract_information(text: str, extraction_type: str) -> List[str]:
    """Extract specific types of information from text using regex patterns.
    
    Uses predefined regular expression patterns to identify and extract:
    - emails: Valid email addresses
    - urls: HTTP/HTTPS URLs  
    - phone_numbers: US phone number formats
    - dates: Common date formats (MM/DD/YYYY, YYYY-MM-DD, etc.)
    - numbers: Integer and decimal numbers
    
    Args:
        text: The input text to search for patterns
        extraction_type: The type of information to extract
        
    Returns:
        List of strings containing all matches found
        
    Raises:
        HTTPException: If extraction type is invalid or processing fails
    """
    try:
        # Regular expression patterns for different information types
        patterns = {
            # Email pattern: matches standard email format (user@domain.tld)
            "emails": r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',
            
            # URL pattern: matches HTTP and HTTPS URLs
            "urls": r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+',
            
            # US phone number pattern: matches various formats like (555) 123-4567, 555-123-4567, etc.
            "phone_numbers": r'\b(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})\b',
            
            # Date pattern: matches MM/DD/YYYY, DD-MM-YYYY, YYYY/MM/DD formats
            "dates": r'\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}[/-]\d{1,2}[/-]\d{1,2})\b',
            
            # Number pattern: matches integers and decimal numbers
            "numbers": r'\b\d+(?:\.\d+)?\b'
        }
        
        # Validate that the requested extraction type exists
        if extraction_type not in patterns:
            available_types = ', '.join(patterns.keys())
            raise ValueError(f"Unknown extraction type '{extraction_type}'. Available: {available_types}")
        
        # Find all matches using the appropriate regex pattern
        matches = re.findall(patterns[extraction_type], text)
        
        # Special handling for phone numbers (regex returns tuples for grouped captures)
        if extraction_type == "phone_numbers":
            # Phone number regex uses capture groups, so format the tuples into readable strings
            formatted_matches = [f"({match[0]}) {match[1]}-{match[2]}" for match in matches]
            return formatted_matches
        else:
            # Other patterns return simple string matches
            return matches
    except Exception as e:
        # Convert any extraction error to HTTP exception
        raise HTTPException(status_code=400, detail=f"Error extracting information: {str(e)}")

# HTTP API Endpoints
# These endpoints expose the MCP server functionality via REST API

@app.get("/")
async def root():
    """Root endpoint providing server information and available endpoints.
    
    Returns basic information about the server and lists all available
    endpoints for API discovery and documentation purposes.
    
    Returns:
        Dictionary with server metadata and endpoint information
    """
    return {
        "name": "MCP Math-Text-Analysis HTTP Server",
        "version": "1.0.0",
        "description": "HTTP wrapper for MCP server functionality",
        "endpoints": {
            "math": "/math",  # Mathematical operations endpoint
            "text": "/text",  # Text processing operations endpoint
            "health": "/health"  # Health check endpoint
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring server status.
    
    Provides a simple way to verify that the server is running
    and responsive. Useful for load balancers and monitoring systems.
    
    Returns:
        Dictionary with health status and current timestamp
    """
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/math", response_model=MathResponse)
async def math_operations(request: MathRequest):
    """Perform mathematical operations via HTTP POST requests.
    
    Handles various mathematical operations including:
    - statistics: Calculate comprehensive statistics for a dataset
    - quadratic: Solve quadratic equations (requires a, b, c coefficients)
    - factorial: Calculate factorial of a non-negative integer
    - logarithm: Calculate natural log or log with custom base
    - trigonometry: Calculate sin, cos, tan for angles in radians
    - power: Calculate base raised to exponent
    
    Args:
        request: MathRequest containing operation type and required parameters
        
    Returns:
        MathResponse with calculation results and operation metadata
        
    Raises:
        HTTPException: If operation is invalid or calculation fails
    """
    try:
        if request.operation == "statistics":
            # Calculate comprehensive statistics for the provided values
            result = calculate_statistics(request.values)
            return MathResponse(result=result, operation=request.operation, success=True)
        
        elif request.operation == "quadratic":
            # Solve quadratic equation - requires all three coefficients
            if request.a is None or request.b is None or request.c is None:
                raise HTTPException(status_code=400, detail="Quadratic equation requires a, b, c coefficients")
            result = solve_quadratic(request.a, request.b, request.c)
            return MathResponse(result=result, operation=request.operation, success=True)
        
        elif request.operation in ["factorial", "logarithm", "trigonometry", "power"]:
            # Handle advanced mathematical operations
            result = advanced_math_operations(request.operation, request.values)
            return MathResponse(result=result, operation=request.operation, success=True)
        
        else:
            # Unknown mathematical operation requested
            raise HTTPException(status_code=400, detail=f"Unknown math operation: {request.operation}")
    
    except HTTPException:
        # Re-raise HTTP exceptions (already properly formatted)
        raise
    except Exception as e:
        # Convert unexpected errors to HTTP exceptions
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")

@app.post("/text", response_model=TextResponse)
async def text_operations(request: TextRequest):
    """Perform text processing operations via HTTP POST requests.
    
    Handles various text processing operations including:
    - analyze: Comprehensive text analysis with metrics and statistics
    - transform: Text transformations (upper, lower, title, reverse, pig_latin)
    - extract: Information extraction (emails, urls, phone_numbers, dates, numbers)
    
    Args:
        request: TextRequest containing text, operation type, and optional parameters
        
    Returns:
        TextResponse with processing results and operation metadata
        
    Raises:
        HTTPException: If operation is invalid or processing fails
    """
    try:
        if request.operation == "analyze":
            # Perform comprehensive text analysis
            result = analyze_text(request.text)
            # Convert result to JSON string for consistent response format
            return TextResponse(result=json.dumps(result, indent=2), operation=request.operation, success=True)
        
        elif request.operation == "transform":
            # Transform text using specified transformation type
            if not request.extraction_type:
                raise HTTPException(status_code=400, detail="Transform operation requires transformation type")
            result = transform_text(request.text, request.extraction_type)
            return TextResponse(result=result, operation=request.operation, success=True)
        
        elif request.operation == "extract":
            # Extract specific information patterns from text
            if not request.extraction_type:
                raise HTTPException(status_code=400, detail="Extract operation requires extraction type")
            result = extract_information(request.text, request.extraction_type)
            # Convert list result to JSON string for consistent response format
            return TextResponse(result=json.dumps(result, indent=2), operation=request.operation, success=True)
        
        else:
            # Unknown text processing operation requested
            raise HTTPException(status_code=400, detail=f"Unknown text operation: {request.operation}")
    
    except HTTPException:
        # Re-raise HTTP exceptions (already properly formatted)
        raise
    except Exception as e:
        # Convert unexpected errors to HTTP exceptions
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")

# Application entry point and server startup
if __name__ == "__main__":
    # Print startup information to console
    print("🌐 Starting MCP HTTP Server...")
    print("📡 Server will be available at: http://localhost:8000")
    print("📖 API documentation at: http://localhost:8000/docs")  # FastAPI auto-generated docs
    print("🔍 Health check at: http://localhost:8000/health")
    
    # Start the FastAPI application using Uvicorn ASGI server
    # host="0.0.0.0" allows connections from any IP (useful for containerization)
    # port=8000 is the default port for the HTTP server
    # log_level="info" provides detailed logging for debugging and monitoring
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")