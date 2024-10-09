FROM node:16

WORKDIR /usr/app

COPY ./ /usr/app

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm","run","start:dev"]