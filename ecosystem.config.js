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
            "OPENAI_API_KEY": "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"
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
            "OPENAI_API_KEY": "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"
          },
          watch: 'false',
          ignore_watch : [ "*.log"],
        }
    ]
}