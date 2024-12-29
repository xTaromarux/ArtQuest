import { ReactNode } from 'react';

export interface ContainerProps {
  height: number;
  width: number;
  style?: object;
  children: ReactNode;
}

export type TabsParamList = {
  home: undefined;
  feed: undefined;
  courses: undefined;
  exercises: undefined;
  profile: undefined;
};

export type LineProps = {
  width: number;
  backgroundColor?: string;
  style?: object;
};

export interface ProgressBarProps {
  progress: number; 
  color: string; 
}

export interface CourseRequest {
  course: Course;
  difficulty: Difficulty;
  picture_url  : string;
  stage : string;
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

export interface Exercise {
  id: string;
  template: number;
  next_view_id: string | null;
  previous_view_id: string | null;
  ai_part: boolean;
  description: string[];
  picture: string[];
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

export type Achievement = {
  experience: number;
  picture_id: string;
};