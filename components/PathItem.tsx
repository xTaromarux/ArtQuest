import React, { startTransition, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import { Exercise } from "@/utils/types";
import useFetchView from "@/hooks/useFetchView";
interface PathItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  exercise?: Exercise;
  userCourseId?: string;
  onClick?: () => void;
  index: number;
}

const PathItem: React.FC<PathItemProps> = ({
  icon,
  title,
  exercise,
  userCourseId,
  onClick,
  index,
}) => {
  const [clicked, setClicked] = useState(false);
  const platformTopOfTheTopPosition = useSharedValue({ top: -8, right: 9 });
  const [exerciseId, setExerciseId] = useState("");
  const {
    view,
    loading: viewLoading,
    error: viewError,
  } = useFetchView(exerciseId, index);
  useEffect(() => {
    const setExercise = async () => {
      startTransition(() => {
        setExerciseId(exercise?.id || "");
      });
    };

    setExercise();
  }, [exercise]);

  // Animation styles
  const platformTopOfTheTopStyle = useAnimatedStyle(() => ({
    top: withTiming(clicked ? 5 : platformTopOfTheTopPosition.value.top, {
      duration: 500,
    }),
    right: withTiming(clicked ? 5 : platformTopOfTheTopPosition.value.right, {
      duration: 500,
    }),
  }));

  const platformTopStyle = useAnimatedStyle(() => ({
    opacity: withTiming(clicked ? 0 : 1, { duration: 5 }),
  }));

  const platformTopSupportStyle = useAnimatedStyle(() => ({
    opacity: withTiming(clicked ? 0 : 1, { duration: 5 }),
  }));

  const handlePress = async (indexTmp: number) => {
    if (onClick) {
      await onClick();
    }

    while (!exercise || viewLoading) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    console.log(view);
    if (view && typeof view === "object") {
      const viewTmp: Exercise = {
        id: view.id || "",
        template: view.template || 0,
        next_view_id: view.next_view_id || null,
        previous_view_id: view.previous_view_id || null,
        ai_part: view.ai_part || false,
        descriptions: Array.isArray(view.descriptions) ? view.descriptions : [],
        short_descriptions: Array.isArray(view.short_descriptions)
          ? view.short_descriptions
          : [],
        picture_urls: Array.isArray(view.picture_urls) ? view.picture_urls : [],
        percentage: view.percentage || 0,
      };

      console.log(exercise);
      console.log("indexTmp");
      console.log(indexTmp);

      setClicked(true);
      router.push({
        pathname: `../../exercise/[id]`,
        params: {
          id: viewTmp.id,
          index: indexTmp,
          exercise: JSON.stringify(viewTmp),
          exerciseId: exercise?.id,
          userCourseId: userCourseId,
        },
      });
    } else {
      console.error("view is undefined or not a valid Exercise object:", view);
    }
  };

  if (viewLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Loading course details...</Text>
      </View>
    );
  }

  if (viewError) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text>Error: {viewError}</Text>
      </View>
    );
  }

  return (
    <Pressable
      onPress={() => {
        handlePress(index);
      }}
      style={styles.container}
    >
      {/* Icon at the top */}
      <MaterialCommunityIcons
        name={icon}
        size={60}
        color="#C4C4C4"
        style={{ marginBottom: 10 }}
      />

      {/* 3D-stacked platform */}
      <View style={styles.platformBase}>
        <View style={styles.platformBaseSupportLeft} />
        <View style={styles.platformBaseSupportRight} />
        <View style={styles.platformMiddle}>
          <Animated.View style={[styles.platformTop, platformTopStyle]}>
            <Animated.View
              style={[styles.platformTopSupportLeft, platformTopSupportStyle]}
            />
            <Animated.View
              style={[styles.platformTopSupportRight, platformTopSupportStyle]}
            />
            <Animated.View
              style={[styles.platformTopOfTheTop, platformTopOfTheTopStyle]}
            />
          </Animated.View>
        </View>
      </View>

      {/* Label below */}
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default PathItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  platformBase: {
    width: 70,
    height: 70,
    backgroundColor: "#3D3D3D",
    transform: [{ rotateX: "45deg" }, { rotateZ: "0.785398rad" }],
    borderRadius: 5,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  platformBaseSupportRight: {
    width: 20,
    height: 15,
    transform: [{ rotateZ: "0.785398rad" }],
    position: "relative",
    borderRadius: 5,
    right: 34,
    bottom: -15,
    backgroundColor: "#3D3D3D",
  },
  platformBaseSupportLeft: {
    width: 20,
    height: 15,
    transform: [{ rotateZ: "0.785398rad" }],
    position: "relative",
    borderRadius: 5,
    left: 23,
    bottom: 26,
    backgroundColor: "#3D3D3D",
  },
  platformMiddle: {
    width: 70,
    height: 70,
    backgroundColor: "#ADADAD",
    borderRadius: 5,
    position: "absolute",
    top: -11,
    right: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  platformTop: {
    width: 56,
    height: 56,
    backgroundColor: "#3D3D3D",
    borderRadius: 5,
    position: "absolute",
    top: 5,
    left: 5,
  },
  platformTopSupportRight: {
    width: 20,
    height: 15,
    transform: [{ rotateZ: "0.785398rad" }],
    position: "relative",
    borderRadius: 5,
    right: 7,
    bottom: -22,
    backgroundColor: "#3D3D3D",
  },
  platformTopSupportLeft: {
    width: 20,
    height: 15,
    transform: [{ rotateZ: "0.785398rad" }],
    position: "relative",
    borderRadius: 5,
    left: 32,
    bottom: 7,
    backgroundColor: "#3D3D3D",
  },
  platformTopOfTheTop: {
    width: 55,
    height: 55,
    backgroundColor: "#ADADAD",
    borderRadius: 5,
    position: "absolute",
    top: -8,
    right: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
