# Use a lightweight version of Node.js as the base environment
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your service's application code (e.g., server.js)
COPY . .

# Expose the port the app runs on (change per service: 3000, 5000, or 8080)
EXPOSE 3000

# The command to start the application
CMD [ "node", "server.js" ]
