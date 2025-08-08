# Complete StockSense AI Project Structure

This document contains the complete file structure for the StockSense AI stock analysis platform.

## Project Overview
A full-stack AI-powered stock analysis application with:
- React frontend with TypeScript
- Node.js Express backend
- PostgreSQL database with Drizzle ORM
- Professional authentication system
- AI-powered stock analysis using OpenAI
- Real-time market data from Alpha Vantage API
- Responsive design with Tailwind CSS
- Professional header and footer
- Stock comparison tools
- Alert system for price changes and news

## Required Environment Variables
Create a `.env` file in the root directory with:

```
# Database
DATABASE_URL=your_postgresql_url
PGHOST=your_pg_host
PGPORT=your_pg_port
PGUSER=your_pg_user
PGPASSWORD=your_pg_password
PGDATABASE=your_pg_database

# API Keys
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
NEWS_API_KEY=your_news_api_key
OPENAI_API_KEY=your_openai_api_key

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Session Secret
SESSION_SECRET=your_session_secret_key
```

## Installation Commands
```bash
# Install dependencies
npm install

# Setup database (push schema)
npm run db:push

# Start development server
npm run dev
```

## Project Structure
```
stocksense-ai/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   ├── sections/     # Business sections
│   │   │   ├── charts/       # Chart components
│   │   │   ├── Header.tsx    # Professional header
│   │   │   ├── Footer.tsx    # Professional footer
│   │   │   └── [other-components]
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # React entry point
│   │   └── index.css         # Global styles
│   └── index.html            # HTML template
├── server/
│   ├── middleware/           # Express middleware
│   ├── services/             # Business logic services
│   ├── index.ts              # Server entry point
│   ├── routes.ts             # API routes
│   ├── db.ts                 # Database connection
│   ├── storage.ts            # Data storage layer
│   └── vite.ts               # Vite integration
├── shared/
│   └── schema.ts             # Database schema & types
├── netlify/                  # Netlify deployment
├── package.json              # Dependencies
├── vite.config.ts            # Vite configuration
├── tailwind.config.ts        # Tailwind CSS config
├── tsconfig.json             # TypeScript config
├── drizzle.config.ts         # Drizzle ORM config
└── [config files]
```

## Key Features
1. **Authentication System**: Complete JWT-based auth with registration, login, and protected routes
2. **Stock Analysis**: AI-powered analysis using OpenAI GPT-4o with real market data
3. **Professional UI**: Modern design with header, footer, and responsive layout
4. **Database Integration**: PostgreSQL with Drizzle ORM for data persistence
5. **Real-time Data**: Alpha Vantage API for live stock quotes and company information
6. **News Integration**: News API for relevant company news and sentiment analysis
7. **Alert System**: Price and news alerts with notification system
8. **Stock Comparison**: Side-by-side comparison of multiple stocks
9. **Theme System**: 6 professional color themes with smooth transitions
10. **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## Technologies Used
- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT tokens, bcrypt password hashing
- **AI Integration**: OpenAI GPT-4o for analysis
- **APIs**: Alpha Vantage (stocks), News API (news), OpenAI (AI analysis)
- **Deployment**: Netlify with serverless functions

## Professional Features
- **Header**: Market status, live ticker, search bar, navigation, user profile
- **Footer**: Company info, links, newsletter signup, social links, legal pages
- **JDS Attribution**: "All rights reserved by JDS" prominently displayed
- **Responsive Design**: Professional layout that works on all devices