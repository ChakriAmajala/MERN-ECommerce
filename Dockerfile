FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install && npm cache clean --force

COPY . .

# If React client exists, build it
RUN if [ -d "client" ]; then cd client && npm install && npm run build; fi

EXPOSE 5000

CMD ["npm", "start"]
