# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
COPY default.conf /etc/nginx/sites-enabled/default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]