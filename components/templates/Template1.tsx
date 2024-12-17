import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";

const Template1 = ({
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
    <View style={[styles.row, styles.rowSplit]}>
      <Image source={picture[0]} style={styles.image} />
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
    <View style={[styles.row, styles.rowSplit]}>
      <Image source={picture[1]} style={styles.image} />
      <Image source={picture[2]} style={styles.image} />
    </View>

    {/* Czwarty wiersz z dwiema kolumnami */}
    <View style={[styles.row, styles.rowSplit]}>
      <Image source={picture[3]} style={styles.image} />
      <Image source={picture[4]} style={styles.image} />
    </View>

    {/* Piąty wiersz */}
    <View style={styles.row}>
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

const styles= StyleSheet.create({
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
      rowSplit: {
        flexDirection: "row", // Dwie kolumny w jednym wierszu
        justifyContent: "space-between",
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

export default Template1;
