import React from "react";
import { View, Image, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TweetHeaderProps, TweetType } from "@/utils/types";
import styles from "@/constants/styles/components/Tweet.style";
import CustomImage from "./CustomImage";
import Menu, { MenuItem } from "./PopupMenu";

const TweetHeader = ({ tweet, onEdit, onDelete }: TweetHeaderProps) => (
  <View style={styles.header}>
    <View style={styles.userImageContainer}>
      {tweet.user_picture_url ? (
        <CustomImage url={tweet.user_picture_url} style={styles.userImage} />
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
      trigger={<Entypo name="dots-three-horizontal" size={20} color="gray" />}
    >
      <MenuItem key={1} text="Edit" onPress={onEdit} />
      <MenuItem key={2} text="Delete" onPress={onDelete} />
    </Menu>
  </View>
);

export default TweetHeader;
