import React, { useState, useCallback } from "react";
import { Image, StyleSheet, Pressable, Platform } from "react-native";
import { Text, View } from "./Themed";
import { Entypo } from "@expo/vector-icons";
// import { useDelete } from "@/scripts/useFetch";
import { useRouter } from "expo-router";
import IconButton from "./IconButton";
import ConfirmationModal from "./ConfirmationModal";
import Menu, { MenuItem } from "./PopupMenu";
import { TweetType } from "@/utils/types";

type TweetProp = {
  tweet: TweetType;
  onDelete: () => void;
};

const user_id = "be72e28f-41af-4234-a112-0a0299ed7197"; // Replace with the actual user ID

const Tweet = ({ tweet, onDelete }: TweetProp) => {
  const [modalVisible, setModalVisible] = useState(false);
  // const { deleteData, loading, error } = useDelete(`/api/posts/${tweet.id}`);
  const base_url = "https://bce9-178-43-255-119.ngrok-free.app";
  const web_url = "http://localhost:8000";
  const API_VALUE = Platform.OS === 'web' ? web_url : base_url;
  const avatarUrl = API_VALUE + "/api" + tweet.user.avatar_url;
  const imageUrl = API_VALUE + "/api" + tweet.image_url;

  const router = useRouter();

  const handleDelete = () => {
    setModalVisible(true);
  };

  // const handleConfirmDelete = useCallback(async () => {
  //   try {
  //     await deleteData();
  //     onDelete();
  //   } catch (err) {
  //     console.error("Failed to delete the post:", err);
  //   } finally {
  //     setModalVisible(false);
  //   }
  // }, [deleteData, onDelete]);

  const handleCancelDelete = () => {
    setModalVisible(false);
  };

  const handleEdit = () => {
    router.push({
      pathname: `/feed/tweet/${tweet.id}`,
      params: {
        post: JSON.stringify(tweet),
      }
    });
  };

  return (
    <>
      <Pressable style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: avatarUrl }} style={styles.userImage} />
        </View>
        <View style={styles.mainContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.name}>{tweet.user.name}</Text>
            <Text style={styles.username}>{tweet.user.name} · 2h</Text>
            <Menu
              style={styles.menu}
              key={tweet.id}
              trigger={
                <Entypo name="dots-three-horizontal" size={20} color="gray" />
              }
            >
              <MenuItem
                key={1}
                text={tweet.user.id == user_id ? "Edit" : ""}
                onPress={tweet.user.id == user_id ? handleEdit : ()=>{}}
              />
              <MenuItem key={2} text="Delete" onPress={handleDelete} />
            </Menu>
          </View>
          <Text style={styles.content}>{tweet.Description}</Text>
          {tweet.image_url && (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
          )}
          <View style={styles.footer}>
            <IconButton icon="comments" solid={false} color="gray" text={tweet.numberOfComments} />
            <IconButton icon="heart" solid={false} color="gray" text={tweet.numberOfLikes} />
            <IconButton icon="chart-line" solid={false} color="gray" text={tweet.impressions || 0} />
          </View>
        </View>
      </Pressable>
      <ConfirmationModal
        visible={modalVisible}
        onConfirm={()=>{}}
        onCancel={handleCancelDelete}
        message="Are you sure you want to delete this post?"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgrey",
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  mainContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: "600",
  },
  username: {
    color: "gray",
    marginLeft: 5,
  },
  menu:{
    marginLeft: "auto",
  },
  content: {
    lineHeight: 20,
    marginTop: 5,
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 1,
    marginVertical: 10,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  footer: {
    flexDirection: 'row',
    marginVertical: 3,
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
});

export default Tweet;
