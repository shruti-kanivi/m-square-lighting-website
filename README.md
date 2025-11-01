# M Square Lighting Website

A modern, responsive website for M Square Lighting - a professional lighting solutions company based in Bengaluru, Karnataka, India. Specializing in architectural luminaires, downlighters, linear lighting, and acoustic lighting systems with the tagline "Rest Assured".

## 🚀 Technology Stack

### Frontend
- **React 19.1.1** - Modern UI library
- **Vite 7.1.2** - Fast build tool and dev server
- **React Router DOM 7.9.1** - Client-side routing
- **CSS3** - Custom styling with responsive design

### Backend
- **Node.js** with **Express 5.1.0** - REST API server
- **Helmet 8.1.0** - Security middleware
- **CORS 2.8.5** - Cross-origin resource sharing
- **Morgan 1.10.1** - HTTP request logging
- **Nodemailer 6.9.8** - Email service integration
- **Express Rate Limit 7.1.5** - API rate limiting
- **Nodemon 3.1.10** - Development auto-reload

## 📁 Project Structure

```
m-square-lighting-website/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── pages/         # Page components (Home, About, Services, Portfolio, Contact, Catalogue)
│   │   ├── components/    # Reusable components (Header, Footer, SEO, LazyImage, ImageModal)
│   │   ├── assets/        # Images, logo, and portfolio images
│   │   ├── utils/         # API utilities and helpers
│   │   ├── App.jsx        # Main app component with routing
│   │   └── App.css        # Global styles
│   ├── public/            # Public assets (logo.jpeg, catalogue.json)
│   ├── index.html         # HTML template with favicon
│   └── package.json       # Frontend dependencies
├── server/                # Express backend API
│   ├── app.js            # Main server file with security middleware
│   ├── routes/           # API routes (contact)
│   ├── services/         # Email service
│   ├── middleware/       # Rate limiting and security
│   ├── .env              # Environment variables
│   ├── .env.example      # Environment template
│   └── package.json      # Backend dependencies
├── scripts/              # Utility scripts (catalogue generation)
└── package.json          # Root package with concurrently scripts
```

## 🛠️ Installation

### Step 1: Install Root Dependencies
```bash
npm install
```

### Step 2: Install Client Dependencies
```bash
cd client
npm install
cd ..
```

### Step 3: Install Server Dependencies
```bash
cd server
npm install
cd ..
```

## 🚀 Running the Application

### Option 1: Run Both Client and Server Together (Recommended)
From the root directory:
```bash
npm run dev
```
This will start:
- **Frontend**: http://localhost:3000 (Vite dev server)
- **Backend**: http://localhost:5000 (Express API server)

### Option 2: Run Client and Server Separately

**Terminal 1 - Start the Backend:**
```bash
npm run server
```

**Terminal 2 - Start the Frontend:**
```bash
npm run client
```

## 📝 Available Scripts

### Root Directory
- `npm run dev` - Run both client and server concurrently
- `npm run client` - Run only the frontend
- `npm run server` - Run only the backend
- `npm run build` - Build the client for production
- `npm start` - Start the production server
- `npm run generate:catalogue` - Generate catalogue data from Excel files

### Client Directory (`cd client`)
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server Directory (`cd server`)
- `npm run dev` - Start server with nodemon (auto-reload)
- `npm start` - Start server in production mode

## 🌐 Pages

The website includes the following pages:
- **Home** (`/`) - Landing page with hero section and services overview
- **About** (`/about`) - Company information and mission
- **Services** (`/services`) - Detailed lighting solutions and service categories
- **Portfolio** (`/portfolio`) - Interactive project showcase with filtering and modal gallery
- **Contact** (`/contact`) - Contact form with backend integration and company information
- **Catalogue** (`/catalogue`) - Product catalogue with search and filtering capabilities

## 🔧 Environment Variables

