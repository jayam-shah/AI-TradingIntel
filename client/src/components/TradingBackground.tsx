import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface FloatingNumber {
  id: number;
  value: string;
  x: number;
  y: number;
  delay: number;
  size: number;
}

export default function TradingBackground() {
  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([]);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const stockNumbers = [
      '$297.81', '+1.32%', '$496.62', '-0.22%', '$189.45', '+2.15%',
      '$145.67', '+0.87%', '$423.91', '-1.45%', '$78.34', '+3.42%',
      '$234.56', '+0.95%', '$167.89', '-0.76%', '$345.23', '+1.89%',
      '$512.47', '+2.33%', '$89.12', '-1.67%', '$398.75', '+0.44%',
      'TSLA', 'MSFT', 'AAPL', 'GOOGL', 'AMZN', 'META', 'NVDA',
      'BUY', 'SELL', 'HOLD', 'LONG', 'SHORT', 'CALL', 'PUT'
    ];

    const numbers: FloatingNumber[] = [];
    for (let i = 0; i < 50; i++) {
      numbers.push({
        id: i,
        value: stockNumbers[Math.floor(Math.random() * stockNumbers.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 20,
        size: Math.random() * 0.5 + 0.5
      });
    }
    setFloatingNumbers(numbers);
  }, []);

  return (
    <div className="trading-background theme-transition">
      <div 
        className="ticker-tape theme-transition" 
        style={{ backgroundColor: currentTheme.colors.primary + '10' }}
      />
      <div className="chart-grid theme-transition" />
      <div className="floating-numbers">
        {floatingNumbers.map((number) => (
          <div
            key={number.id}
            className="floating-number theme-transition"
            style={{
              left: `${number.x}%`,
              top: `${number.y}%`,
              animationDelay: `${number.delay}s`,
              fontSize: `${number.size}rem`,
              animationDuration: `${15 + Math.random() * 10}s`,
              color: number.value.includes('%') || number.value.includes('$') 
                ? currentTheme.colors.accent 
                : currentTheme.colors.primary
            }}
          >
            {number.value}
          </div>
        ))}
      </div>
    </div>
  );
}