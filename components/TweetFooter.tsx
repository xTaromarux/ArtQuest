import React, { startTransition, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import IconButton from "@/components/IconButton"; // Zakładam, że masz taki komponent
import { TweetType } from "@/utils/types";
import API_BASE_URL from "@/utils/config";
import LogoutButton from "./LogoutButton";

const TweetFooter: React.FC<{ tweet: TweetType }> = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(tweet.reactions || 0);
  const [isUserAction, setIsUserAction] = useState(false);

  const handleLike = async () => {
    setIsUserAction(true);
    if (isLiked) {
      setLikes((prev: number) => prev - 1);
    } else {
      setLikes((prev: number) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const performEditReactions = async () => {
      if (isUserAction) { 
        await editReactions(likes);
        startTransition(() => {
          setIsUserAction(false);
        });
      }
    };
  
    performEditReactions();
  }, [likes]);
  

  const editReactions = async (likes: number) => {
    try {
      const data = {
        reactions: likes.toString(),
      };
      const formBody = new URLSearchParams(data).toString();
      console.log(data);

      const response = await fetch(
        `${API_BASE_URL}/api/posts/${tweet.id}/edit_reactions`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        }
      );
      console.log(response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error("Failed to edit post reactions. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.content}>{tweet.description}</Text>
      <IconButton
        icon="heart"
        solid={isLiked}
        color={isLiked ? "red" : "white"}
        text={likes}
        onPress={handleLike}
      />
    </View>
  );
};

export default TweetFooter;

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  content: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    marginRight: 10,
  },
});