### Server (.env in server directory)
Copy from `.env.example` and configure:
```bash
PORT=5000
NODE_ENV=development

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@msquarelighting.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@msquarelighting.com

# Frontend URL
CLIENT_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security (for production)
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Client (.env in client directory)
Optional configuration for production:
```bash
VITE_SITE_URL=https://yourdomain.com
VITE_API_URL=https://api.yourdomain.com
```

## 🏗️ Building for Production

1. Build the client:
```bash
npm run build
```

2. The built files will be in `client/dist/`

3. Deploy the backend and serve the built frontend files

## 📦 Key Dependencies

### Frontend
- `react` & `react-dom` - UI framework
- `react-router-dom` - Routing
- `vite` - Build tool

### Backend
- `express` - Web framework
- `cors` - CORS middleware
- `helmet` - Security headers
- `morgan` - Request logging
- `dotenv` - Environment variables

## 🎨 Features

### Frontend Features
✅ **Responsive design** with mobile-first approach  
✅ **Multi-page application** with React Router DOM  
✅ **Modern UI** with custom CSS styling  
✅ **SEO optimized** with dynamic meta tags and Open Graph support  
✅ **Lazy loading images** for better performance  
✅ **Interactive portfolio gallery** with category filtering and modal view  
✅ **Contact form** with real-time validation and backend integration  
✅ **Product catalogue** with search and filtering capabilities  
✅ **Custom favicon** with M Square Lighting logo  
✅ **Navigation links** properly configured for all pages  

### Backend Features
✅ **RESTful API** with Express.js 5.1.0  
✅ **Email service integration** with Nodemailer  
✅ **Rate limiting** to prevent API abuse  
✅ **Security middleware** (Helmet, CORS, input validation)  
✅ **Form validation** and comprehensive error handling  
✅ **Production-ready** configuration with environment variables  
✅ **Static file serving** for production builds  
✅ **Health check endpoint** for monitoring  

### Production Ready
✅ **Environment-based configuration** with .env files  
✅ **Build process** optimized with Vite  
✅ **Security headers** and CORS configuration  
✅ **Error handling** and logging middleware  
✅ **Production deployment** configuration ready  

## 🚀 Quick Start for Production

### 1. Install Dependencies
```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Configure Environment
```bash
# Server configuration
cp server/.env.example server/.env
# Edit server/.env with your production values

# Client configuration
cp client/.env.example client/.env.production
# Edit client/.env.production with your API URL
```

### 3. Build for Production
```bash
npm run build
```

### 4. Deploy to Digital Ocean
Follow the comprehensive guide in [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📋 Production Checklist

Before deploying to production, review [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) to ensure all requirements are met.

## 🔒 Security Features

- **Rate Limiting**: Prevents API abuse and spam
- **CORS Configuration**: Restricts cross-origin requests
- **Helmet Security Headers**: Adds security headers
- **Input Validation**: Validates all form inputs
- **Environment Variables**: Sensitive data stored securely
- **HTTPS/SSL**: Encrypted communication

## 📧 Email Configuration

The contact form sends emails to both the company and the customer. Configure your email service in `server/.env`:

### Option 1: Gmail
1. Enable 2-Factor Authentication
2. Generate App Password
3. Add credentials to `.env`

### Option 2: Custom SMTP
Configure your SMTP server details in `.env`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed email setup instructions.

## 📊 API Endpoints

### Health Check
```
GET /api/health
Response: { success: true, message: "M-Square Lighting API is running!", environment: "development", timestamp: "2024-10-31T17:00:00.000Z" }
```

### Contact Form
```
POST /api/contact
Body: { name, email, phone, projectType, message }
Response: { success: true, message: "Thank you for your inquiry! We will get back to you soon." }
```

## 🎯 Performance Optimizations

- **Image Lazy Loading**: Images load only when visible
- **Code Splitting**: Optimized bundle sizes
- **Gzip Compression**: Reduced transfer sizes
- **Static Asset Caching**: Browser caching enabled
- **Production Build**: Minified and optimized code

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development & Maintenance

### Update Dependencies
```bash
npm update
cd server && npm update
cd ../client && npm update
```

### Generate Catalogue Data
```bash
npm run generate:catalogue
```

### Build for Production
```bash
npm run build
```

## 📞 Support

For technical issues:
- Check server logs in development mode
- Verify environment variables are properly configured
- Ensure all dependencies are installed

For business inquiries, visit the Contact page on the website.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ **Commercial use** - You can use this code for commercial projects
- ✅ **Modification** - You can modify the code
- ✅ **Distribution** - You can distribute the code
- ✅ **Private use** - You can use the code privately
- ⚠️ **Attribution required** - You must include the original copyright notice

Copyright © 2024 M Square Lighting