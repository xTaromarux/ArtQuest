import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import Container from "@/components/Container";
import styles from "@/constants/styles/screens/NewPostScreen.styles";
import * as ImagePicker from "expo-image-picker";
import { Link, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import API_BASE_URL from "@/utils/config";
import useFetchUserId from "@/hooks/useFetchUserId";

const NewPost: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const height = Dimensions.get("screen").height;
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const router = useRouter();
  const { userId, loading: userLoading, error } = useFetchUserId();

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 17],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!description.trim() || !image) {
      Alert.alert("Please provide a description and select an image.");
      return;
    }

    if (!userId) return;

    setLoading(true);

    try {

      const formData = new FormData();
      formData.append("description", description);
      formData.append("reactions", "0");
      formData.append("user_id", userId);

      const filename = image.split("/").pop(); 
      const type = `image/jpg`; 
      formData.append("picture", {
        uri: image,
        name: filename,
        type,
      } as any);

      const response = await fetch(`${API_BASE_URL}/api/add_post`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error("Failed to save post. Please try again.");
      }

      router.push("/feed");
    } catch (error) {
      console.error(error);
      Alert.alert("An error occurred while saving the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.screen, { height: height }]}>
      <Container height={780} width={90}>
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Link href="/feed" asChild>
              <Pressable>
                <Feather name="x" size={24} color="black" />
              </Pressable>
            </Link>
          </View>
          <View style={styles.newPostLabelContainer}>
            <Text style={styles.newPostLabel}>New Post</Text>
          </View>

          <View style={styles.imagePickerContainer}>
            <Pressable onPress={pickImage} style={styles.imagePickerButton}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={styles.avatar}
                  resizeMode="contain"
                />
              ) : (
                <>
                  <View style={styles.importIcon}>
                    <FontAwesome name="download" size={24} color="black" />
                  </View>
                  <View style={styles.importImage}>
                    <Image
                      source={require("@/assets/images/noImage.png")}
                      style={styles.noImage}
                      resizeMode="contain"
                    />
                  </View>
                </>
              )}
            </Pressable>
          </View>

          <TextInput
            multiline
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          <TouchableOpacity
            style={styles.continueButton}
            disabled={loading}
            onPress={handleSubmit}
          >
            <Text style={styles.continueButtonText}>
              {loading ? "LOADING..." : "SAVE"}
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    </View>
  );
};

export default NewPost;
