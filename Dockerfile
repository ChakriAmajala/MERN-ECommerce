# ---------- Frontend Build ----------
FROM node:18-slim AS frontend
WORKDIR /app
COPY client/package*.json ./client/
RUN cd client && npm install && npm cache clean --force
COPY client ./client
RUN cd client && npm run build

# ---------- Backend Build ----------
FROM node:18-slim AS backend
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm install --production && npm cache clean --force
COPY server ./server

# Copy frontend build into backend's public folder (if served by express)
COPY --from=frontend /app/client/build ./server/public

EXPOSE 5000
CMD ["node", "server/index.js"]
