const asyncHandler = require('express-async-handler');
const axios = require('axios');
const ContentHistory = require('../models/ContentHistory');
const User = require('../models/User');

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
    // Make API call to AWS
    const response = await axios.post(
      'https://xj3bngqne0.execute-api.ap-south-1.amazonaws.com/default/helloBedrock',
      { prompt }, // Send the prompt in the request body
      {
        headers: {
          'Content-Type': 'application/json', // Make sure the correct content type is used
        },
      }
    );

    // Log the response from AWS API
    console.log('AWS API Response:', response.data);

    // Extract generated content from the AWS API response
    const content = response?.data?.generatedText || 'No content generated';

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

    // Send the generated content back to the frontend
    res.status(200).json({ success: true, content: formattedContent });
  } catch (error) {
    console.error('Error generating content:', error.message);
    res.status(500).json({ success: false, message: 'Failed to generate content' });
  }
});



module.exports = { openAIController };