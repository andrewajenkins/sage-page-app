# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache
# This layer is rebuilt only if these files change.
COPY package.json ./

# Install dependencies
# --production: Skip installing devDependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Clear existing build directory
RUN rm -rf dist

# Your application's default port, adjust if different
RUN npm run build || exit 1

# Command to run your app
CMD ["node", "build/server.js"]
