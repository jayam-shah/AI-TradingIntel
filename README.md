# StockSense AI 📈

> AI-powered stock analysis platform with real-time market data and intelligent insights

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)

## ✨ Features

### 🔍 **Comprehensive Stock Analysis**
- Real-time stock quotes and financial data
- AI-powered company analysis using GPT-4o
- Risk assessment and growth potential evaluation
- Interactive financial charts and visualizations

### 📊 **Professional Dashboard**
- Clean, modern interface with professional design
- 6 beautiful theme options with smooth transitions
- Responsive design for desktop, tablet, and mobile
- Real-time market ticker and live data updates

### 🔐 **Secure Authentication**
- JWT-based authentication system
- Secure password hashing with bcrypt
- Protected routes and user session management
- User registration and login functionality

### 📈 **Advanced Features**
- Stock comparison tools (2-4 stocks side-by-side)
- Price and news alert system
- AI-enhanced news sentiment analysis
- Comprehensive business overview sections

### 🎨 **Professional UI/UX**
- Glass morphism design elements
- Live trading animations and effects
- Professional header with market status
- Footer with company information and legal links

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 8+
- PostgreSQL database
- API keys for Alpha Vantage, News API, and OpenAI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/stocksense-ai.git
   cd stocksense-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and database URL
   ```

4. **Database setup**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:5000` to see your application running.

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/stocksense

# API Keys
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
NEWS_API_KEY=your_news_api_key
OPENAI_API_KEY=your_openai_key

# Authentication
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret_key
```

### API Keys Setup

1. **Alpha Vantage** (Free): [Get API Key](https://www.alphavantage.co/support/#api-key)
2. **News API** (Free): [Register](https://newsapi.org/register)
3. **OpenAI** (Paid): [Get API Key](https://platform.openai.com/api-keys)

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Framer Motion** for animations
- **React Query** for state management
- **Wouter** for routing

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** with Drizzle ORM
- **JWT** authentication
- **OpenAI** integration for AI analysis
- **RESTful API** design

### Database
- **PostgreSQL** with comprehensive schema
- **Drizzle ORM** for type-safe database operations
- **User management** and session storage
- **Stock analysis** and alert systems

## 📁 Project Structure

```
stocksense-ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── App.tsx        # Main application
├── server/                # Express backend
│   ├── middleware/        # Express middleware
│   ├── services/          # Business logic
│   ├── routes.ts          # API endpoints
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema
└── [config files]         # Configuration files
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy with serverless functions

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 🎯 Features Overview

### Stock Analysis Sections
1. **Business Overview** - Company description and industry analysis
2. **Financial Health** - Key financial metrics and ratios
3. **Valuation Metrics** - P/E, PEG, and other valuation indicators
4. **Management Team** - Leadership information and backgrounds
5. **Growth Potential** - AI-assessed growth opportunities
6. **Risk Assessment** - Comprehensive risk analysis
7. **Dividend Information** - Dividend yield and payout details
8. **Recent News** - Latest company news with sentiment analysis

### User Experience
- Professional trading-themed interface
- Real-time data updates
- Responsive design for all devices
- Multiple theme options
- Smooth animations and transitions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purpose only.

## 🙏 Acknowledgments

- Stock data provided by [Alpha Vantage](https://www.alphavantage.co/)
- News data from [News API](https://newsapi.org/)
- AI analysis powered by [OpenAI](https://openai.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ by JDS** | All rights reserved
