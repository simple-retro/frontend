import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export type Answer = {
  id: string;
  text: string;
  position: number;
};

export type Question = {
  id: string;
  answers: Answer[];
  text: string;
};

export type Retrospective = {
  id: string;
  name: string;
  description?: string;
  questions: Question[];
};

export type ID<T, Question = false> = Question extends true
  ? T & { id: string; question_id: string }
  : T & { id: string };

const duplicata = (event: unknown) => {
  console.log('Duplicate event received from websocket: ', event);
};

export const useRetrospectiveStore = defineStore('retrospective', () => {
  const currentRetro = ref<Retrospective>();
  const router = useRouter();

  const updateRetrospective = (retro: Retrospective) => {
    currentRetro.value = retro;
  };

  const deleteRetrospective = () => {
    currentRetro.value = undefined;
    router.push({ name: 'home' });
  };

  const deleteQuestion = (question: ID<Partial<Question>>) => {
    if (currentRetro.value === undefined) return;

    const questionIndex = currentRetro.value.questions.findIndex((q) => q.id === question.id);

    if (questionIndex !== -1) currentRetro.value.questions.splice(questionIndex, 1);
  };

  const createQuestion = (question: Question) => {
    if (currentRetro.value === undefined) return;

    if (currentRetro.value.questions.some((q) => q.id === question.id)) return duplicata(question);

    currentRetro.value.questions.push(question);
  };

  const updateQuestion = (toUpdate: ID<Partial<Question>>) => {
    if (currentRetro.value === undefined) return;

    const question = currentRetro.value.questions.find((q) => q.id === toUpdate.id);

    if (!question) return;

    Object.entries(toUpdate).forEach(([key, value]) => {
      question[key as 'id'] = value as string;
    });
  };

  const createAnswer = (answer: Answer & { question_id: string }) => {
    if (currentRetro.value === undefined) return;

    const question = currentRetro.value.questions.find((a) => a.id === answer.question_id);

    if (!question) return;

    if (question.answers.some((a) => a.id === answer.id)) return duplicata(answer);

    question.answers.push(answer);
  };

  const updateAnswer = (toUpdate: ID<Answer & { question_id: string }>) => {
    if (currentRetro.value === undefined) return;

    const question = currentRetro.value.questions.find((q) => q.id === toUpdate.question_id);

    if (!question) return;

    const answer = question.answers.find((a) => a.id === toUpdate.id);

    if (!answer) return;

    Object.entries(toUpdate).forEach(([key, value]) => {
      answer[key as 'id'] = value as string;
    });
  };

  const deleteAnswer = (answer: ID<Partial<Answer>, true>) => {
    if (currentRetro.value === undefined) return;

    const question = currentRetro.value.questions.find((q) => q.id === answer.question_id);

    if (question === undefined) return;

    const answerIndex = question.answers.findIndex((a) => a.id === answer.id);

    if (answerIndex !== -1) question.answers.splice(answerIndex, 1);
  };

  const question = {
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };

  const retrospective = {
    updateRetrospective,
    deleteRetrospective,
    createRetrospective: updateRetrospective,
  };

  const answer = { createAnswer, updateAnswer, deleteAnswer };

  return { currentRetro, question, retrospective, answer };
});
