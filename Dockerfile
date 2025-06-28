# Single-stage build for Nuxt.js application
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies without running postinstall
RUN npm install --ignore-scripts

# Copy source code
COPY . .

# Prepare and build the application
RUN npx nuxt prepare && npm run build

# Create a non-root user
RUN groupadd -g 1001 -r nodejs && \
    useradd -r -g nodejs -u 1001 nodejs

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose the port (Render will override this)
EXPOSE 3000

# Set environment variables for production
ENV NODE_ENV=production
ENV NITRO_PORT=${PORT:-3000}
ENV NITRO_HOST=0.0.0.0

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000) + '/', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", ".output/server/index.mjs"]