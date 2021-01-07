FROM node:10.23.1-alpine
COPY ./app /app
WORKDIR /app
CMD ["npm", "start"]
EXPOSE 8080