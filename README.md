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
- **AWS EC2 Instance** (Deployment Service)

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
Run the development server (with test coverage):

```bash
npm run dev
```
or

Run production server (with test summary)

```bash
npm run start
```
This will compile the TypeScript code, and run test to ensure testcases are good, then start the server.

You should have below information as shown in screenshot below:

![alt text](image.png)


### 7. Access the Bot
Once the bot is running, you can test it by messaging it through WhatsApp. You can also use API endpoints to add/check the services and logs.

API Endpoints

> Manage FAQs

Endpoint: /api/faqs

Method: POST

Description: Add or update FAQs.

Request Body:
```json
{
  "question": "What are your business hours?",
  "answer": "Our business hours are Monday to Friday, 9:00 AM to 6:00 PM. Let us know how we can assist you!"
}
```
Response Body:
```json
{
    "message": "FAQ successfully created",
    "data": {
        "id": 12,
        "question": "What is your return policy?",
        "answer": "Contact our support team or visit our website. Provide your order number and item details."
    }
}
```

Endpoint: /api/faqs

Method: GET

Description: Fetch all FAQs.

Response:
```json
{
    "message": "FAQs success",
    "data": [
        {
            "id": 1,
            "question": "What are your business hours?",
            "answer": "Our business hours are Monday to Friday, 9:00 AM to 6:00 PM. Let us know how we can assist you!"
        },
        {
            "id": 2,
            "question": "What is your return policy?",
            "answer": "Contact our support team or visit our website. Provide your order number and item details."
        },
    ]
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

Get QR Code (Use this enpoint to get most recent QR Code to connect )
```bash
curl --location 'http://34.220.121.185:3000/api/qr'
```
Response:
![alt text](image-1.png)

Other APIs

Get All FAQs
```bash
curl --location 'http://34.220.121.185:3000/api/faqs'
```
FAQs Response
```json
{
  "message": "FAQs success",
  "data": [
      {
          "id": 1,
          "question": "What are your business hours?",
          "answer": "Our business hours are Monday to Friday, 9:00 AM to 6:00 PM. Let us know how we can assist you!"
      },
      {
          "id": 2,
          "question": "What is your return policy?",
          "answer": "Contact our support team or visit our website. Provide your order number and item details."
      },
  ]
}
```

Get One FAQ
```bash
curl --location 'http://34.220.121.185:3000/api/faqs/1'
```

FAQ Response

```json
{
    "message": "FAQ successfully retrieved",
    "data": {
        "id": 1,
        "question": "What are your business hours?",
        "answer": "Our business hours are Monday to Friday, 9:00 AM to 6:00 PM. Let us know how we can assist you!"
    }
}
```

Query Logs Request
```bash
curl --location 'http://34.220.121.185:3000/api/querylogs'
```

Query Logs Response
```json
{
    "message": "Query log success",
    "data": [
        {
            "id": 1,
            "userName": "Tolulope",
            "query": "Return policy",
            "response": "Contact our support team or visit our website. Provide your order number and item details.",
            "timestamp": "2025-01-11T21:27:40.563Z"
        },
        {
            "id": 2,
            "userName": "Tolulope",
            "query": "business hours",
            "response": "Our business hours are Monday to Friday, 9:00 AM to 6:00 PM. Let us know how we can assist you!",
            "timestamp": "2025-01-11T21:28:28.951Z"
        },
        {
            "id": 3,
            "userName": "Olayemi",
            "query": "What's your business hours?",
            "response": "I am available 24/7 to assist you with any questions or inquiries you may have. Feel free to reach out to me at any time.",
            "timestamp": "2025-01-11T21:30:05.452Z"
        },
        ...
    ]
}
```


Deployment

The app is hosted on AWS EC2 Instance.
The IP address to the endpoint: http://34.220.121.185:3000


Test Via Chat

You can easily message the bot to interact:
https://wa.me/2347033812556?text=Hi