# for render only
# frontend build
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# backend build
FROM node:20-alpine

WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install --only=production

COPY backend ./backend

COPY --from=frontend-build /app/frontend/dist ./backend/dist

EXPOSE 3003

CMD [ "node", "backend/server.js" ]