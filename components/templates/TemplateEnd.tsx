import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";

const TemplateEnd = ({
  description,
  picture,
}: {
  description: string[];
  picture: any[];
}) => (
  <View style={styles.container}>
    {/* Pierwszy wiersz */}
    <View style={[styles.row, { flex: 2 }]}>
      <Image
        source={picture[0]}
        style={[styles.image, { width: "90%", height: "90%" }]}
      />
    </View>

    {/* Drugi wiersz z dwiema kolumnami */}
    <View style={[styles.row, { flex: 0.6, flexDirection: "column" }]}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { fontSize: 28, paddingBottom: 10 }]}>
          {description[0]}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { fontWeight: "400" }]}>
          {description[1]}
        </Text>
      </View>
    </View>

    {/* Trzeci wiersz z dwiema kolumnami */}
    <View style={[styles.row, styles.rowSplit, { flex: 1 }]}>
      <View
        style={[
          styles.miniContainer,
          { backgroundColor: Colors.dark.tintDarkGreen },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: Colors.light.background, fontWeight: "500" },
          ]}
        >
          Total exp
        </Text>
        <View style={[styles.innerContainer]}>
          <MaterialCommunityIcons
            name="progress-star"
            size={24}
            color="black"
          />
          <Text style={[styles.smallText]}>40</Text>
        </View>
      </View>
      <View
        style={[
          styles.miniContainer,
          { backgroundColor: Colors.dark.tintDarkerGreen },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: Colors.light.background, fontWeight: "500" },
          ]}
        >
          Poits
        </Text>
        <View style={[styles.innerContainer]}>
          <Feather name="target" size={24} color="black" />
          <Text style={[styles.smallText]}>40</Text>
        </View>
      </View>
    </View>

    {/* Czwarty wiersz z dwiema kolumnami */}
    <View style={[styles.row, { flex: 0.5 }]}></View>
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
  rowSplit: {
    flexDirection: "row", // Dwie kolumny w jednym wierszu    
  },
  textContainer: {
    width: "80%",
  },
  text: {
    fontSize: 15,
    width: "100%",
    textAlign: "center",
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
  miniContainer: {
    width: "30%",
    height: "55%",
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 8,
    margin: 10
  },
  innerContainer: {
    width: "85%",
    height: "65%",
    marginTop: 3,
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row"
  },
  smallText: {
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 4,
    paddingBottom: 2
  }
});

export default TemplateEnd;
