# Build Stage
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# Run Stage
FROM node:18-alpine AS run

WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
RUN npm install --production

EXPOSE 3000

CMD ["node", "build/index.js"]