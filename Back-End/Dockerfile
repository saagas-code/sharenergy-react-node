FROM node:16.14-alpine

WORKDIR /usr/app

COPY package* ./

RUN npm install

COPY . .

EXPOSE 8819

CMD ["npm", "run", "start:dev"]