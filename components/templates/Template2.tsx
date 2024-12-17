import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";

const Template2 = ({
  description,
  picture,
  handlePress
}: {
  description: string[];
  picture: any[];
  handlePress: any[];
}) => (
  <View style={styles.container}>
    {/* Pierwszy wiersz */}
    <View style={styles.row}>
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
    <View style={[styles.row, { flex: 1.5 }]}>
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
    <View style={[styles.row, { flex: 1 }]}>
      <Image
        source={picture[1]}
        style={[styles.image, { width: 200, height: 150 }]}
      />
    </View>

    {/* Szusty wiersz */}
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
});

export default Template2;
