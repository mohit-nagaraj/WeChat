FROM node:22-alpine   

# Pass environment variables as build arguments  
ARG PORT  
ARG MONGO_URI  
ARG JWT_KEY  

# Export build arguments as environment variables  
ENV PORT=${PORT}  
ENV MONGO_URI=${MONGO_URI}  
ENV JWT_KEY=${JWT_KEY}  

COPY package*.json ./  

RUN npm install  

COPY . .  

EXPOSE 5000  

CMD ["npm", "start"]