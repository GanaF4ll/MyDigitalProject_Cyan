export type CategoryType = {
  id: number;
  name: string;
  description: string;
  image: string;
  filterName?: string;
};

export interface FormationType {
  // formations
  id: number;
  author_id: number;
  title: string;
  description: string;
  video: string;
  category?: number;
  difficulty: string;
  qualityRating: number;
  coverImage: string;
  //   chapters
  chapters?: Chapter[];
  //   progressions
  progression?: number;
  // local
  isPro?: boolean;
  image?: string;
}

export type Chapter = {
  // chapters
  formation_id: number;
  title: string;
  content: string;
  chapter_number: number;
  // questions
  questions: Question[];
};

export type Question = {
  // questions
  id: number;
  chapter_id: number;
  content: string;
  correct_answer: Answer;
  answers: Answer[];
};

export type Answer = {
  // answers
  id: number;
  question_id: number;
  content: string;
  valid: boolean;
};
