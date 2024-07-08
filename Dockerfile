# Use an official lightweight Node.js image
FROM node:20.10.0

# Set the working directory to /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --ignore-engines

COPY . ./

ARG PORT
ENV PORT=${PORT}
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
ARG JWT_SECRET_KEY
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}
ARG DB_USERNAME
ENV DB_USERNAME=${DB_USERNAME}
ARG DB_PASSWORD
ENV DB_PASSWORD=${DB_PASSWORD}
ARG DB_NAME
ENV DB_NAME=${DB_NAME}
ARG DB_HOST
ENV DB_HOST=${DB_HOST}
ARG DB_PORT
ENV DB_PORT=${DB_PORT}



# Expose port 3000 for the app
EXPOSE ${PORT}
EXPOSE ${DB_PORT}}

# Start the app
CMD ["npm", "start"]
