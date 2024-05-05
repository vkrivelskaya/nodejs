# Use an official Node.js runtime as a parent image
FROM node:21-alpine

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY ./dist ./dist

# Expose port 8000
EXPOSE 8000

# Start the app
CMD [ "npm",  "start" ]