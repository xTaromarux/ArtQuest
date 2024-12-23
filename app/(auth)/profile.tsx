import React, { useEffect, useRef, useState } from "react";
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
import ConfirmationModal from "@/components/ConfirmationModal";
import AchievementsSection from "@/components/AchievementsSection";
import LogoutButton from "@/components/LogoutButton";
import LabeledTextInput from "@/components/LabeledTextInput";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import API_BASE_URL from "@/utils/config";

const ExerciseScreen: React.FC = () => {
  const modalizeRef = useRef<Modalize>(null);
  const height = Dimensions.get("screen").height;
  const MODAL_HEIGHT = height - 130;

  const [emailAddress, setEmailAddress] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/user/0f41b706-85a8-4457-8046-132f5505b47d/details`, {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "User-Agent": "CustomAgent",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const onCloseAndSave = () => {
    modalizeRef.current?.close();
  };

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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
    toggleModal();
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text>No profile data available</Text>
      </View>
    );
  }

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
          <ProfileHeader onOpen={onOpen} userData={profileData.user} />
          <StatisticsSection statistics={profileData.statistics} />
          <AchievementsSection achievements={profileData.achievements} />
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
                  <Pressable
                    onPress={pickImage}
                    style={styles.imagePickerButton}
                  >
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
                <LabeledTextInput
                  label="Nickname"
                  style={{ marginLeft: 20, bottom: 15 }}
                  value={nickname}
                  onChangeText={setNickname}
                  placeholder="Enter your nickname"
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

              <TouchableOpacity
                style={styles.buttonDelete}
                onPress={toggleModal}
              >
                <Text style={styles.buttonTextLight}>Delete account</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSave}
                onPress={onCloseAndSave}
              >
                <Text style={styles.buttonTextDark}>Save</Text>
              </TouchableOpacity>
            </View>
          </Modalize>
        </Portal>

        <ConfirmationModal
          isVisible={isModalVisible}
          title="Are you sure you want to delete your account?"
          onConfirm={handleDeleteAccount}
          onCancel={toggleModal}
          IconComponent={MaterialCommunityIcons}
          iconName="emoticon-sad-outline"
          iconSize={50}
          iconColor="black"
          acceptText="Delete"
        />
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default ExerciseScreen;
