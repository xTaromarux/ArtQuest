import React, { useRef } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
  useWindowDimensions,
  View,
  ImageBackground,
} from "react-native";
import styles from "@/constants/styles/screens/ProfileScreen.styles";
import stylesModal from "@/constants/styles/components/Modal.style";
import LogoutButton from "@/components/LogoutButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { Portal } from "@gorhom/portal";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import Line from "@/components/Line";

const ExerciseScreen: React.FC = () => {
  const modalizeRef = useRef<Modalize>(null); // <- Problem
  const height = Dimensions.get("screen").height;
  const MODAL_HEIGHT = height - 170;
  const screenWidth = Dimensions.get("window").width;

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
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
          source={require("@/assets/images/profile_background.png")} // Poprawiona ścieżka obrazu
          style={[styles.profileHeaderBackground, { width: `100%` }]}
          imageStyle={{ resizeMode: "cover" }} // Opcjonalne dopasowanie obrazu
          />

        {/* Profile Header */}
        <View style={styles.contentContainer}>
          <View style={styles.profileHeader}>
            <Image
              source={{ uri: "@/assets/images/avatar-default.png" }}
              style={styles.avatar}
            />
            <Text style={styles.userName}>User 123</Text>
            <Text style={styles.userHandle}>@User123</Text>
            <Text style={styles.joinDate}>Joined May 2021</Text>
            <Link href="/home" asChild>
              <Pressable style={styles.editProfileButton}>
                <Text style={styles.editProfileButtonText}>Edit profile</Text>
              </Pressable>
            </Link>
            <Line width={100} />
          </View>

          {/* Statistics Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Statistics</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="fire" size={24} color="#333" />
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Day strike</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons
                  name="star-outline"
                  size={24}
                  color="#333"
                />
                <Text style={styles.statValue}>254</Text>
                <Text style={styles.statLabel}>Total exp</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons name="book" size={24} color="#333" />
                <Text style={styles.statValue}>2</Text>
                <Text style={styles.statLabel}>Drawn drawings</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialCommunityIcons
                  name="check-circle-outline"
                  size={24}
                  color="#333"
                />
                <Text style={styles.statValue}>10</Text>
                <Text style={styles.statLabel}>Lessons Done</Text>
              </View>
            </View>
          </View>
          {/* Achievements Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achievementsContainer}>
              {/* Achievements placeholders */}
              <View style={styles.achievementItem}>
                <MaterialCommunityIcons
                  name="trophy-outline"
                  size={50}
                  color="#A5A5A5"
                />
              </View>
              <View style={styles.achievementItem}>
                <MaterialCommunityIcons
                  name="medal-outline"
                  size={50}
                  color="#A5A5A5"
                />
              </View>
              <View style={styles.achievementItem}>
                <MaterialCommunityIcons
                  name="star-outline"
                  size={50}
                  color="#A5A5A5"
                />
              </View>
            </View>
          </View>
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
            <View style={stylesModal.modalContent}></View>
          </Modalize>
        </Portal>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export default ExerciseScreen;
