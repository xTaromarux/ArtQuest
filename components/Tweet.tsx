import React, { useState } from "react";
import {Pressable } from "react-native";
import { useRouter } from "expo-router";
import ConfirmationModal from "./ConfirmationModal";
import { TweetProp } from "@/utils/types";
import Colors from "@/constants/Colors";
import TweetFooter from "./TweetFooter";
import AntDesign from "@expo/vector-icons/AntDesign";
import API_BASE_URL from "@/utils/config";
import styles from "@/constants/styles/components/Tweet.style";
import TweetHeader from "./TweetHeader";
import TweetImage from "./TweetImage";

const Tweet = ({ tweet, onDelete }: TweetProp) => {
  const [modalVisible, setModalVisible] = useState(false);
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

  const handlePostPress = () => {
    router.push({
      pathname: `../../tweet/[id]`,
      params: {
        post_id: tweet.id,
        post: JSON.stringify(tweet),
      },
    });
  };
  
  const deletePost = async () => {
    try {
      console.log(tweet.id);
      
      const response = await fetch(`${API_BASE_URL}/api/post/${tweet.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      
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
      <Pressable style={styles.container} onPress={handlePostPress}>
        <TweetHeader
          tweet={tweet}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {tweet.picture_url && <TweetImage url={tweet.picture_url} />}
        <TweetFooter tweet={tweet} />
      </Pressable>

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

export default Tweet;
