# Build stage
FROM node:20 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
RUN npm run build:ssr

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist /usr/share/nginx/html
COPY package.json package-lock.json ./
COPY nginx.conf /etc/nginx/nginx.com
