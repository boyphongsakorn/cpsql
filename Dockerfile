#Use and existing docker image as a base
FROM node:22-alpine
WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
CMD ["nodemon","app.js"]
