# ── Stage 1: BUILD ──────────────────────────────────────────────────────────
# Node is needed to run Vite and compile the React app into static HTML/JS/CSS.
FROM node:22-alpine AS build

WORKDIR /app

# Same caching trick: copy package files first, install, then copy source.
# If only your .tsx files changed, npm install is skipped on rebuild.
COPY package*.json .
RUN npm ci

COPY . .

# ARG declares a build-time variable — it only exists during docker build, not at runtime.
# This is how you pass VITE_API_URL in from docker-compose or the CLI.
ARG VITE_API_URL
# ENV makes the ARG visible to the build process (Vite reads it during npm run build).
# Vite bakes it into the JS bundle at compile time, so it's available in the browser.
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ── Stage 2: SERVE ──────────────────────────────────────────────────────────
# Nginx is a high-performance web server. We use it to serve the static files.
# The alpine variant is ~5MB — much lighter than keeping Node around.
FROM nginx:alpine AS runtime

# Copy Vite's output into Nginx's default folder for static files.
COPY --from=build /app/dist /usr/share/nginx/html

# Write the Nginx config inline so we don't need a separate nginx.conf file.
# try_files makes React Router work — unknown paths fall back to index.html
# instead of returning a 404.
RUN printf 'server {\n\
    listen 80;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
