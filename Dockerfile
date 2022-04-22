FROM node:16.13.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i -g typescript

COPY . .

RUN npm run lint

RUN npm run build

RUN tsc

CMD ["npm", "run", "start:docker"]
