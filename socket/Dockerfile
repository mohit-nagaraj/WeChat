FROM node:22-alpine   

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the SSL certificates into the image
COPY ssl/server.key ./ssl/server.key
COPY ssl/server.cert ./ssl/server.cert

# Copy the rest of the application source code
COPY . .

# Expose the port your app runs on (3000 in this case)
EXPOSE 3000  

# Command to run your app
CMD ["npm", "start"]
