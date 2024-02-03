# Stage 1: Build the Angular application
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install \
    npm install -g @angular/cli \
    npm run build
#COPY tools/docker .
RUN #npm run build
COPY . .
RUN ls -al

# Stage 2: Serve the app with Node.js
FROM node:20
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm install --only=production
EXPOSE 4000
CMD ["npm", "run", "serve"]
