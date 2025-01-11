import React from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import styles from "@/constants/styles/screens/ProfileScreen.styles";
import Line from "@/components/Line";
import { ProfileHeaderProps } from "@/utils/types";

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onOpen, userData }) => {
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Image
          source={
            userData.picture_url
              ? { uri: userData.picture_url }
              : require("@/assets/images/avatar_default.png")
          }
          style={styles.avatar}
        />
      </View>

      <View style={styles.userInfoContainer}>
        <View style={styles.userContainer}>
          <Text style={styles.userName}>
            {userData.user_name || "Unknown User"}
          </Text>
          <Text style={styles.userHandle}>
            @{userData.login || "unknown_username"}
          </Text>
          <Text style={styles.joinDate}>
            Joined{" "}
            {userData.created_date
              ? formatDate(userData.created_date)
              : "Unknown"}
          </Text>
        </View>

        <View style={styles.editProfileContainer}>
          <Pressable style={styles.editProfileButton} onPress={onOpen}>
            <Text style={styles.editProfileButtonText}>Edit profile</Text>
          </Pressable>
        </View>
      </View>
      <Line width={100} />
    </View>
  );
};

export default ProfileHeader;
