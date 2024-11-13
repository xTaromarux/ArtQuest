
import React from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import styles from "@/constants/styles/screens/ProfileScreen.styles";
import Line from "@/components/Line";

const ProfileHeader: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Image
          source={require("@/assets/images/avatar_default.png")}
          style={styles.avatar}
        />
      </View>
      <View style={styles.userInfoContainer}>
        <View style={styles.userContainer}>
          <Text style={styles.userName}>User 123</Text>
          <Text style={styles.userHandle}>@User123</Text>
          <Text style={styles.joinDate}>Joined May 2021</Text>
        </View>
        <View style={styles.editProfileContainer}>
          <Pressable
            style={styles.editProfileButton}
            onPress={() => onOpen()}
          >
            <Text style={styles.editProfileButtonText}>Edit profile</Text>
          </Pressable>
        </View>
      </View>
      <Line width={100} />
    </View>
  );
};

export default ProfileHeader;