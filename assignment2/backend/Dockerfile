FROM node:18.18

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENV MONGO_URI=mongodb://mongo:27017/comp3123_assigment2_backend

CMD ["npm", "start"]
