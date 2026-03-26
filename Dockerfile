#Use and existing docker image as a base
FROM node:24-alpine3.22
WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
CMD ["nodemon","app.js"]
