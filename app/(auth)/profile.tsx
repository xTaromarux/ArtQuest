import React, { useState } from 'react';
import EditScreenInfo from "@/components/EditScreenInfo";
import { StyleSheet, ActivityIndicator, Platform } from "react-native";
import { Text, View } from "@/components/Themed";
// import WhiteBox from "@/components/WhiteBox";
import { Image } from 'expo-image';
import Line from '@/components/Line';
// import { useFetch } from "@/scripts/useFetch";

const user_id = "be72e28f-41af-4234-a112-0a0299ed7197";

export default function TabTwoScreen() {
  // const { data: user, loading: userLoading, error: userError } = useFetch(`/api/users/${user_id}`);
  const base_url = "https://bce9-178-43-255-119.ngrok-free.app";
  const web_url = "http://localhost:8000";
  const API_VALUE = Platform.OS === "web" ? web_url : base_url;
  // if (userLoading) {
  //   return (
  //     <View style={styles.loaderContainer}>
  //       <ActivityIndicator size="large" color="#FFFFFF" />
  //     </View>
  //   );
  // }

  // if (userError) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text>Error: {userError}</Text>
  //     </View>
  //   );
  // }

  // if (!user) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <Text>No user data found.</Text>
  //     </View>
  //   );
  // }
  const avatarUrl = API_VALUE + "/api/users/" + user_id + "/avatar";


  return (
    <View style={styles.container}>
      <View style={{ flex: 1.9 }}>
        <View style={styles.backgroundContainer}>
          <Image 
            source={API_VALUE + "/api/pictures/e9dc3335-0f08-4275-949d-d848caecb192"}  
            style={[styles.backgroundImage]} />
          <View style={styles.imageContainer}>
            <Image 
              source={avatarUrl}  
              style={[styles.image]} />
          </View>
        </View>
        <View style={styles.descContainer}>
          <View style={styles.userNameContainer}>
            {/* <Text style={styles.userName}>{user.name}</Text> */}
          </View>
          <View style={styles.userTagContainer}>
            {/* <Text style={styles.userTag}>@{user.login}</Text> */}
          </View>
          <View style={styles.userDateContainer}>
            <Text style={styles.userDate}>Joined {new Date().toLocaleDateString()}</Text>
          </View>
          <Line />
        </View>
      </View>
      <View style={{ flex: 4, paddingHorizontal: 20 }}>
        <View style={{ flex: 1.4 }}>
          <Text style={styles.title}>Statistics</Text>
          {/* <WhiteBox widthProp={100} padingProp={20} marginVerticalProp={20} /> */}
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.title}>Achievements</Text>
          {/* <WhiteBox widthProp={100} padingProp={20} marginVerticalProp={20} /> */}
        </View>
        <Line />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backgroundContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "60%",
  },
  imageContainer: {
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderWidth: 3,
    paddingTop: 3,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 60,
    marginLeft: 20,
  },
  descContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  userNameContainer: {
    width: "100%",
    height: "32%",
    backgroundColor: "transparent",
    marginBottom: 3,
  },
  userTagContainer: {
    width: "100%",
    height: "32%",
    backgroundColor: "transparent",
  },
  userDateContainer: {
    width: "100%",
    height: "32%",
    backgroundColor: "transparent",
    marginBottom: 5,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userTag: {
    fontSize: 12,
    fontWeight: "bold",
  },
  userDate: {
    fontSize: 13,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  image: {
    width: 80,
    height: 80,
  },
});
