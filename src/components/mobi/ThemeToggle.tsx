import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full"
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
    >
      <Sun className={`h-4 w-4 transition-all ${isDark ? 'scale-0 rotate-90' : 'scale-100 rotate-0'} absolute`} />
      <Moon className={`h-4 w-4 transition-all ${isDark ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'} absolute`} />
    </Button>
  );
};

export default ThemeToggle;
