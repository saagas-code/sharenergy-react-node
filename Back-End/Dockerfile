FROM node:18.13.0-alpine

WORKDIR /app

RUN mkdir -p /app

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "run", "start:prod" ]
