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
- **Nodemon** (Development Server)

## Setup Instructions

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (>= 14.x)
- **PostgreSQL**
- **OpenAI API Key** (if using dynamic responses)

### 1. Clone the Repository
Clone the project repository to your local machine:
```bash
git clone https://github.com/your-username/support-bot.git
cd support-bot 
```

### 2. Install Dependencies
Install required dependencies using npm:

```bash
Copy code
npm install
```

### 3. Environment Variables
Create a .env file in the root directory based on the template .env.example and update it with the following environment variables:

env
Copy code
DATABASE_URL="postgresql://user:password@localhost:5432/supportbotdb?schema=public"
OPENAI_API_KEY="your-openai-api-key"
WHATSAPP_QR_PATH="./src/qr/qr.png"
PORT=3000

### 4. Set Up PostgreSQL Database
Make sure PostgreSQL is installed and running. Create a database named supportbotdb and run the Prisma migrations to set up the schema:

bash
Copy code
npx prisma migrate deploy
This will ensure the database is ready for storing FAQs and query logs.

### 5. Generate WhatsApp QR Code
You will need to scan the WhatsApp Web QR code to authenticate with your WhatsApp account. When you run the bot, it will generate a QR code that you can scan with the WhatsApp mobile app.

### 6. Start the Application
Run the development server:

bash
Copy code
npm run dev
This will compile the TypeScript code, and nodemon will automatically restart the server when files change.

### 7. Access the Bot
Once the bot is running, you can test it by messaging it through WhatsApp. You can also use API endpoints to interact with the bot.

API Endpoints
/api/bot/init
Method: POST
Description: Initializes the WhatsApp bot. Requires scanning the QR code.
Response:
json
Copy code
{
  "message": "WhatsApp bot initialized and ready."
}
/api/bot/message
Method: POST
Description: Sends a message to the bot and receives a response.
Request Body:
json
Copy code
{
  "message": "What is your return policy?"
}
Response:
json
Copy code
{
  "response": "Our return policy is as follows..."
}
Testing
Unit Tests
Run unit tests with the following command:

bash
Copy code
npm run test
This will execute tests for routes, services, and database functionality to ensure the bot works as expected.

API Tests
You can test the API endpoints using Postman or Supertest. For example:

bash
Copy code
supertest(app)
  .post('/api/bot/message')
  .send({ message: 'What is your return policy?' })
  .expect(200)
  .then(response => {
    console.log(response.body);
  });
Deployment
You can deploy the bot on any cloud platform (e.g., Heroku, AWS, DigitalOcean). Ensure the following when deploying:

Ensure access to the .env file with the correct environment variables.
PostgreSQL should be accessible in production (consider using a hosted database like ElephantSQL or AWS RDS).
Make sure the port number (PORT) matches your deployment environment settings.