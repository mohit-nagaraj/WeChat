FROM node:18-alpine

# Pass environment variables as build arguments
ARG PORT
ARG MONGO_URI
ARG JWT_KEY

# Optionally, you can export these as environment variables
ENV PORT=${PORT}
ENV MONGO_URI=${MONGO_URI}
ENV JWT_KEY=${JWT_KEY}

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]