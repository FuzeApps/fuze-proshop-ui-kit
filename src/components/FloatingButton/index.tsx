import React from 'react';
import { Pressable, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { postIcon } from '../../svg/svg-xml-list';

import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MyMD3Theme } from '~/providers/amity-ui-kit-provider';

interface IBackBtn {
  onPress: () => any;
  isGlobalFeed?: boolean;
}

export const useFloatingButtonStyles = () => {
  const theme = useTheme() as MyMD3Theme;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 135,
      right: 10,
    },
    otherFeedContainer: {
      position: 'absolute',
      bottom: 35,
      right: 10,
    },
    button: {
      width: 64,
      height: 64,
      borderRadius: 35,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
    },
  });

  return styles;
};

export default function FloatingButton({
  onPress,
  isGlobalFeed = true,
}: IBackBtn) {
  const styles = useFloatingButtonStyles();
  const theme = useTheme() as MyMD3Theme;
  return (
    <View style={!isGlobalFeed ? styles.otherFeedContainer : styles.container}>
      <Pressable
        onPress={() => {
          onPress && onPress();
        }}
        style={styles.button}
      >
        <SvgXml xml={postIcon(theme.colors.base)} width="30" height="30" />
      </Pressable>
    </View>
  );
}
