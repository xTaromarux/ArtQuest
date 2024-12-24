import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator, Text, StyleProp, ImageStyle } from "react-native";

interface CustomImageProps {
  url: string;
  style?: StyleProp<ImageStyle>; 
}

const CustomImage: React.FC<CustomImageProps> = ({ url, style }) => {
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
          setImageData(reader.result as string);
          setLoading(false);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error loading image:", error);
        setLoading(false);
      }
    };

    fetchImage();
  }, [url]);

  if (loading) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  return imageData ? (
    <Image source={{ uri: imageData }} style={style} />
  ) : (
    <View>
      <Text>Error loading image</Text>
    </View>
  );
};

export default CustomImage;
