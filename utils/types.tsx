import { ReactNode } from 'react';

export interface ContainerProps {
  height: number;
  children: ReactNode;
}




export type UserType = {
  id: string;
  login: string;
  name: string;
  avatar_url?: string;
};

export type TweetType = {
  id: string;
  Description: string;
  user: UserType;
  createdAt: string;
  image_url?: string;
  numberOfComments?: number;
  numberOfRetweets?: number;
  numberOfLikes?: number;
  impressions?: number;
};

export type ContentType = {
  id?: string | null;
  text?: string | null;
  src?: string | null;
  colSpan?: number | null;
  rowSpan?: number | null;
  cols?: number | null;
  rows?: number | null;
};

export type ExerciseType = {
  id: string;
  progress: number;
  col: number;
  aiPart: boolean;
  contentNo1: ContentType;
  contentNo2: ContentType;
  contentNo3: ContentType;
  contentNo4: ContentType;
  imageNo1: ContentType;
  imageNo2: ContentType;
  imageNo3: ContentType;
  imageNo4: ContentType;
  imageNo5: ContentType;
  imageNo6: ContentType;
};

export type ExerciseProp = {
  exercise: ExerciseType;
  index: number;
  prevId?: string | null;
  nextId?: string | null;
};

export type ExerciseImageCellProp = {
  id: string;
  colSpan: number;
  rowSpan: number;
  src: string;
};

export type ExerciseTextCellProp = {
  id: string;
  colSpan: number;
  rowSpan: number;
  text: string;
};
