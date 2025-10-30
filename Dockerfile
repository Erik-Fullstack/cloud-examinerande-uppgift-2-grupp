FROM node:20-alpine

WORKDIR /app

# Kopiera package files
COPY package*.json ./

# Installera dependencies
RUN npm install

# Kopiera all kod
COPY . .

# Bygg applikationen
RUN npm run build

# Exponera port
EXPOSE 3000

# Starta applikationen
CMD ["npm", "start"]