import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Check, Sparkles } from 'lucide-react';

export function ThemeSwitcher() {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Theme Switcher Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="glass-card border-white/30 bg-white/5 hover:bg-white/10 transition-all duration-300"
        style={{ color: '#ffffff' }}
      >
        <Palette className="w-4 h-4 mr-2" style={{ color: '#ffffff', fill: '#ffffff' }} />
        <span style={{ color: '#ffffff' }}>Themes</span>
      </Button>

      {/* Theme Selector Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 z-50 w-80 animate-in slide-in-from-top-2 duration-300">
          <Card className="glass-card border-white/20 backdrop-blur-xl bg-black/40">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <CardTitle className="text-lg font-bold" style={{ color: '#ffffff' }}>Choose Your Style</CardTitle>
              </div>
              <CardDescription style={{ color: '#cbd5e1' }}>
                Select a color palette that matches your mood
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  className={`
                    relative p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02]
                    ${currentTheme.id === theme.id 
                      ? 'ring-2 ring-white/40 bg-white/10' 
                      : 'hover:bg-white/5'
                    }
                  `}
                  style={{
                    background: currentTheme.id === theme.id 
                      ? `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.secondary}20)`
                      : undefined
                  }}
                >
                  {/* Theme Preview */}
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium" style={{ color: '#ffffff' }}>{theme.name}</h4>
                        {currentTheme.id === theme.id && (
                          <Check className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                      <p className="text-sm" style={{ color: '#cbd5e1' }}>{theme.description}</p>
                    </div>
                  </div>

                  {/* Theme Preview Gradient */}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-10 pointer-events-none"
                    style={{ background: theme.colors.gradient }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export function ThemePreview() {
  const { currentTheme } = useTheme();
  
  return (
    <div className="flex items-center space-x-2">
      <Badge 
        variant="outline" 
        className="glass-card border-white/20 bg-white/5"
        style={{ color: '#ffffff' }}
      >
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: currentTheme.colors.primary }}
          />
          <span style={{ color: '#ffffff' }}>{currentTheme.name}</span>
        </div>
      </Badge>
    </div>
  );
}