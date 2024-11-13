import React, { useRef, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  View,
  ImageBackground,
  Text,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import styles from "@/constants/styles/screens/ProfileScreen.styles";
import stylesModal from "@/constants/styles/components/Modal.style";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { Portal } from "@gorhom/portal";
import Feather from "@expo/vector-icons/Feather";
import ProfileHeader from "@/components/ProfileHeader";
import StatisticsSection from "@/components/StatisticsSection";
import AchievementsSection from "@/components/AchievementsSection";
import LogoutButton from "@/components/LogoutButton";
import LabeledTextInput from "@/components/LabeledTextInput";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { Link } from "expo-router";

const ExerciseScreen: React.FC = () => {
  const modalizeRef = useRef<Modalize>(null);
  const height = Dimensions.get("screen").height;
  const MODAL_HEIGHT = height - 130;
  const [emailAddress, setEmailAddress] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const pickImage = async () => {
    // Zapytaj o pozwolenie na dostęp do galerii
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={[styles.container, { height }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        enabled={Platform.OS === "ios"}
      >
        <ImageBackground
          source={require("@/assets/images/profile_background.png")}
          style={styles.backgroundImage}
          imageStyle={{ resizeMode: "cover" }}
        >
          <LogoutButton />
        </ImageBackground>

        <View style={styles.contentContainer}>
          <ProfileHeader onOpen={onOpen} />
          <StatisticsSection />
          <AchievementsSection />
        </View>

        <Portal>
          <Modalize
            modalHeight={MODAL_HEIGHT}
            snapPoint={MODAL_HEIGHT}
            velocity={0.8}
            dragToss={0.1}
            ref={modalizeRef}
            HeaderComponent={
              <View style={stylesModal.modalHeader}>
                <Pressable onPress={onClose}>
                  <Feather name="x" size={24} color="black" />
                </Pressable>
              </View>
            }
          >
            <View style={stylesModal.modalContent}>
              <View style={styles.inputGroupContainer}>
              <View style={styles.imagePickerContainer}>
                <Pressable onPress={pickImage} style={styles.imagePickerButton}>
                  <Text  style={styles.imagePickerButtonText}>Pick an image</Text>
                </Pressable>
                {image && <Image source={{ uri: image }} style={styles.image} />}
              </View>
              <LabeledTextInput
                label="Nickname"
                value={nickname}
                onChangeText={setNickname}
                placeholder="Enter your nickaname"
              />
              </View>
              
              <LabeledTextInput
                label="Email Address"
                value={emailAddress}
                onChangeText={setEmailAddress}
                placeholder="Enter your email"
              />
              <LabeledTextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
              />
            </View>
            <View style={styles.buttonsContainer}>
          <Link href="/sign-up" asChild>
            <TouchableOpacity style={styles.buttonSignUp}>
              <Text style={styles.buttonTextDark}>Sign up</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/sign-in" asChild>
            <TouchableOpacity style={styles.buttonSignIn}>
              <Text style={styles.buttonTextLight}>Sign in</Text>
            </TouchableOpacity>
          </Link>
        </View>
          </Modalize>
        </Portal>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default ExerciseScreen;
