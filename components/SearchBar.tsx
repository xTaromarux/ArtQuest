import React from "react";
import { View, TextInput } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import styles from "@/constants/styles/components/SearchBar.style";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.searchContainer}>
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