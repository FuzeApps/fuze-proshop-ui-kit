import { CommunityRepository } from '@amityco/ts-sdk-react-native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import type { MyMD3Theme } from 'src/providers/amity-ui-kit-provider';
import CloseButton from '../../components/BackButton';
import { arrowOutlined, members } from '../../svg/svg-xml-list';
import { useGetStyles } from './styles';

interface ChatDetailProps {
  navigation: any;
  route: any;
}

export const CommunitySetting: React.FC<ChatDetailProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme() as MyMD3Theme;
  const styles = useGetStyles();
  const { communityId, communityName } = route.params;
  React.useLayoutEffect(() => {
    // Set the headerRight component to a TouchableOpacity
    navigation.setOptions({
      headerLeft: () => <CloseButton />,
      title: communityName,
    });
  }, []);
  const handleMembersPress = () => {
    navigation.navigate('CommunityMemberDetail', {
      communityId: communityId,
    });
  };
  const handleLeaveCommunityPress = async () => {
    const hasLeft = await CommunityRepository.leaveCommunity(communityId);
    if (hasLeft) {
      navigation.goBack();
    }
  };

  const renderItem = ({ item }: any) => {
    switch (item.id) {
      case 1:
        return (
          <TouchableOpacity
            style={styles.rowContainer}
            onPress={handleMembersPress}
          >
            <View style={styles.iconContainer}>
              <SvgXml xml={members()} width={24} />
            </View>
            <Text style={styles.rowText}>Members</Text>
            <SvgXml xml={arrowOutlined(theme.colors.base)} width={24} />
          </TouchableOpacity>
        );
      case 2:
        return (
          <TouchableOpacity
            style={styles.rowContainer}
            onPress={handleLeaveCommunityPress}
          >
            <View style={styles.leaveChatContainer}>
              <Text style={styles.leaveChatLabel}>Leave Community</Text>
            </View>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  const data = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
