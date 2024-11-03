import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text, RefreshControl } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
// import { useFetch } from '@/scripts/useFetch';
import Tweet from '@/components/Tweet';
import Line from '@/components/Line';

const TabOneScreen: React.FC = () => {
  // const { data: initialTweets, loading: initialLoading, error: initialError, refetch } = useFetch('/api/tweets?skip=0&limit=10');
  // const [tweets, setTweets] = useState(initialTweets);
  // const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   if (!initialLoading) {
  //     setTweets(initialTweets);
  //   }
  // }, [initialTweets, initialLoading]);

  // const fetchTweets = useCallback(() => {
  //   setRefreshing(true);
  //   refetch().finally(() => {
  //     setRefreshing(false);
  //   });
  // }, [refetch]);

  // if (initialLoading) {
  //   return (
  //     <View style={styles.loaderContainer}>
  //       <ActivityIndicator size="large" color="#FFFFFF" />
  //     </View>
  //   );
  // }

  // if (initialError) {
  //   return (
  //     <View style={styles.loaderContainer}>
  //       <Text>Error: {initialError}</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.page}>
      {/* <FlatList
        data={tweets}
        style={{ backgroundColor: "#1F1F1F" }}
        renderItem={({ item }) => <Tweet tweet={item} onDelete={fetchTweets} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchTweets} />
        }
      /> */}
      <View style={styles.mainContainer}>
        <Line />
      </View>
      {/* <Link
        href={
          {
            pathname: "/new-tweet",
            params: { onPostAdded: fetchTweets },
          } as never
        }
        asChild
      >
        <Entypo
          name="plus"
          size={24}
          color="white"
          style={styles.floatingButton}
        />
      </Link> */}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 40
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
  },
  floatingButton: {
    backgroundColor: '#1C9BF0',
    borderRadius: 25,
    padding: 15,
    position: 'absolute',
    right: 15,
    bottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  mainContainer:{
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor:"transparent"
  }
});

export default TabOneScreen;
