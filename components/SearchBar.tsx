import React from "react";
import { View, TextInput } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import styles from "@/constants/styles/components/SearchBar.style";
import { SearchBarProps } from "@/utils/types";

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  style,
}) => {
  return (
    <View style={[styles.searchContainer, style]}>
      <TextInput
        selectionColor="transparent"
        underlineColorAndroid="transparent"
        value={value}
        onChangeText={onChangeText}
        placeholder="Search"
        style={styles.searchInput}
        placeholderTextColor="#666"
      />
      <AntDesign
        name="search1"
        size={24}
        color="black"
        style={styles.searchIcon}
      />
    </View>
  );
};

export default SearchBar;
