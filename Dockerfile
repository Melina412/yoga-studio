## Build Dockerfile for production 

## 1. Base image
FROM node:alpine AS base

WORKDIR /app

## 2. Build frontend
FROM base AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
# env muss hier gesetzt werden, sonst nach build vorgang nicht erreichbar
ENV VITE_BACKENDURL=https://site--yoga-studio--wczbkl6jmjwc.code.run
COPY frontend/ ./
RUN npm run build

## 3. Build backend
FROM base AS build-backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
COPY --from=build-frontend /app/frontend/dist ./frontend/dist
RUN npm run build

## 4. Final runtime image
FROM node:alpine AS runtime
WORKDIR /app
COPY --from=build-backend /app/backend ./

EXPOSE 3000
CMD ["npm", "run", "start"]