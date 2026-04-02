FROM node:24-alpine

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# Install all dependencies (including devDependencies like nodemon)
RUN npm install

USER node

ENV DEBUG=todo-express-backend:*

CMD ["npm", "run", "dev"]