import React, { useState } from "react";
import { Image, StyleSheet, Pressable, Platform } from "react-native";
import { Text, View } from "./Themed";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ConfirmationModal from "./ConfirmationModal";
import Menu, { MenuItem } from "./PopupMenu";
import { TweetType } from "@/utils/types";
import Colors from "@/constants/Colors";
import TweetFooter from "./TweetFooter";
import AntDesign from "@expo/vector-icons/AntDesign";

type TweetProp = {
  tweet: TweetType;
  onDelete: () => void;
};

const user_id = "be72e28f-41af-4234-a112-0a0299ed7197";

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
      pathname: "/edit-post",
      params: {
        id: tweet.id,
        post: JSON.stringify(tweet),
      },
    });
  };

  const handlePostPress = () => {
    router.push({
      pathname: `../../tweet/[id]`,
      params: {
        id: tweet.id,
        post: JSON.stringify(tweet),
      },
    });
  };

  return (
    <>
      <Pressable style={styles.container} onPress={handlePostPress}>
        <View style={styles.header}>
          <View style={styles.userImageContainer}>
            <Image
              source={require("@/assets/images/avatar_default.png")}
              style={styles.userImage}
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{tweet.user.name}</Text>
            <Text>•</Text>
            <Text style={styles.username}>@{tweet.user.login}</Text>
          </View>
          <Menu
            style={styles.menu}
            key={tweet.id}
            trigger={
              <Entypo name="dots-three-horizontal" size={20} color="gray" />
            }
          >
            <MenuItem key={1} text="Edit" onPress={handleEdit} />
            <MenuItem key={2} text="Delete" onPress={handleDelete} />
          </Menu>
        </View>

        {tweet.image_url && (
          <View style={styles.imageWrapper}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
          </View>
        )}
        <TweetFooter tweet={tweet} />
      </Pressable>

      <ConfirmationModal
        isVisible={modalVisible}
        onConfirm={() => {}}
        onCancel={handleCancelDelete}
        title="Are you sure you want to delete this post?"
        IconComponent={AntDesign} 
        iconName="exclamationcircleo" 
        iconSize={40} 
        iconColor={Colors.dark.background} 
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    paddingTop: 10,
    margin: 20,
    borderRadius: 10,
    marginVertical: 8,
  },
  header: {
    backgroundColor: Colors.dark.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userImageContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.light.background,
    borderRadius: 100,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  userInfo: {
    backgroundColor: Colors.dark.background,
    flex: 1,
    flexDirection: "row",
  },
  name: {
    color: Colors.light.text,
    fontWeight: "bold",
    marginLeft: 20,
    marginRight: 10,
  },
  username: {
    color: "gray",
    marginLeft: 10,
  },
  menu: {
    marginLeft: "auto",
    borderRadius: 10,
  },
  content: {
    width: "100%",
    color: Colors.light.text,
    height: "100%",
    fontSize: 14,
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
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
    backgroundColor: Colors.dark.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});

export default Tweet;
