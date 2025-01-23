import {
  CategoryRepository,
  CommunityRepository,
} from '@amityco/ts-sdk-react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { SocialPlusRoutes } from '../../enum';
import useAuth from '../../hooks/useAuth';
import { chevronRightIcon } from '../../svg/svg-xml-list';
import { useGetStyles } from './styles';

export default function Explore() {
  const styles = useGetStyles();
  const { apiRegion } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [recommendCommunityList, setRecommendCommunityList] = useState<
    Amity.Community[]
  >([]);
  const [trendingCommunityList, setTrendingCommunityList] = useState<
    Amity.Community[]
  >([]);
  const [categoryList, setCategoryList] = useState<Amity.Category[]>([]);

  const loadRecommendCommunities = () => {
    const unsubscribe = CommunityRepository.getRecommendedCommunities(
      { limit: 5 },
      ({ data: recommendCommunities }) =>
        setRecommendCommunityList(recommendCommunities)
    );
    unsubscribe();
  };

  const loadTrendingCommunities = async () => {
    const { data: communities } =
      await CommunityRepository.getTopTrendingCommunities();
    setTrendingCommunityList(communities);
  };
  const loadCategories = async () => {
    CategoryRepository.getCategories({}, ({ data: categories }) => {
      setCategoryList(categories);
    });
  };
  const handleCategoryListClick = () => {
    setTimeout(() => {
      navigation.navigate(SocialPlusRoutes.CategoryList);
    }, 100);
  };
  const handleCommunityClick = (communityId: string, communityName: string) => {
    setTimeout(() => {
      navigation.navigate(SocialPlusRoutes.CommunityHome, {
        communityId,
        communityName,
      });
    }, 100);
  };
  useEffect(() => {
    loadRecommendCommunities();
    loadTrendingCommunities();
    loadCategories();
  }, []);
  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    setTimeout(() => {
      navigation.navigate(SocialPlusRoutes.CommunityList, {
        categoryId,
        categoryName,
      });
    }, 100);
  };
  const categoryListComponent = () => {
    const categoryElements = [];
    const maxLength = categoryList.length > 8 ? 8 : categoryList.length;
    for (let index = 0; index < maxLength; index += 2) {
      categoryElements.push(
        <View style={styles.rowContainer} key={index}>
          <TouchableOpacity
            style={styles.column}
            onPress={() =>
              handleCategoryClick(
                categoryList[index]!.categoryId,
                categoryList[index]!.name
              )
            }
          >
            <Image
              style={styles.avatar}
              source={
                categoryList[index]?.avatarFileId
                  ? {
                      uri: `https://api.${apiRegion}.amity.co/api/v3/files/${categoryList[index]?.avatarFileId}/download`,
                    }
                  : require('../../../assets/icon/Placeholder.png')
              }
            />
            <Text style={styles.columnText}>{categoryList[index]?.name}</Text>
          </TouchableOpacity>
          {index + 1 < categoryList.length && (
            <TouchableOpacity
              style={styles.column}
              onPress={() =>
                handleCategoryClick(
                  categoryList[index + 1]!.categoryId,
                  categoryList[index + 1]!.name
                )
              }
            >
              <Image
                style={styles.avatar}
                source={
                  categoryList[index + 1]?.avatarFileId
                    ? {
                        uri: `https://api.${apiRegion}.amity.co/api/v3/files/${
                          categoryList[index + 1]?.avatarFileId
                        }/download`,
                      }
                    : require('../../../assets/icon/Placeholder.png')
                }
              />
              <Text style={styles.columnText}>
                {categoryList[index + 1]?.name}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
    return categoryElements;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.recommendContainer}>
        <Text style={styles.title}>Recommended for you</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recommendCommunityList.map((community) => (
            <TouchableOpacity
              style={styles.recommendedCard}
              key={community.communityId}
              onPress={() =>
                handleCommunityClick(
                  community.communityId,
                  community.displayName
                )
              }
            >
              {/* TODO: find a way to include higher resolution */}
              <Image
                style={styles.recommendedAvatar}
                source={{
                  uri: `https://api.${apiRegion}.amity.co/api/v3/files/${community.avatarFileId}/download`,
                }}
              />
              <View style={styles.cardBody}>
                <Text numberOfLines={2} style={styles.name}>
                  {community.displayName}
                </Text>
                <Text style={styles.recommendSubDetail}>
                  {community.membersCount} members
                </Text>
                <Text numberOfLines={3} style={styles.bio}>
                  {community.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.trendingContainer}>
        <Text style={styles.title}>Today's trending</Text>
        <View>
          {trendingCommunityList.map((community, index) => (
            <TouchableOpacity
              key={community.communityId}
              style={styles.itemContainer}
              onPress={() =>
                handleCommunityClick(
                  community.communityId,
                  community.displayName
                )
              }
            >
              <Image
                style={styles.avatar}
                source={
                  community.avatarFileId
                    ? {
                        uri: `https://api.${apiRegion}.amity.co/api/v3/files/${community.avatarFileId}/download`,
                      }
                    : require('../../../assets/icon/Placeholder.png')
                }
              />
              <View style={styles.trendingTextContainer}>
                <Text style={styles.number}>{index + 1}</Text>
                <View style={styles.memberContainer}>
                  <View style={styles.memberTextContainer}>
                    <Text style={styles.memberText}>
                      {community.displayName}
                    </Text>
                    <Text style={styles.memberCount}>
                      {community.membersCount} members
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.categoriesContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Categories</Text>
          <TouchableOpacity onPress={handleCategoryListClick}>
            <SvgXml xml={chevronRightIcon()} />
          </TouchableOpacity>
        </View>
        {categoryListComponent()}
      </View>
    </ScrollView>
  );
}
