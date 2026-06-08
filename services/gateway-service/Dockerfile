FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=30s --retries=3 \
    CMD curl -f http://localhost:4000/health || exit 1

CMD ["npm", "run", "dev"]