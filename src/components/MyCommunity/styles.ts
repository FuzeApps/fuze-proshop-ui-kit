import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import type { MyMD3Theme } from 'src/providers/amity-ui-kit-provider';

const AVATAR_DIAMETER = 72;

export const useStyle = () => {
  const theme = useTheme() as MyMD3Theme;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      paddingVertical: 16,
    },
    title: {
      fontSize: 17,
      fontWeight: '600',
      margin: 1,
      color: theme.colors.base,
    },
    scrollView: {
      paddingTop: 16,
      justifyContent: 'space-between',
      paddingStart: 16,
    },
    itemContainer: {
      alignItems: 'center',
      marginEnd: 16,
      width: AVATAR_DIAMETER,
    },
    avatar: {
      width: AVATAR_DIAMETER,
      height: AVATAR_DIAMETER,
      borderRadius: 1000,
    },
    itemText: {
      fontSize: 12,
      marginHorizontal: 3,
      color: theme.colors.base,
    },
    textRow: {
      marginTop: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingStart: 16,
    },
    arrowIcon: {
      marginRight: 16,
      display: 'flex',
    },
    seeAllBtn: {
      marginRight: 16,
    },
    seeAllIcon: {
      width: AVATAR_DIAMETER,
      height: AVATAR_DIAMETER,
      borderRadius: 1000,
      backgroundColor: theme.colors.baseShade1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    seeAllText: {
      fontSize: 13,
      marginTop: 6,
      color: theme.colors.base,
      textAlign: 'center',
    },
    isOfficialIcon: {
      position: 'absolute',
      bottom: 16,
      right: 0,
    },
  });

  return styles;
};
