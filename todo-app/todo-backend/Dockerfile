FROM node:24-alpine

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node . .

USER node

ENV DEBUG=todo-express-backend:*

EXPOSE 3000

CMD ["npm", "start"]