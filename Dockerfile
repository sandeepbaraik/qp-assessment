FROM node:14

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY .env .

RUN npm install

COPY . .

CMD ["npm", "start"]
