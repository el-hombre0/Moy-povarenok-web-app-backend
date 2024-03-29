#  Dockerfile for Node Express Backend
FROM node:18

# Create App Directory
# RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./
RUN npm install --silent --legacy-peer-deps
# RUN npm ci --omit=dev

# Copy app source code
COPY . .

EXPOSE 8080
CMD ["npm", "start"]
