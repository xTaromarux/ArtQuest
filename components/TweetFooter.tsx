import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import IconButton from "@/components/IconButton"; // Zakładam, że masz taki komponent
import { TweetType } from "@/utils/types";

const TweetFooter: React.FC<{ tweet: TweetType }> = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(tweet.numberOfLikes || 0);

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev: number) => prev - 1);
    } else {
      setLikes((prev: number) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.content}>{tweet.Description}</Text>
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
