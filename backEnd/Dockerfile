FROM node:20-alpine AS builder

WORKDIR /app


COPY package.json package-lock.json ./

RUN npm install


COPY . .

FROM node:20-alpine

WORKDIR /app


COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/src ./src
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/src/app.js ./src/app.js  


EXPOSE 3000

CMD ["node", "server.js"]