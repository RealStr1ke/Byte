FROM node:latest

RUN mkdir -p /app/Byte

WORKDIR /app/Byte

COPY . .

# Clear old node_modules if it exists and re-install dependencies
RUN rm -rf node_modules
RUN npm install

# Start the bot
CMD ["npm", "start"]