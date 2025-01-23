import { CustomColors } from '~/providers/amity-ui-kit-provider';
const spacing = {
  /**
   * 2 pixels spacing
   */
  xxs1: 2,

  /**
   * 4 pixels spacing
   */
  xxs2: 4,

  /**
   * 8 pixels spacing
   */
  s1: 8,

  /**
   * 12 pixels spacing
   */
  s2: 12,

  /**
   * 16 pixels spacing
   */
  m1: 16,

  /**
   * 20 pixels spacing
   */
  m2: 20,

  /**
   * 24 pixels spacing
   */
  m3: 24,

  /**
   * 32 pixels spacing
   */
  l1: 32,

  /**
   * 40 pixels spacing
   */
  l2: 40,

  /**
   * 48 pixels spacing
   */
  l3: 48,

  /**
   * 56 pixels spacing
   */
  l4: 56,

  /**
   * 64 pixels spacing
   */
  xl1: 64,

  /**
   * 72 pixels spacing
   */
  xl2: 72,

  /**
   * 96 pixels spacing
   */
  xl3: 96,
};

const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
};

const colors: CustomColors = {
  /**
   * Primary colors
   */
  primary: '#118cf7',
  primaryShade1: '#0559A3',
  primaryShade2: '#033B6C',
  primaryShade3: '#021E36',
  primaryShade4: '#344054',

  /**
   * Secondary colors
   */
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
  alert: '#FA4D30',
};

export const amityUIKitTokens = {
  spacing,
  borderRadius,
  colors,
};
