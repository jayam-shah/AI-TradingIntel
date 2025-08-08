import { Link } from 'wouter';
import { useTheme } from '@/hooks/useTheme';
import { 
  Activity, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  FileText, 
  Users, 
  HelpCircle,
  Github,
  Twitter,
  Linkedin,
  TrendingUp,
  BarChart3,
  Bell,
  Zap
} from 'lucide-react';

export default function Footer() {
  const { currentTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Dashboard", href: "/", icon: Activity },
        { name: "Stock Analysis", href: "/", icon: TrendingUp },
        { name: "Compare Stocks", href: "/compare", icon: BarChart3 },
        { name: "Price Alerts", href: "/alerts", icon: Bell },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about", icon: Users },
        { name: "Contact", href: "/contact", icon: Mail },
        { name: "Careers", href: "/careers", icon: Zap },
        { name: "Press", href: "/press", icon: FileText },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "/help", icon: HelpCircle },
        { name: "API Documentation", href: "/docs", icon: FileText },
        { name: "Market Data", href: "/data", icon: BarChart3 },
        { name: "Educational Content", href: "/learn", icon: Users },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy", icon: Shield },
        { name: "Terms of Service", href: "/terms", icon: FileText },
        { name: "Cookie Policy", href: "/cookies", icon: Shield },
        { name: "Disclaimer", href: "/disclaimer", icon: FileText },
      ]
    }
  ];

  const socialLinks = [
    { name: "GitHub", href: "#", icon: Github },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
  ];

  return (
    <footer className={`relative bg-gradient-to-t ${currentTheme.colors.background} border-t border-white/10 mt-auto`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                    <Zap className="w-1.5 h-1.5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
                    StockSense AI
                  </h3>
                  <p className="text-sm text-gray-400">Advanced Trading Intelligence</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Empowering traders with AI-driven insights, real-time market analysis, and intelligent investment strategies. 
                Make informed decisions with our comprehensive stock analysis platform.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>contact@stocksense.ai</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={section.title} className="lg:col-span-1">
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <li key={link.name}>
                        <Link 
                          href={link.href}
                          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
                        >
                          <IconComponent className="w-4 h-4 group-hover:text-emerald-400 transition-colors" />
                          <span className="text-sm">{link.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-400 text-sm">Get the latest market insights and platform updates.</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button 
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} StockSense AI. All rights reserved by <span className="text-emerald-400 font-semibold">JDS</span>.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Created with precision and innovation by JDS
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-200 group"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pb-6">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-gray-400 text-xs leading-relaxed">
              <strong className="text-gray-300">Investment Disclaimer:</strong> StockSense AI provides financial information and analysis for educational purposes only. 
              This is not financial advice. All investments carry risk, and past performance does not guarantee future results. 
              Please consult with a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}