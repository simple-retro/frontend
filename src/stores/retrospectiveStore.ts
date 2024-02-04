import { defineStore } from 'pinia';
import { ref } from 'vue';

export type Answer = {
  id: string;
};

export type Question = {
  id: string;
  answers: Answer[];
};

export type Retrospective = {
  id: string;
  name: string;
  description?: string;
  questions: Question[];
};

export const useRetrospectiveStore = defineStore('retrospective', () => {
  const retrospective = ref<Retrospective>();

  const createQuestion = (question: Question) => {
    if (typeof retrospective.value === 'undefined') return;

    deleteQuestion(question.id);

    retrospective.value.questions.push(question);
  };

  const deleteQuestion = (questionId: string) => {
    if (typeof retrospective.value === 'undefined') return;

    const questionIndex = retrospective.value.questions.findIndex((q) => q.id === questionId);

    if (questionIndex !== -1) retrospective.value.questions.splice(questionIndex, 1);
  };

  const updateQuestion = (questionId: string, update: Partial<Question>) => {
    if (typeof retrospective.value === 'undefined') return;

    const question = retrospective.value.questions.find((q) => q.id === questionId);

    if (!question) return;

    Object.entries(update).forEach(([key, value]) => {
      question[key as 'id'] = value as string;
    });
  };

  return { retrospective, createQuestion, updateQuestion };
});
