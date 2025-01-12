module.exports = {
    apps : [
        {
          name: "support-bot",
          script: "dist/server.js",
          watch: true,
          env: {            
            "PORT": 3000,
            "NODE_ENV": "dev",
            "DATABASE_URL": "postgresql://kanmit:Manager2025@localhost:5432/supportbotdb?schema=public",
            "OPENAI_API_KEY": "sk-ephsbL2VIg4AQDYdKcUfv7gUas01MJnUyZtDuVlEXQT3BlbkFJmPLrptAyEVsKkx7a9OdI9EbEgZc28VTXxocCBz89oA"
          },
          env_test: {
            "PORT": 3000,
            "NODE_ENV": "test",
            "DATABASE_URL": "postgresql://kanmit:Manager2025@localhost:5432/supportbotdb?schema=public",
            "OPENAI_API_KEY": "sk-ephsbL2VIg4AQDYdKcUfv7gUas01MJnUyZtDuVlEXQT3BlbkFJmPLrptAyEVsKkx7a9OdI9EbEgZc28VTXxocCBz89oA"
          },
          env_production: {
            "PORT": 3000,
            "NODE_ENV": "production",
            "DATABASE_URL": "postgresql://kanmit:Manager2025@localhost:5432/supportbotdb?schema=public",
            "OPENAI_API_KEY": "sk-ephsbL2VIg4AQDYdKcUfv7gUas01MJnUyZtDuVlEXQT3BlbkFJmPLrptAyEVsKkx7a9OdI9EbEgZc28VTXxocCBz89oA"
          },
          watch: 'false',
          ignore_watch : [ "*.log"],
        }
    ]
}
