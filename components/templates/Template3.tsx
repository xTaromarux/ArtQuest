import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Exercise } from "@/utils/types";

const Template3 = ({
  description,
  picture,
  handlePress
}: {
  description: string[];
  picture: any[];
  handlePress: () => Promise<void>;
}) => (
  <View style={styles.container}>
    {/* Pierwszy wiersz */}
    <View style={[styles.row, { flex: 0.8}]}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { fontSize: 20 }]}>{description[0]}</Text>
      </View>
    </View>

    {/* Drugi wiersz z dwiema kolumnami */}
    <View style={[styles.row, { flex: 0.5 }]}>
      <View
        style={[
          styles.textContainer,
          { position: "absolute", right: 0, top: 0, width: "70%" },
        ]}
      >
        <Text style={styles.text}>{description[1]}</Text>
        <View style={styles.iconContainer}>
          <Pressable onPress={() => {}}>
            <Feather name="info" size={20} color="black" />
          </Pressable>
        </View>
      </View>
    </View>

    {/* Trzeci wiersz z dwiema kolumnami */}
    <View style={[styles.row, { flex: 2, alignItems: 'flex-start' }]}>
      <Image
        source={picture[0]}
        style={[styles.image, { width: 200, height: 200 }]}
      />
    </View>

    {/* Czwarty wiersz z dwiema kolumnami */}
    <View style={[styles.row, { flex: 0.5 }]}>
      <View style={[styles.textContainer, { width: "100%" }]}>
        <Text style={styles.text}>{description[2]}</Text>
        <View style={styles.iconContainer}>
          <Pressable onPress={() => {}}>
            <Feather name="info" size={20} color="black" />
          </Pressable>
        </View>
      </View>
    </View>

    {/* Piąty wiersz */}
    <View style={[styles.row, { flex: 0.5 }]}>
      <TouchableOpacity  style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonTextDark}>Make picture</Text>
        <Feather name="camera" size={22} color={Colors.dark.tintDarkerGreen} style={{marginHorizontal: 10}} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  row: {
    flex: 1, // Wypełnia równą część wysokości
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  textContainer: {
    width: "80%",
  },
  text: {
    fontSize: 15,
    width: "100%",
    fontWeight: "bold",
  },
  iconContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  image: {
    width: "40%",
    height: "80%",
    resizeMode: "contain",
    margin: 10,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 8,
    borderRadius: 10,
    borderColor: Colors.dark.tintDarkerGreen,
    borderWidth: 3,
    alignItems: "center",
    height: 50,
  },
  buttonTextDark: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Template3;
