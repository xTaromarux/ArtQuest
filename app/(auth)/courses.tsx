import { ActivityIndicator, Platform, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
// import WhiteBox from "@/components/WhiteBox";
// import Line from "@/components/Line";
// import Button from "@/components/Button";
import { Image } from "expo-image";
// import CompletionPercentage from "@/components/CompletionPercentage";
import { Link } from "expo-router";
import LogoutButton from "@/components/LogoutButton";
// import { useFetch } from "@/scripts/useFetch";

const user_id = "be72e28f-41af-4234-a112-0a0299ed7197";

export default function ExerciseTab() {
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

  return (
    <View style={styles.container}>
            <LogoutButton />

      <View style={{ flex: 2 }}>
        {/* <Text style={styles.title}>Hello, {user.name}</Text> */}
        {/* <Line />
        <WhiteBox widthProp={70} padingProp={20} marginVerticalProp={20} /> */}
      </View>
      <View style={{ flex: 4 }}>
        <Text style={[styles.titleLastCourse, { flex: 0.6 }]}>
          Pick up where you left off
        </Text>
        <View
          style={[
            styles.containerLastCourse,
            { flex: 5, backgroundColor: "white" },
          ]}
        >
          <View
            style={[
              styles.containerImage,
              { flex: 2.5, backgroundColor: "white" },
            ]}
          >
            <Image
              source={API_VALUE + "/api/pictures/461fe346-4565-467a-82b2-e089f5a386dc"}
              style={styles.image}
            />
          </View>
          <View style={[styles.containerLevel, { flex: 0.7 }]}>
            <Text style={[styles.titleLevel, { flex: 0.6 }]}>Level 1</Text>
          </View>
          <View style={[styles.containerTitle, { flex: 0.6 }]}>
            <Text style={[styles.titleTitle, { flex: 0.6 }]}>Basic Shapes</Text>
          </View>
          <View style={[styles.containerPercentage, { flex: 0.5 }]}>
            {/* <CompletionPercentage widthProp={40} /> */}
          </View>
          <View style={[styles.containerContinue, { flex: 1 }]}>
            <Link href={{ pathname: "/exercise" } as never} asChild>
              {/* <Button
                onPress={() => {}}
                title="Continue"
                height={44}
                textColor="#FFFFFF"
                color="#000000"
                onLongPress={() => {
                  // Handle button long-press event
                }}
                accessibilityLabel="Continue"
              /> */}
            </Link>
          </View>
        </View>
      </View>
      <View style={[styles.containerInspiration, { flex: 0.8 }]}>
        <Link href={{ pathname: "/feed" } as never} asChild>
          {/* <Button
            onPress={() => {}}
            title="Look for inspiration"
            color="#FFFFFF"
            textColor="#000"
            height={50}
            onLongPress={() => {
              // Handle button long-press event
            }}
            accessibilityLabel="Look for inspiration"
          /> */}
        </Link>
      </View>
      {/* <Line /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    marginVertical: 20,
    fontWeight: "bold",
  },
  titleLastCourse: {
    fontSize: 22,
    marginVertical: 10,
    fontWeight: "bold",
  },
  containerLastCourse: {
    borderRadius: 20,
    padding: 20,
  },
  containerImage: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  containerLevel: {
    backgroundColor: "white",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  titleLevel: {
    fontSize: 15,
    color: "#FFD500",
    fontWeight: "bold",
  },
  containerTitle: {
    backgroundColor: "white",
  },
  titleTitle: {
    color: "#000",
    fontSize: 22,
    fontWeight: "bold",
  },
  containerPercentage: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  containerContinue: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  containerInspiration: {
    alignItems: "center",
    justifyContent: "center",
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
});
