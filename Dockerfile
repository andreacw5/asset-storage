FROM node:18.10.0-alpine

# Run app as non-root user
# USER node

# Create app directory
WORKDIR /home/node

# Set environment variables
ENV NODE_ENV production

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Copy prisma folder
COPY ./prisma prisma

# Install dependencies
RUN yarn --frozen-lockfile

# Copy the rest of the app
COPY . .

# Expose port 8080
EXPOSE 8080

# Run the app
CMD [ "yarn", "start" ]
