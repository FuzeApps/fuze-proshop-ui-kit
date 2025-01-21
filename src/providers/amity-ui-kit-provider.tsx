import * as React from 'react';
import { Provider } from 'react-redux';
import AuthContextProvider from './auth-provider';
import { DefaultTheme, PaperProvider, type MD3Theme } from 'react-native-paper';
import { store } from '../redux/store';
import { amityUIKitTokens } from '../enum/tokens';
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

export interface CustomColors {
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
  alert?: string;
}
export interface MyMD3Theme extends MD3Theme {
  colors: MD3Theme['colors'] & CustomColors;
}

const proShopTheme: MyMD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...amityUIKitTokens.colors,
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
      ...proShopTheme.colors,
      ...theme,
    },
  };

  const defaultDarkTheme: MyMD3Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...proShopTheme.colors,
      ...theme,
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
