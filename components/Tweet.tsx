import React, { useState, useCallback } from "react";
import { Image, StyleSheet, Pressable, Platform } from "react-native";
import { Text, View } from "./Themed";
import { Entypo } from "@expo/vector-icons";
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
  const base_url = "https://bce9-178-43-255-119.ngrok-free.app";
  const web_url = "http://localhost:8000";
  const API_VALUE = Platform.OS === "web" ? web_url : base_url;
  const avatarUrl = API_VALUE + "/api" + tweet.user.avatar_url;
  const imageUrl = API_VALUE + "/api" + tweet.image_url;

  const router = useRouter();

  const handleDelete = () => {
    setModalVisible(true);
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
  };

  const handleEdit = () => {
    router.push({
      pathname: `/(auth)/feed/tweet/${tweet.id}`,
      params: {
        post: JSON.stringify(tweet),
      },
    });
  };

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={{ uri: avatarUrl }} style={styles.userImage} />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{tweet.user.name}</Text>
            <Text style={styles.username}>@{tweet.user.login}</Text>
          </View>
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
              onPress={tweet.user.id == user_id ? handleEdit : () => {}}
            />
            <MenuItem key={2} text="Delete" onPress={handleDelete} />
          </Menu>
        </View>

        {/* Main Content */}
        {tweet.image_url && (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </View>
        )}

        {/* Description */}
        <Text style={styles.content}>{tweet.Description}</Text>

        {/* Footer */}
        <View style={styles.footer}>
          <IconButton
            icon="heart"
            solid={false}
            color="white"
            text={tweet.numberOfLikes || 0}
          />
        </View>
      </View>

      <ConfirmationModal
        visible={modalVisible}
        onConfirm={() => {}}
        onCancel={handleCancelDelete}
        message="Are you sure you want to delete this post?"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  username: {
    color: "gray",
  },
  menu: {
    marginLeft: "auto",
  },
  content: {
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 14,
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#333",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});

export default Tweet;
