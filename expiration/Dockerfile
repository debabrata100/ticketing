FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev

COPY . .

CMD [ "npm", "build", "&&", "npm", "run", "start:prod" ]