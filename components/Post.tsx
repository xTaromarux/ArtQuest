import React, { useState } from "react";
import { Image } from "react-native";
import { Text, View } from "./Themed";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ConfirmationModal from "./ConfirmationModal";
import Menu, { MenuItem } from "./PopupMenu";
import { TweetProp } from "@/utils/types";
import Colors from "@/constants/Colors";
import TweetFooter from "./TweetFooter";
import Line from "./Line";
import CustomImage from "./CustomImage";
import API_BASE_URL from "@/utils/config";
import styles from "@/constants/styles/components/Post.style";

const Post = ({ tweet, onDelete }: TweetProp) => {
  const [modalVisible, setModalVisible] = useState(false);
  const avatarUrl = tweet.picture_url;
  const imageUrl = tweet.picture_url;

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

  const deletePost = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/post/${tweet.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the post");
      }

      onDelete();
      setModalVisible(false);
      router.push("/feed"); 
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.userImageContainer}>
          {tweet.user_picture_url ? (
            <CustomImage
              url={tweet.user_picture_url}
              style={styles.userImage}
            />
          ) : (
            <Image
              source={require("@/assets/images/avatar_default.png")}
              style={styles.userImage}
            />
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{tweet.user_name}</Text>
          <Text>•</Text>
          <Text style={styles.username}>@{tweet.login}</Text>
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

      {tweet.picture_url && (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
      )}
      <TweetFooter tweet={tweet} />
      <Line
        width={100}
        backgroundColor={Colors.light.background}
        style={{ marginTop: 10, marginBottom: 20, opacity: 0.5 }}
      />

      <ConfirmationModal
        isVisible={modalVisible}
        onConfirm={deletePost} 
        onCancel={handleCancelDelete}
        title="Are you sure you want to delete this post?"
        IconComponent={AntDesign}
        iconName="exclamationcircleo"
        iconSize={40}
        iconColor={Colors.dark.background}
        acceptText="Delete"
      />
    </>
  );
};


export default Post;
