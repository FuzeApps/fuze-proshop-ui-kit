import * as React from 'react';
import { Provider } from 'react-redux';
import AuthContextProvider from './auth-provider';
import { DefaultTheme, PaperProvider, type MD3Theme } from 'react-native-paper';
import { store } from '../redux/store';
export type CusTomTheme = typeof DefaultTheme;
export interface IAmityUIkitProvider {
  userId: string;
  displayName: string;
  apiKey: string;
  apiRegion?: string;
  apiEndpoint?: string;
  children: any;
  theme?: CustomColors;
  darkMode?: boolean;
}

interface CustomColors {
  // Primary colors
  primary?: string;
  primaryShade1?: string;
  primaryShade2?: string;
  primaryShade3?: string;
  primaryShade4?: string;

  // Secondary colors
  secondary?: string;
  secondaryShade1?: string;
  secondaryShade2?: string;
  secondaryShade3?: string;
  secondaryShade4?: string;

  base?: string;
  baseShade1?: string;
  baseShade2?: string;
  baseShade3?: string;
  baseShade4?: string;

  background?: string;
  border?: string;
  screenBackground?: string;
}
export interface MyMD3Theme extends MD3Theme {
  colors: MD3Theme['colors'] & CustomColors;
}

const proShopTheme: MyMD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Primary colors
    primary: '#118cf7',
    primaryShade1: '#0559A3',
    primaryShade2: '#033B6C',
    primaryShade3: '#021E36',
    primaryShade4: '#344054',

    // Secondary colors
    secondary: '#182230',
    secondaryShade1: '#344054',
    secondaryShade2: '#475467',
    secondaryShade3: '#98A2B3',
    secondaryShade4: '#667085',

    base: '#fcfcfd',
    baseShade1: '#98a2b3',
    baseShade2: '#7f889e',
    baseShade3: '#182230',
    baseShade4: '#0C111D',

    background: '#2c3748',
    border: '#182230',
    screenBackground: '#182230',
  },
};

export default function AmityUiKitProvider({
  userId,
  displayName,
  apiKey,
  apiRegion,
  apiEndpoint,
  children,
  theme,
  darkMode = false,
}: IAmityUIkitProvider) {
  const customizedTheme: MyMD3Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: theme?.primary ?? '#1054DE',
      secondary: theme?.secondary ?? '#EBECEF',
      background: theme?.background ?? '#FFFFFF',
      border: theme?.border ?? '#EBECEF',
      base: theme?.base ?? '#292B32',
      baseShade1: theme?.baseShade1 ?? '#636878',
      baseShade2: theme?.baseShade2 ?? '#898E9E',
      baseShade3: theme?.baseShade3 ?? '#A5A9B5',
      screenBackground: theme?.screenBackground ?? '#EBECEF',
    },
    ...proShopTheme,
  };

  const defaultDarkTheme: MyMD3Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...proShopTheme,
    },
  };

  return (
    <Provider store={store}>
      <AuthContextProvider
        userId={userId}
        displayName={displayName || userId}
        apiKey={apiKey}
        apiRegion={apiRegion}
        apiEndpoint={apiEndpoint}
      >
        <PaperProvider theme={darkMode ? defaultDarkTheme : customizedTheme}>
          {children}
        </PaperProvider>
      </AuthContextProvider>
    </Provider>
  );
}
