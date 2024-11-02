// import React, { useState } from "react";
// import { Link, useRouter } from "expo-router";
// import {
//   TextInput,
//   Pressable,
//   SafeAreaView,
//   ActivityIndicator,
//   Text,
//   View,
//   StyleSheet,
//   Platform,
// } from "react-native";
// import Line from "@/components/Line";
// import { Image } from "expo-image";
// import WhiteBox from "@/components/WhiteBox";
// import ExitLessonButton from "@/components/ExitLessonButton";
// import SendTweetButton from "@/components/SendTweetButton";
// import { useFetch, usePost } from "@/scripts/useFetch";

// const user_id = "be72e28f-41af-4234-a112-0a0299ed7197"; // Replace with the actual user ID

// export default function NewTweet() {
//   const base_url = "https://bce9-178-43-255-119.ngrok-free.app";
//   const web_url = "http://localhost:8000";
//   const API_VALUE = Platform.OS === "web" ? web_url : base_url;
//   const [text, setText] = useState("");
//   const router = useRouter();
//   const {
//     data: user,
//     loading: userLoading,
//     error: userError,
//   } = useFetch(`/api/users/${user_id}`);
//   const { postData, loading: postLoading, error: postError } = usePost(`/api/posts`);


//   const onTweetPress = async () => {
//     const formData = new FormData();
//     formData.append('title', 'New Tweet');
//     formData.append('description', text);
//     formData.append('user_id', user_id);

//     try {
//       await postData(formData);
//       console.warn("Posting the tweet: ", text);
//       setText("");
//       router.back();
//     } catch (err) {
//       console.error("Failed to post the tweet:", err);
//     }
//   };

//   if (userLoading) {
//     return (
//       <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#FFFFFF" />
//       </SafeAreaView>
//     );
//   }

//   if (userError) {
//     return (
//       <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Error: {userError}</Text>
//       </SafeAreaView>
//     );
//   }

//   const avatarUrl = API_VALUE + "/api/users/" + user_id + "/avatar";

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.page}>
//         <View style={styles.headerContainer}>
//           <View style={styles.closeButtonContainer}>
//             <Link href={{ pathname: "../" } as never} asChild>
//               <ExitLessonButton
//                 iconName={"x"}
//                 onPress={undefined}
//                 onLongPress={undefined}
//                 disabled={undefined}
//                 activeOpacity={undefined}
//               />
//             </Link>
//           </View>
//           <View style={styles.middleContainer}></View>
//           <View style={styles.acceptbarContainer}>
//           <SendTweetButton
//               iconName={"paper-plane"}
//               onPress={onTweetPress}
//               onLongPress={undefined}
//               disabled={postLoading}
//               activeOpacity={undefined}
//             />
//           </View>
//         </View>
//         <View style={styles.mainContainer}>
//           <View style={styles.inputContainer}>
//             <Pressable style={styles.container}>
//               <Image source={{ uri: avatarUrl }} style={styles.userImage} />
//               <View style={styles.mainContainer}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "flex-start",
//                     alignSelf: "flex-start",
//                     paddingLeft: 5,
//                   }}
//                 >
//                   <Text style={styles.name}>{user?.name}</Text>
//                   <Text style={styles.username}>· {user?.login}</Text>
//                 </View>
//                 <TextInput
//                   value={text}
//                   onChangeText={setText}
//                   placeholder="What's happening?"
//                   multiline
//                   numberOfLines={5}
//                   style={styles.content}
//                 />
//               </View>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     width: "100%",
//     padding: 10,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     marginVertical: 10,
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   button: {
//     backgroundColor: "#1C9BF0",
//     padding: 10,
//     paddingHorizontal: 20,
//     borderRadius: 50,
//   },
//   buttonText: {
//     color: "white",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   inputContainer: {
//     width: "100%",
//     padding: 20,
//     flexDirection: "row",
//   },
//   page: {
//     backgroundColor: "transparent",
//     paddingHorizontal: 20,
//     paddingTop: 40,
//     flex: 1,
//   },
//   headerContainer: {
//     backgroundColor: "white",
//     marginBottom: 20,
//     height: 70,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 20,
//   },
//   closeButtonContainer: {
//     width: "20%",
//     justifyContent: "center",
//     borderTopLeftRadius: 20,
//     borderBottomLeftRadius: 20,
//     alignItems: "center",
//     height: "100%",
//   },
//   acceptbarContainer: {
//     width: "20%",
//     justifyContent: "center",
//     alignItems: "center",
//     borderTopRightRadius: 20,
//     borderBottomRightRadius: 20,
//     height: "100%",
//   },
//   middleContainer: {
//     width: "60%",
//     justifyContent: "center",
//     alignItems: "center",
//     borderTopRightRadius: 20,
//     borderBottomRightRadius: 20,
//     height: "100%",
//   },
//   mainContainer: {
//     backgroundColor: "white",
//     marginBottom: 20,
//     flex: 8,
//     borderRadius: 20,
//     flexDirection: "column",
//     flexWrap: "wrap",
//     alignItems: "center",
//     justifyContent: "flex-start",
//   },
//   containerImage: {
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 15,
//     borderColor: "black",
//     borderWidth: 2,
//     borderRadius: 20,
//   },
//   userImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//     backgroundColor: "white",
//   },
//   content: {
//     width: "100%",
//     lineHeight: 20,
//     margin: 5,
//   },
//   name: {
//     fontWeight: "600",
//   },
//   username: {
//     color: "gray",
//     marginLeft: 5,
//   },
// });
