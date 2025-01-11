import React, { startTransition, useEffect, useState } from "react";
import { View, Image, ActivityIndicator, Text, StyleProp, ImageStyle, ImageResizeMode } from "react-native";

interface CustomImageProps {
  url: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode; // Dodanie resizeMode jako opcji
}

const CustomImage: React.FC<CustomImageProps> = ({ url, style, resizeMode = "cover" }) => {
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "User-Agent": "CustomAgent",
          },
        });

        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          startTransition(() => {
            setImageData(reader.result as string);
          });
          startTransition(() => {
            setLoading(false);
          });
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error loading image:", error);
        startTransition(() => {
          setLoading(false);
        });
      }
    };

    fetchImage();
  }, [url]);

  if (loading) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  return imageData ? (
    <Image 
      source={{ uri: imageData }} 
      style={[{ resizeMode }, style]} // Dodanie resizeMode do stylu
    />
  ) : (
    <View>
      <Text>Error loading image</Text>
    </View>
  );
};

export default CustomImage;
