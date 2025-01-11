import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleProp, ImageStyle, ImageResizeMode, ViewStyle } from "react-native";

export type TabsParamList = {
  home: undefined;
  feed: undefined;
  courses: undefined;
  exercises: undefined;
  profile: undefined;
};

export interface ContainerProps {
  height: number;
  width: number;
  style?: object;
  children: ReactNode;
}

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type IconLibrary = "Ionicons" | "MaterialCommunityIcons";

export type IoniconsName = keyof typeof Ionicons.glyphMap;

export type MaterialCommunityIconsName =
  keyof typeof MaterialCommunityIcons.glyphMap;

export type AnimatedIconProps = {
  name: IoniconsName | MaterialCommunityIconsName;
  color: string;
  size: number;
  focused: boolean;
  library: IconLibrary;
};

export type LineProps = {
  width: number;
  backgroundColor?: string;
  style?: object;
};

export type Picture = {
  picture_id: string;
  url: string;
};

export type TweetImageProps = {
  url: string;
};

export type ExitLessonButtonProps = {
  onPress: any;
  onLongPress: any;
  disabled: any;
  activeOpacity: any;
  iconName: any;
};

export type Achievement = {
  experience: number;
  picture_id: string;
};

export type TweetHeaderProps = {
  tweet: TweetType;
  onEdit: () => void;
  onDelete: () => void;
};

export type Statistic = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  value: number;
  label: string;
};

export type TweetProp = {
  tweet: TweetType;
  onDelete: () => void;
};

export interface SearchBarProps {
  value: string;
  style?: object;
  onChangeText: (text: string) => void;
}

export interface UserProfile {
  user_id: string;
  mail: string;
  picture_url?: string;
  login: string;
  user_name: string;
  created_date: string;
}

export interface StatisticsData {
  experience: number;
  level: number;
  courses: number;
  start_strike: string;
  end_strike: string;
}

export interface ProfileData {
  user: UserProfile;
  statistics: StatisticsData;
}

export interface AchievementsSectionProps {
  achievements: Achievement[];
}

export interface AchievementItemProps {
  source: any;
  style?: ViewStyle;
}

export interface ConfirmationModal {
  isVisible: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  IconComponent: React.ComponentType<any>;
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  acceptText?: string;
}

export interface BottomTabIconProps {
  route: string;
  isFocused: boolean;
  color: string;
  size: number;
}

export interface ProfileHeaderProps {
  onOpen: () => void;
  userData: {
    user_id: string;
    mail: string;
    picture_url?: string;
    login: string;
    user_name: string;
    created_date: string;
  };
}

export interface PathItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  exercise?: Exercise;
  userCourseId?: string;
  onClick?: () => void;
  index: number;
}

export interface LabeledTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: object;
  secureTextEntry?: boolean;
}

export interface CustomImageProps {
  url: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
}

export interface InputModal {
  isVisible: boolean;
  title: string;
  onConfirm: (label: string) => Promise<void>;
  onCancel: () => void;
  IconComponent: React.ComponentType<any>;
  iconName: string;
  iconSize?: number;
  iconColor?: string;
  acceptText?: string;
  labelText?: string;
  error?: { label: string };
  setError: React.Dispatch<React.SetStateAction<{ label: string }>>;
}

export interface InformationModalProps {
  isVisible: boolean;
  title: string;
  onCancel: () => void;
}

export interface IconButtonProps {
  icon: React.ComponentProps<typeof FontAwesome5>["name"];
  solid: boolean;
  color: string;
  text: number;
  onPress: () => void;
}

export interface StatisticsSectionProps {
  statistics: {
    experience: number;
    level: number;
    courses: number;
    start_strike: string;
    end_strike: string;
  };
}

export interface StatItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  value: number;
  label: string;
}

export interface ContainerProps {
  height: number;
  width: number;
  style?: object;
  children: ReactNode;
}

export interface ProgressBarProps {
  progress: number;
  color: string;
}

export interface CourseRequest {
  course: Course;
  difficulty: Difficulty;
  picture_url: string;
  stage: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  long_description: string;
  short_desscription: string;
}

export interface Difficulty {
  color: string;
  experience: number;
  level: number;
}

export interface PathItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
}

export interface Exercise {
  id: string;
  template: number;
  next_view_id: string | null;
  previous_view_id: string | null;
  ai_part: boolean;
  descriptions: string[];
  short_descriptions: string[];
  picture_urls: Picture[];
  percentage: number;
}


export type UserType = {
  id: string;
  login: string;
  mail: string;
  user_name: string;
  created_date: string;
  picture_url?: string;
};

export type TweetType = {
  id: string;
  description: string;
  date_added: string;
  date_updated: string;
  picture_url?: string;
  reactions?: number;
  user_picture_url?: string;
  user_name?: string;
  login?: string;
};

export interface Comment {
  id: string;
  description: string;
  reactions: number;
  user_id: string;
  post_id: string;
  date_added: string;
  date_updated: string;
  user_name: string;
  login: string;
  avatar_url: string;
}
