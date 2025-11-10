import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';
import {DefaultTheme} from 'react-native-paper';

// Light and Dark themes
const themeLight = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1C1B1F',
    secondary: '#CECFCF',
    destructive: '#FF0000',
    muted: '#777777',
    error: '#BF0B30',
  },
};

const themeDark = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#222',
    secondary: '#666666',
    destructive: '#FF6F6F',
    muted: '#BBBBBB',
    error: '#FF4B5C',
  },
};

const THEME_STORAGE_KEY = 'user-theme-preference';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState(themeLight);

  useEffect(() => {
    const loadTheme = async () => {
      const storedPreference = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedPreference === 'dark') {
        setIsDark(true);
        setTheme(themeDark);
      }
    };
    loadTheme();
  }, []);

  // Toggle theme and save preference in AsyncStorage
  const toggleTheme = useCallback(async () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    setTheme(newIsDark ? themeDark : themeLight);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newIsDark ? 'dark' : 'light');
  }, [isDark]);

  return {isDark, theme, toggleTheme};
};

export default useTheme;
