# Vue Image Offline

A Progressive Web Application (PWA) built with Vue.js that enables offline-first image viewing and caching capabilities.

## Features
- Offline-first architecture
- Progressive image loading
- Service Worker caching
- Responsive image gallery
- Book/Page navigation system
- Connection status indicator
- Mobile-friendly interface

## Technical Stack
- Vue.js 2.7
- Vue Router for navigation
- PWA with Workbox
- Service Workers for offline caching
- Responsive CSS design

## Project Structure
```
VueOffline/
├── src/
│   ├── components/     # Vue components
│   ├── service-worker/ # PWA service worker
│   └── assets/        # Static assets
├── public/            # Public static files
└── dist/             # Production build
```

## Project Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v7 or higher)
- Git

### Windows Setup
```bash
# Clone repository
git clone https://github.com/suryatejamuthyala/VueOffline.git
cd VueOffline

# Install dependencies
npm install

# Add PWA support
vue add pwa

# Build for production
npm run build

# Serve application
npm run serve
```

### Mac/Linux Setup
```bash
# Install Node.js (if not installed)
brew install node

# Clone repository
git clone https://github.com/suryatejamuthyala/VueOffline.git
cd VueOffline

# Install dependencies
npm install

# Add PWA support
vue add pwa

# Build for production
npm run build

# Serve application
npm run serve
```

### Additional Configuration

- Default port is 8080
- To change port, modify package.json:
  ```json
  "scripts": {
    "serve": "vue-cli-service serve --port <your-port>"
  }
  ```

### Development Notes

1. Never commit `dist` and `node_modules` folders
2. Pull latest changes: `git pull origin main`
3. Push your changes: `git push origin main`

### Contact

For support: suryamuthyala@yahoo.com

### Vue CLI Configuration
See [Configuration Reference](https://cli.vuejs.org/config/)
