import React from "react";
import { Image, View } from "react-native";
import styles from "@/constants/styles/components/Tweet.style";
import { TweetImageProps } from "@/utils/types";

const TweetImage = ({ url }: TweetImageProps) => (
  <View style={styles.imageWrapper}>
    <Image source={{ uri: url }} style={styles.image} />
  </View>
);

export default TweetImage;
