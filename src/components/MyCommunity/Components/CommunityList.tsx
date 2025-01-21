import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import useImage from '../../../hooks/useImage';
import type { MyMD3Theme } from '../../../providers/amity-ui-kit-provider';
import {
  communityIcon,
  officialIcon,
  privateIcon,
} from '../../../svg/svg-xml-list';
import { useStyle } from '../styles';

interface ICommunityItems {
  communityId: string;
  avatarFileId: string;
  displayName: string;
  isPublic: boolean;
  isOfficial: boolean;
}

const CommunityList = ({
  item,
  onClickItem,
}: {
  item: ICommunityItems;
  onClickItem: (id: string, name: string) => void;
}) => {
  const theme = useTheme() as MyMD3Theme;
  const styles = useStyle();
  const avatarUrl = useImage({ fileId: item.avatarFileId });

  return (
    <TouchableOpacity
      onPress={() => onClickItem(item.communityId, item.displayName)}
      key={item.communityId}
      style={styles.itemContainer}
    >
      {item.avatarFileId ? (
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      ) : (
        <SvgXml
          style={styles.avatar}
          width={40}
          height={40}
          xml={communityIcon}
        />
      )}

      {item.isOfficial && (
        <View style={styles.isOfficialIcon}>
          <SvgXml
            width={24}
            height={24}
            xml={officialIcon(theme.colors.primary)}
          />
        </View>
      )}
      <View style={styles.textRow}>
        {!item.isPublic && (
          <SvgXml width={17} height={17} xml={privateIcon(theme.colors.base)} />
        )}
        <Text numberOfLines={1} style={styles.itemText}>
          {/* {getDisplayName({
            text: item.displayName,
            type: !item.isPublic ? PrivacyState.private : PrivacyState.public,
          })} */}

          {item.displayName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityList;
