import {DefaultTheme} from 'react-native-paper';

export default function useTheme() {
  const theme = {
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

  return theme;
}
