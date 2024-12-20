# Masync AI Content Generator
Masync AI Content Generator is an AI-powered content generation platform built using the MERN stack. The platform integrates OpenAI's ChatGPT API / Gemini Api Keys for content generation and Stripe for secure payment processing, offering a user-friendly interface for creating and managing blog posts.

## Technologies: 
- MERN,
- Open AI API(chatgpt API)// Gemini API key,
- Stripe Payment Gateway Integration,
- AWS Lambda
- Cron-Jobs

## Key Features:
- User Authentication: Secure registration, login, and logout.
- Subscription Plans: Free, Basic, Premium plans with different access levels.
- Payment Integration: Secure Stripe payment processing.
- Content Generation: Generate content with OpenAI's ChatGPT API / Gemini API.
- Content History: View and manage past content.

## Frontend .env
```
REACT_APP_STRIPE_KEY=
```
same as STRIPE_PUBLISHABLE_KEY.

## Backend .env
```
MONGODB_URI=mongodb://127.0.0.1:27017/mern-ai-content
NODE_ENV=development
JWT_SECRET=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
```

