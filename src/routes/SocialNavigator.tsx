/* eslint-disable react/no-unstable-nested-components */
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import BackButton from '../components/BackButton';
import CloseButton from '../components/CloseButton';
import useAuth from '../hooks/useAuth';
import type { MyMD3Theme } from '../providers/amity-ui-kit-provider';
import { useStyles } from '../routes/style';
import AllMyCommunity from '../screens/AllMyCommunity';
import CategoryList from '../screens/CategorytList';
import CommunityHome from '../screens/CommunityHome/index';
import CommunityList from '../screens/CommunityList';
import CommunityMemberDetail from '../screens/CommunityMemberDetail/CommunityMemberDetail';
import CommunitySearch from '../screens/CommunitySearch';
import { CommunitySetting } from '../screens/CommunitySetting/index';
import CreateCommunity from '../screens/CreateCommunity';
import CreatePost from '../screens/CreatePost';
import EditCommunity from '../screens/EditCommunity/EditCommunity';
import { EditProfile } from '../screens/EditProfile/EditProfile';
import Explore from '../screens/Explore';
import Home from '../screens/Home';
import PendingPosts from '../screens/PendingPosts';
import PostDetail from '../screens/PostDetail';
import UserProfile from '../screens/UserProfile/UserProfile';
import UserProfileSetting from '../screens/UserProfileSetting/UserProfileSetting';
import { closeIcon, kebabMenu, searchIcon } from '../svg/svg-xml-list';
import type { RootStackParamList } from './RouteParamList';

export default function SocialNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { isConnected } = useAuth();
  const theme = useTheme() as MyMD3Theme;
  // const renderPostDeatil = () => {
  //   return <PostDetail />;
  // };
  const onClickSearch = (navigation: NativeStackNavigationProp<any>) => {
    navigation.navigate('CommunitySearch');
  };
  const styles = useStyles();
  return (
    <NavigationContainer independent={true}>
      {isConnected && (
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: theme.colors.background,
            },
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTitleStyle: {
              color: theme.colors.base,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => onClickSearch(navigation)}
                  style={styles.btnWrap}
                >
                  <SvgXml
                    xml={searchIcon(theme.colors.base)}
                    width="25"
                    height="25"
                  />
                </TouchableOpacity>
              ),
              headerTitle: 'Clubhouse',
            })}
          />
          {/* <Stack.Screen name="Community" component={Home} /> */}
          <Stack.Screen name="Explore" component={Explore} />
          <Stack.Screen name="PostDetail" component={PostDetail} />
          <Stack.Screen
            name="CategoryList"
            component={CategoryList}
            options={({}) => ({
              title: 'Category',
            })}
          />
          <Stack.Screen
            name="CommunityHome"
            component={CommunityHome}
            options={({
              navigation,
              route: {
                params: { communityName, communityId },
              },
            }: any) => ({
              headerLeft: () => <BackButton />,
              title: communityName,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    // Handle button press here
                    navigation.navigate('CommunitySetting', {
                      communityId: communityId,
                      communityName: communityName,
                    });
                  }}
                >
                  <SvgXml xml={kebabMenu()} />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="PendingPosts" component={PendingPosts} />
          <Stack.Screen
            name="CommunitySearch"
            component={CommunitySearch}
            options={{
              headerShown: false, // Remove the back button
            }}
          />
          <Stack.Screen
            name="CommunityMemberDetail"
            component={CommunityMemberDetail}
          />
          <Stack.Screen name="CommunitySetting" component={CommunitySetting} />
          <Stack.Screen name="CreateCommunity" component={CreateCommunity} />
          <Stack.Screen name="CommunityList" component={CommunityList} />
          <Stack.Screen
            name="AllMyCommunity"
            component={AllMyCommunity}
            options={({
              navigation,
            }: {
              navigation: NativeStackNavigationProp<any>;
            }) => ({
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  style={styles.btnWrap}
                >
                  <SvgXml
                    xml={closeIcon(theme.colors.base)}
                    width="15"
                    height="15"
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="CreatePost"
            component={CreatePost}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
              title: '',
              headerLeft: () => <BackButton />,
            }}
          />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen
            name="EditCommunity"
            component={EditCommunity}
            options={({
              navigation,
            }: {
              navigation: NativeStackNavigationProp<any>;
            }) => ({
              headerLeft: () => <CloseButton navigation={navigation} />,
              title: 'Edit Profile',
              headerTitleAlign: 'center',
            })}
          />
          <Stack.Screen
            name="UserProfileSetting"
            component={UserProfileSetting}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
