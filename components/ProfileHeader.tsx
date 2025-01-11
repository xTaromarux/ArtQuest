import React from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import styles from "@/constants/styles/screens/ProfileScreen.styles";
import Line from "@/components/Line";

interface ProfileHeaderProps {
  onOpen: () => void;
  userData: {
    user_id: string;
    mail: string;
    picture_url?: string;
    login: string;
    user_name: string;
    created_date: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onOpen, userData }) => {
  // Funkcja do formatowania daty
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
      {/* Avatar użytkownika */}
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

      {/* Informacje o użytkowniku */}
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

        {/* Przycisk edycji profilu */}
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
