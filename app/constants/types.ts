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
  completionTime: number;
  //   chapters
  chapters?: ChapterType[];
  //   progressions
  progression?: number;
  // local
  isPro: boolean;
  image: string;
}

export interface ChapterType {
  // chapters
  formation_id: number;
  title: string;
  content: string;
  chapter_number: number;
  // questions
  questions: Question[];
}

export interface QuestionType {
  // questions
  id: number;
  chapter_id: number;
  content: string;
  correct_answer: AnswerType;
  answers: AnswerType[];
}

export interface AnswerType {
  // answers
  id: number;
  question_id: number;
  content: string;
  valid: number;
}
