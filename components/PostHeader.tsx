import React from "react";
import { Image, View } from "react-native";
import { Text } from "./Themed";
import { Entypo } from "@expo/vector-icons";
import Menu, { MenuItem } from "./PopupMenu";
import CustomImage from "./CustomImage";
import { TweetType } from "@/utils/types";
import styles from "@/constants/styles/components/Post.style";

type PostHeaderProps = {
  tweet: TweetType;
  onEdit: () => void;
  onDelete: () => void;
};

const PostHeader: React.FC<PostHeaderProps> = ({ tweet, onEdit, onDelete }) => (
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
      <MenuItem key="edit" text="Edit" onPress={onEdit} />
      <MenuItem key="delete" text="Delete" onPress={onDelete} />
    </Menu>
  </View>
);

export default PostHeader;
