FROM node:24

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

# npm run dev is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]