FROM node:alpine
WORKDIR /app

# backend image wird jetzt ausgehend von root erstellt (siehe compose file)
COPY backend/package*.json ./
RUN npm i

COPY backend/ ./
COPY frontend/dist ./frontend/dist

EXPOSE 3000
CMD ["npm", "run", "dev"]