import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, {
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomTabIcon from "./BottomTabIcon";
import Line from "./Line";
import Colors from "@/constants/Colors";
import styles from "@/constants/styles/components/Menu.style";

const CustomBottomTab = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const TAB_BAR_WIDTH = width - 20;
  const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;

  const translateAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(TAB_WIDTH * state.index, {
            damping: 20,
            stiffness: 150,
          }),
        },
      ],
    };
  });

  return (
    <>
      <Line width={90} style={{ position: "absolute", bottom: 90}} />
      <View
        style={[
          styles.tabBarContainer,
          { width: TAB_BAR_WIDTH, bottom: insets.bottom },
        ]}
      >
        <Animated.View
          style={[
            styles.slidingTabContainer,
            { width: TAB_WIDTH },
            translateAnimation,
          ]}
        >
          <View style={styles.slidingTab} />
        </Animated.View>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, { merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <View style={styles.contentContainer}>
                <BottomTabIcon
                  route={route.name}
                  isFocused={isFocused}
                  color={isFocused ? Colors.dark.text : "white"}
                  size={24}
                />
                <Text
                  style={{
                    color: isFocused ? Colors.dark.text : "white",
                    fontSize: 12,
                  }}
                >
                  {options.title || route.name}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

export default CustomBottomTab;
