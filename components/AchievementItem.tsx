import React, { useEffect, useState } from "react";
import { View, Text, ViewStyle } from "react-native";
import { Image } from "expo-image";
import styles from "@/constants/styles/screens/ProfileScreen.styles";
import CustomImage from "./CustomImage";
import API_BASE_URL from "@/utils/config";
import { Achievement } from "@/utils/types";

interface AchievementItemProps {
  source: any;
  style?: ViewStyle;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ source, style }) => {
  const [picture, setPicture] = useState<string>("");
  const [loadingPicture, setLoadingPicture] = useState<boolean>(true);
  

  useEffect(() => {
    const fetchPicture = async (source: any) => {   
      console.log(source.uri);
         
      try {
        const response = await fetch(`${API_BASE_URL}/api/picture/${source.uri}`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "User-Agent": "CustomAgent",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch picture");
        }
        console.log(response);
        const blob = await response.blob();

        // Konwersja blob do base64
        const reader = new FileReader();
        reader.onloadend = () => {
          setPicture(reader.result as string);
          setLoadingPicture(false);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error fetching picture:", error);
        setLoadingPicture(false);
      }
    };

    fetchPicture(source);
  }, [source]);


  if (loadingPicture) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log(loadingPicture);
  
  return (
    <View style={[styles.achievementItem, style]}>
      <CustomImage url={picture} style={styles.achievementIcon} />
    </View>
  );
};

export default AchievementItem;
