# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache
# This layer is rebuilt only if these files change.
COPY package*.json ./

# Install dependencies
# --production: Skip installing devDependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Your application's default port, adjust if different

# Command to run your app
CMD ["ts-node", "src/server.ts"]
