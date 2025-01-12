# WhatsApp Customer Support Bot

## Overview
The WhatsApp Customer Support Bot is a Node.js application that integrates WhatsApp Web, PostgreSQL, and OpenAI's GPT-3 API to provide automated customer support. This bot can respond to frequently asked questions (FAQs) based on a database, log queries for future analysis, and provide dynamic responses through OpenAI's model for unknown queries.

## Features
- Automated handling of frequently asked questions (FAQs).
- Logging of user queries and responses for further analysis.
- Integration with WhatsApp Web using **whatsapp-web.js**.
- Use of **OpenAI GPT-3** for dynamic query responses.
- Customizable FAQ management via a PostgreSQL database.
- Ability to scan QR codes to link to a WhatsApp account.

## Technologies
- **Node.js** (Backend Runtime)
- **Express.js** (Web Framework)
- **PostgreSQL** (Database)
- **whatsapp-web.js** (WhatsApp Web Automation)
- **Prisma** (Database ORM)
- **OpenAI GPT-3** (Dynamic Query Responses)
- **TypeScript** (Language)
- **Jest** & **Supertest** (Testing)

## Setup Instructions

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (>= 20.x)
- **PostgreSQL**
- **OpenAI API Key** (for dynamic responses)

### 1. Clone the Repository
Clone the project repository to your local machine:
```bash
git clone https://github.com/kanmitcode/support-bot.git
cd support-bot 
```

### 2. Install Dependencies
Install required dependencies using npm:

```bash
npm install
```

### 3. Environment Variables
Create a .env file in the root directory (if not exist) and update it with the following environment variables:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/supportbotdb?schema=public"
OPENAI_API_KEY="your-openai-api-key"
PORT=3000
```

### 4. Set Up PostgreSQL Database
Make sure PostgreSQL is installed and running. Create a database named supportbotdb and optionally run the Prisma migrations to set up the schema, as it's part of the running development server:

```bash
npx prisma db push && npx prisma generate
```
This will ensure the database is ready for storing FAQs and query logs.


### 5. Generate WhatsApp QR Code
You will need to scan the WhatsApp Web QR code to authenticate with your WhatsApp account. When you run the bot, it will generate a QR code that you can scan with the WhatsApp mobile app.

### 6. Start the Application
Run the development server:

```bash
npm run dev
```
This will compile the TypeScript code, and nodemon will automatically restart the server when files change.

### 7. Access the Bot
Once the bot is running, you can test it by messaging it through WhatsApp. You can also use API endpoints to interact with the bot.

API Endpoints

/api/bot/init

Method: POST

Description: Initializes the WhatsApp bot. Requires scanning the QR code.

Response:
```json
{
  "message": "WhatsApp bot initialized and ready."
}
```

/api/bot/message

Method: POST

Description: Sends a message to the bot and receives a response.

Request Body:
```json
{
  "message": "What is your return policy?"
}
```

Response:
```json
{
  "response": "Contact our support team or visit our website. Provide your order number and item details."
}
```

Testing

Unit Tests

Run unit tests with the following command using jest:

```bash
npm run test:coverage
```
To clear the test cache
```bash
npx jest --clearCache
```

This will execute tests for routes, services, and database functionality to ensure the bot works as expected.

API Tests

You can test the API endpoints using Postman or Supertest. Tests are located in the tests/ folder of the application:

Using Postman
```bash
curl --location 'http://34.220.121.185:3000/api/faqs'
```
Response
```json
[
    {
        "id": 1,
        "question": "What are your business hours?",
        "answer": "Our business hours are Monday to Friday, 9:00 AM to 6:00 PM. Let us know how we can assist you!"
    },
    {
        "id": 2,
        "question": "What is your return policy?",
        "answer": "Contact our support team or visit our website. Provide your order number and item details."
    }
]
```

Deployment

The app is hosted on AWS EC2 Instance.
The IP address to the endpoint: http://34.220.121.185:3000