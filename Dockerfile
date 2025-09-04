FROM node:18-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install && npm cache clean --force

# Copy everything
COPY . .

# If React client exists, build it
RUN if [ -d "client" ]; then cd client && npm install && npm run build; fi

# Expose backend port
EXPOSE 5000

# Start Node.js app
CMD ["npm", "start"]
