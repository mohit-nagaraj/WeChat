FROM node:22-alpine   

# Pass environment variables as build arguments  
ARG PORT  
ARG MONGO_URI  
ARG JWT_KEY  

# Export build arguments as environment variables  
ENV PORT=${PORT}  
ENV MONGO_URI=${MONGO_URI}  
ENV JWT_KEY=${JWT_KEY}  

# Copy SSL certificates to the correct path
COPY ssl/server.key ./ssl/server.key
COPY ssl/server.cert ./ssl/server.cert

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./  

# Install app dependencies
RUN npm install  

# Copy app source code
COPY . .  

# Expose the port your app runs on
EXPOSE 433  

# Command to run your app
CMD ["npm", "start"]
