import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  Dimensions,
  Pressable,
} from "react-native";
import Container from "@/components/Container";
import styles from "@/constants/styles/screens/NewPostScreen.styles";
import * as ImagePicker from "expo-image-picker";

const NewPost: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const height = Dimensions.get("screen").height;
  const [image, setImage] = useState<string | null>(null);

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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { height: height }]}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false}
    >
      <Container height={780} width={90}>
        <View style={styles.formContainer}>
          <View style={styles.imagePickerContainer}>
            <Pressable onPress={pickImage} style={styles.imagePickerButton}>
              {image ? (
                <Image source={{ uri: image }} style={styles.avatar} />
              ) : (
                <Image
                  source={require("@/assets/images/avatar_default.png")}
                  style={styles.avatar}
                />
              )}
            </Pressable>
            <Text style={styles.profileLabel}>Edit profile</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Description"
            secureTextEntry
          />

          <TouchableOpacity style={styles.continueButton} disabled={loading}>
            <Text style={styles.continueButtonText}>
              {loading ? "LOADING..." : "SAVE"}
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default NewPost;
