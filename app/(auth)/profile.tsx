import React, { startTransition, useEffect, useRef, useState } from "react";
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
  ActivityIndicator,
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
import { useUser } from "@clerk/clerk-expo";
import { Achievement, ProfileData } from "@/utils/types";
import { useRedirect } from "../_layout";
import useFetchUserId from "@/hooks/useFetchUserId";
import CustomImage from "@/components/CustomImage";
import Colors from "@/constants/Colors";

const ExerciseScreen: React.FC = () => {
  const { setHasRedirected } = useRedirect();
  const modalizeRef = useRef<Modalize>(null);
  const height = Dimensions.get("screen").height;
  const MODAL_HEIGHT = height - 130;
  const { user } = useUser();
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [dataUpdated, setDataUpdated] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAchievements, setLoadingAchievements] = useState<boolean>(true);
  const { userId, loading: userLoading, error: userError } = useFetchUserId();
  const [modalUserData, setModalUserData] = useState({
    email: "",
    nickname: "",
    pictureUrl: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) return;
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/user/${userId}/details`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "User-Agent": "CustomAgent",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data: ProfileData = await response.json();
        startTransition(() => {
          setProfileData(data);
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        startTransition(() => {
          setLoading(false);
        });
      }
    };

    fetchProfileData();
  }, [userId, dataUpdated]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/achievements`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "User-Agent": "CustomAgent",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch achievements");
        }
        const data: Achievement[] = await response.json();
        startTransition(() => {
          setAchievements(data);
        });
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        startTransition(() => {
          setLoadingAchievements(false);
        });
      }
    };

    fetchAchievements();
  }, []);

  const updateUserPassword = async (newPassword: string) => {
    try {
      await user?.updatePassword({ newPassword });
    } catch (error) {
      console.error("Error updating password:", error);
      Alert.alert("Error", "Failed to update password. Please try again.");
    }
  };

  const onOpen = () => {
    if (profileData?.user) {
      setModalUserData({
        email: profileData.user.mail || "",
        nickname: profileData.user.user_name || "",
        pictureUrl: profileData.user.picture_url || "",
      });
    }
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const onSave = async () => {
    let hasProfileChanges = false;
    let hasPasswordChanged = false;

    if (
      modalUserData.nickname !== profileData?.user.user_name ||
      modalUserData.email !== profileData?.user.mail ||
      modalUserData.pictureUrl !== image
    ) {
      hasProfileChanges = true;
    }

    if (password.trim() !== "") {
      hasPasswordChanged = true;
    }

    try {
      if (hasProfileChanges && profileData) {
        const formData = new FormData();
        if (image) {
          const filename = image.split("/").pop();
          const type = `image/jpg`;
          formData.append("picture", {
            uri: image,
            name: filename,
            type,
          } as any);
        }

        const response = await fetch(
          `${API_BASE_URL}/api/user/update/${userId}?mail=${modalUserData.email}&user_name=${modalUserData.nickname}`,
          {
            method: "PUT",
            headers: {
              "ngrok-skip-browser-warning": "true",
              "User-Agent": "CustomAgent",
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update profile data");
        }
        setDataUpdated((prev) => !prev);
        setModalUserData((prev) => ({
          ...prev,
          pictureUrl: image ? image : "",
        }));

        setProfileData((prev) =>
          prev
            ? {
                ...prev,
                user: {
                  ...prev.user,
                  mail: modalUserData.email,
                  user_name: modalUserData.nickname,
                  picture_url: image ? image : "",
                },
              }
            : null
        );
      }

      if (hasPasswordChanged) {
        await updateUserPassword(password);
      }

      setPassword("");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
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
      aspect: [16, 17],
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
    toggleModal();
  };

  if (userError) {
    return (
      <KeyboardAvoidingView
        style={[
          styles.container,
          { height: height, justifyContent: "center", alignItems: "center" },
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        enabled={Platform.OS === "ios"}
      >
        <Text>Error: {userError}</Text>
      </KeyboardAvoidingView>
    );
  }

  if (userLoading || loading || loadingAchievements) {
    return (
      <KeyboardAvoidingView
        style={[
          styles.container,
          { height: height, justifyContent: "center", alignItems: "center" },
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        enabled={Platform.OS === "ios"}
      >
        <ActivityIndicator size="large" color={Colors.dark.tintDarkerGreen} />
      </KeyboardAvoidingView>
    );
  }

  if (!profileData) {
    return (
      <KeyboardAvoidingView
        style={[
          styles.container,
          { height: height, justifyContent: "center", alignItems: "center" },
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        enabled={Platform.OS === "ios"}
      >
        <Text>No profile data available</Text>
      </KeyboardAvoidingView>
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
          <LogoutButton setHasRedirected={setHasRedirected} />
        </ImageBackground>

        <View style={styles.contentContainer}>
          <ProfileHeader onOpen={onOpen} userData={profileData.user} />
          <StatisticsSection statistics={profileData.statistics} />
          <AchievementsSection achievements={achievements} />
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
                    onPress={() => {
                      pickImage();
                    }}
                    style={styles.imagePickerButton}
                  >
                    {image || modalUserData.pictureUrl ? (
                      <CustomImage
                        url={image ? image : modalUserData.pictureUrl}
                        style={styles.avatar}
                      />
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
                  style={{ marginLeft: 20, bottom: 15, width: "70%" }}
                  value={modalUserData.nickname}
                  onChangeText={(text) => {
                    setModalUserData((prev) => ({ ...prev, nickname: text }));
                  }}
                  placeholder="Enter your nickname"
                />
              </View>

              <LabeledTextInput
                label="Email Address"
                value={modalUserData.email}
                onChangeText={(text) => {
                  setModalUserData((prev) => ({ ...prev, email: text }));
                }}
                placeholder="Enter your email"
              />

              <LabeledTextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                secureTextEntry
              />

              <TouchableOpacity
                style={styles.buttonDelete}
                onPress={toggleModal}
              >
                <Text style={styles.buttonTextLight}>Delete account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonSave} onPress={onSave}>
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
