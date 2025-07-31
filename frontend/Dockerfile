# Use Node.js 18 Alpine for the build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Fix permissions for Vite
RUN chmod +x node_modules/.bin/vite

# Build the application
RUN npm run build

# Production stage - serve with a lightweight HTTP server
FROM node:18-alpine as production

WORKDIR /app

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Install serve globally to serve the built app
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "dist", "-l", "3000"]