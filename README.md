# Masync AI Content Generator
Masync AI Content Generator is an AI-powered content generation platform built using the MERN stack. The platform integrates OpenAI's ChatGPT API / Gemini Api Keys for content generation and Stripe for secure payment processing, offering a user-friendly interface for creating and managing blog posts.

## Technologies: 
- MERN,
- Open AI API(chatgpt API)// Gemini API key,
- Stripe Payment Gateway Integration,
- AWS Lambda

## Key Features:
- User Authentication: Secure user registration, login, and logout functionalities to ensure data privacy and security.
- Subscription Plans: Users can choose from different subscription plans (Free, Basic, Premium) with varying levels of access and API request limits.
- Payment Integration: Payments for subscription plans are securely handled using Stripe, enabling smooth transactions.
- Content Generation: Users can generate high-quality content using OpenAI's ChatGPT API / Gemini API Keys to assist with blog writing and other creative tasks.
- Content History: Users can view and manage their content generation history for easy access to past outputs.

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

