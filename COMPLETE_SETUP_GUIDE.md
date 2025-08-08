# Complete Setup Guide for StockSense AI

## 🚀 Quick Start

### 1. Clone/Download the Project
Download all the files and place them in your project directory.

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:
- Get Alpha Vantage API key from: https://www.alphavantage.co/support/#api-key
- Get News API key from: https://newsapi.org/register
- Get OpenAI API key from: https://platform.openai.com/api-keys
- Set up PostgreSQL database (or use Neon, Supabase, etc.)

### 4. Database Setup
```bash
# Push the database schema
npm run db:push
```

### 5. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## 📁 Essential Files You Need

### Root Directory Files
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `drizzle.config.ts` - Database ORM configuration
- `postcss.config.js` - PostCSS configuration
- `components.json` - shadcn/ui configuration
- `.env` - Environment variables (create from .env.example)

### Client Directory (`client/`)
```
client/
├── index.html
└── src/
    ├── components/
    │   ├── ui/                 # shadcn/ui components
    │   ├── sections/           # Business analysis sections
    │   ├── charts/             # Chart components
    │   ├── Header.tsx          # Professional header
    │   ├── Footer.tsx          # Professional footer
    │   ├── ThemeProvider.tsx   # Theme system
    │   ├── ThemeSwitcher.tsx   # Theme switcher
    │   └── [other components]
    ├── pages/
    │   ├── landing.tsx         # Landing page
    │   ├── home.tsx            # Dashboard
    │   ├── login.tsx           # Login page
    │   ├── register.tsx        # Registration
    │   ├── alerts.tsx          # Alert management
    │   └── not-found.tsx       # 404 page
    ├── hooks/
    │   ├── useAuth.ts          # Authentication hook
    │   ├── useTheme.ts         # Theme management
    │   ├── use-toast.ts        # Toast notifications
    │   └── use-mobile.tsx      # Mobile detection
    ├── lib/
    │   ├── queryClient.ts      # React Query setup
    │   ├── utils.ts            # Utility functions
    │   └── authUtils.ts        # Auth utilities
    ├── App.tsx                 # Main app component
    ├── main.tsx               # React entry point
    └── index.css              # Global styles
```

### Server Directory (`server/`)
```
server/
├── middleware/
│   └── auth.ts                # Authentication middleware
├── services/
│   ├── auth.ts                # Authentication service
│   ├── stockApi.ts            # Stock API integration
│   ├── aiAnalysis.ts          # AI analysis service
│   ├── alertService.ts        # Alert management
│   └── demoData.ts            # Demo data service
├── index.ts                   # Server entry point
├── routes.ts                  # API routes
├── db.ts                      # Database connection
├── storage.ts                 # Data storage layer
└── vite.ts                    # Vite integration
```

### Shared Directory (`shared/`)
```
shared/
└── schema.ts                  # Database schema and types
```

## 🔧 Configuration Files

### package.json
Contains all dependencies and scripts. Key scripts:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema

### Key Dependencies
- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Express, TypeScript, JWT, bcrypt
- **Database**: PostgreSQL, Drizzle ORM
- **APIs**: OpenAI, Alpha Vantage, News API
- **UI**: Radix UI, Lucide Icons, Recharts

## 🎨 Styling System

### Tailwind CSS
- Custom theme with CSS variables
- 6 professional color palettes
- Responsive design utilities
- Animation classes

### Theme System
- Multiple color schemes
- Dark/light mode support
- Smooth transitions
- Professional gradients

## 🔐 Authentication System

### Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Session management
- User registration and login

### Database Schema
- Users table with email, password, profile info
- Stock analysis storage
- Alert system tables
- Session storage

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Netlify Deployment
The project includes Netlify configuration:
- `netlify.toml` - Deployment configuration
- `netlify/functions/api.ts` - Serverless function
- Environment variables setup

## 📊 Features

### Stock Analysis
- Real-time stock quotes
- Company financial data
- AI-powered analysis
- News sentiment analysis
- Risk assessment

### User Interface
- Professional header with market ticker
- Responsive design
- Interactive charts
- Theme switching
- Professional footer

### Alert System
- Price alerts
- News alerts
- Email notifications
- Alert management

### Stock Comparison
- Side-by-side comparison
- Multiple stocks (2-4)
- Financial metrics
- Growth potential analysis

## 🛠️ Development Tips

### VS Code Setup
1. Install recommended extensions:
   - TypeScript and JavaScript Language Features
   - Tailwind CSS IntelliSense
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter

2. Configure VS Code settings for best experience:
   - Enable format on save
   - Set up TypeScript IntelliSense
   - Configure path mapping for imports

### Database Management
- Use `npm run db:push` to sync schema changes
- Monitor database connections
- Set up proper indexes for performance

### API Integration
- Test API endpoints with proper error handling
- Implement rate limiting
- Cache responses when appropriate

## 🎯 Professional Features

### Header
- Live market ticker
- Search functionality
- Professional navigation
- User profile management
- Theme switching

### Footer
- Company information
- Legal links
- Newsletter signup
- Social media links
- JDS attribution

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Professional layouts
- Consistent spacing

This setup will give you a complete, production-ready stock analysis platform that works perfectly in VS Code and can be deployed to any hosting platform.