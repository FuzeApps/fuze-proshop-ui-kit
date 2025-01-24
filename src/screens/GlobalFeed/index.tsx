import React, { useCallback, useRef, useState } from 'react';

// import { useTranslation } from 'react-i18next';

import { FlatList, View } from 'react-native';
import MyCommunity from '../../components/MyCommunity';
import PostList, { type IPost } from '../../components/Social/PostList';
import useAuth from '../../hooks/useAuth';
import {
  deletePostById,
  getGlobalFeed,
  type IGlobalFeedRes,
} from '../../providers/Social/feed-sdk';
import { useGetStyles } from './styles';

import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { amityUIKitTokens } from '../../enum';
import globalFeedSlice from '../../redux/slices/globalfeedSlice';
import { RootState } from '../../redux/store';
import { amityPostsFormatter } from '../../util/postDataFormatter';

export default function GlobalFeed() {
  const { postList } = useSelector((state: RootState) => state.globalFeed);
  const { updateGlobalFeed, deleteByPostId } = globalFeedSlice.actions;
  const dispatch = useDispatch(); // ()=> dispatch(updateGlobalFeed())
  const styles = useGetStyles();
  const { isConnected } = useAuth();
  const [postData, setPostData] = useState<IGlobalFeedRes>();
  const { data: posts = [], nextPage } = postData ?? {};
  const flatListRef = useRef(null);

  async function getGlobalFeedList(
    page: Amity.Page<number> = { after: 0, limit: 8 }
  ): Promise<void> {
    const feedObject = await getGlobalFeed(page);
    if (feedObject) {
      setPostData(feedObject);
    }
  }
  const handleLoadMore = () => {
    if (nextPage) {
      getGlobalFeedList(nextPage);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (isConnected) {
        getGlobalFeedList();
      }
    }, [isConnected])
  );

  const getPostList = useCallback(async () => {
    if (posts.length > 0) {
      const formattedPostList = await amityPostsFormatter(posts);
      dispatch(updateGlobalFeed(formattedPostList));
    }
  }, [dispatch, posts, updateGlobalFeed]);
  useFocusEffect(
    useCallback(() => {
      posts && getPostList();
    }, [getPostList, posts])
  );

  const onDeletePost = async (postId: string) => {
    const isDeleted = await deletePostById(postId);
    if (isDeleted) {
      dispatch(deleteByPostId({ postId }));
    }
  };
  const onPostChange = (post: IPost) => {
    console.log('post:', post);
  };

  return (
    <View style={styles.feedWrap}>
      <FlatList
        contentContainerStyle={{ paddingBottom: amityUIKitTokens.spacing.xl3 }}
        data={postList}
        renderItem={({ item, index }) => (
          <PostList
            onDelete={onDeletePost}
            postDetail={item}
            onChange={onPostChange}
            postIndex={index}
          />
        )}
        keyExtractor={(item) => item.postId.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        ref={flatListRef}
        ListHeaderComponent={<MyCommunity />}
        extraData={postList}
      />
    </View>
  );
}
