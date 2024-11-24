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
import ConfirmationModal from "@/components/ConfirmationModal";
import AchievementsSection from "@/components/AchievementsSection";
import LogoutButton from "@/components/LogoutButton";
import LabeledTextInput from "@/components/LabeledTextInput";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { Link } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ExerciseScreen: React.FC = () => {
  const modalizeRef = useRef<Modalize>(null);
  const height = Dimensions.get("screen").height;
  const MODAL_HEIGHT = height - 130;
  const [emailAddress, setEmailAddress] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

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
        />
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default ExerciseScreen;
