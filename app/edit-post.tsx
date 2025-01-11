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
import { Link, useRouter, useGlobalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import API_BASE_URL from "@/utils/config";

const EditPost: React.FC = () => {
  const router = useRouter();
  const { post: postParam } = useGlobalSearchParams();
  const post = postParam ? JSON.parse(postParam as string) : null;

  const [loading, setLoading] = useState(false);
  const height = Dimensions.get("screen").height;
  const [image, setImage] = useState<string | null>(post?.picture_url || null);
  const [description, setDescription] = useState<string>(
    post?.description || ""
  );

  const handleSubmit = async () => {
    if (!description.trim() || !image) {
      Alert.alert("Please provide a description and select an image.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/post/${post.id}/edit_description?description=${description}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error("Failed to update post. Please try again.");
      }

      router.push("/feed");
    } catch (error) {
      console.error(error);
      Alert.alert("An error occurred while updating the post.");
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
            <Text style={styles.newPostLabel}>Edit Post</Text>
          </View>

          <View style={styles.imagePickerContainer}>
            <Pressable style={styles.imagePickerButton}>
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

export default EditPost;
