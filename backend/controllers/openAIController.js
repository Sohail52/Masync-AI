const asyncHandler = require('express-async-handler');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ContentHistory = require('../models/ContentHistory');
const User = require('../models/User');

// Access the API key from environment variable
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
 console.error("GEMINI_API_KEY is not set in your environment variables.");
 process.exit(1); // Exit if the API key is missing
}


// Initialize the Gemini model
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


// formatContent function to format the generated content-
const formatContent = (content) => {
  // Split content into paragraphs
  const paragraphs = content.split('\n\n');

  // Add Markdown formatting
  const formattedContent = paragraphs.map(paragraph => {
    // Check for headings
    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
      return `## ${paragraph.slice(2, -2)}`;
    }

    // Check for lists
    if (paragraph.startsWith('* ')) {
      const listItems = paragraph.split('\n').map(item => `- ${item.slice(2)}`).join('\n');
      return listItems;
    }

    // Return paragraph
    return paragraph;
  }).join('\n\n');

  return formattedContent;
};


const openAIController = asyncHandler(async (req, res) => {
  const { prompt } = req.body; // Retrieve prompt from request body

  if (!prompt) {
    return res.status(400).json({ success: false, message: 'Prompt is required' });
  }

  try {
    // Make API call to Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text()

    // Log the response from Gemini
    console.log('Gemini API Response:', content);


    // Format the content
    const formattedContent = formatContent(content);

    // Create new content history record in the database
    const newContent = new ContentHistory({
      user: req.user._id, // Assuming user is authenticated and their ID is in req.user
      content: formattedContent, // The formatted content
    });

    // Save the content history to the database
    await newContent.save();

    // Optionally, push the new content to the user's content history
    const user = await User.findById(req.user._id);
    user.contentHistory.push(newContent._id); // Add the new content to the user's history
    await user.save();

    // Increment and save the api request count
    user.apiRequestCount += 1
    await user.save()
    console.log(`User ${user.username} has used ${user.apiRequestCount} credits`)


    // Send the generated content back to the frontend
    res.status(200).json({ success: true, content: formattedContent });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ success: false, message: 'Failed to generate content', error: error.message });
  }
});

module.exports = { openAIController };
