import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export type Answer = {
  id: string;
  text: string;
  position: number;
  question_id: string;
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

export type KnownRetro = {
  id: string;
  name: string;
  lastAccess: number;
};

export type ID<T, Question = false> = Question extends true
  ? T & { id: string; question_id: string }
  : T & { id: string };

export const useRetrospectiveStore = defineStore('retrospective', () => {
  const currentRetro = ref<Retrospective>();
  const knownRetros = ref<null | KnownRetro[]>(null);
  const router = useRouter();

  const settedArray = (retros: KnownRetro[]): KnownRetro[] => {
    const uniqueIdsSet = new Set();

    return retros.filter((obj) => {
      if (uniqueIdsSet.has(obj.id)) return false;

      uniqueIdsSet.add(obj.id);
      return true;
    });
  };

  const getKnownRetrospectives = (): KnownRetro[] => {
    if (!knownRetros.value) {
      const fromStorage = localStorage.getItem('known_retros');

      if (!fromStorage) return [];

      const parsed = (JSON.parse(fromStorage) as KnownRetro[]) ?? [];

      knownRetros.value = settedArray(parsed);

      localStorage.setItem('known_retros', JSON.stringify(knownRetros.value));

      return knownRetros.value;
    }

    return knownRetros.value;
  };

  const deleteFromKnowledge = (retroId: string) => {
    knownRetros.value = getKnownRetrospectives();

    const hasIndex = knownRetros.value.findIndex((r) => r.id === retroId);

    if (hasIndex !== -1) knownRetros.value.splice(hasIndex, 1);

    localStorage.setItem('known_retros', JSON.stringify(knownRetros.value));
  };

  const learnRetrospective = (retro: Retrospective) => {
    knownRetros.value = getKnownRetrospectives();

    knownRetros.value.unshift({ ...retro, lastAccess: Date.now() });

    knownRetros.value = settedArray(knownRetros.value);

    localStorage.setItem('known_retros', JSON.stringify(knownRetros.value));
  };

  const updateRetrospective = (retro: Retrospective) => {
    learnRetrospective(retro);

    if (currentRetro.value === undefined) {
      currentRetro.value = retro;
      return;
    }

    currentRetro.value.name = retro.name;
    currentRetro.value.description = retro.description;
    currentRetro.value.questions = retro.questions;
  };

  const createRetrospective = (retro: Retrospective) => {
    learnRetrospective(retro);

    currentRetro.value = undefined;
    currentRetro.value = retro;
  };

  const deleteRetrospective = () => {
    deleteFromKnowledge(currentRetro.value?.id ?? '');
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

    if (currentRetro.value.questions.some((q) => q.id === question.id)) return;

    currentRetro.value.questions.push(question);
  };

  const updateQuestion = (toUpdate: ID<Partial<Question>>) => {
    if (currentRetro.value === undefined) return;

    const question = currentRetro.value.questions.find((q) => q.id === toUpdate.id);

    if (!question) return;

    question.text = toUpdate.text ?? '';
  };

  const createAnswer = (answer: Answer & { question_id: string }) => {
    if (currentRetro.value === undefined) return;

    const question = currentRetro.value.questions.find((a) => a.id === answer.question_id);

    if (!question) return;

    if (question.answers.some((a) => a.id === answer.id)) return;

    question.answers.push(answer);
  };

  const updateAnswer = (toUpdate: ID<Answer & { question_id: string }>) => {
    if (currentRetro.value === undefined) return;

    const question = currentRetro.value.questions.find((q) => q.id === toUpdate.question_id);

    if (!question) return;

    const answer = question.answers.find((a) => a.id === toUpdate.id);

    if (!answer) return;

    answer.text = toUpdate.text;
    answer.position = toUpdate.position;
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
    createRetrospective,
  };

  const answer = { createAnswer, updateAnswer, deleteAnswer };

  return {
    currentRetro,
    question,
    retrospective,
    answer,
    getKnownRetrospectives,
    deleteFromKnowledge,
    knownRetros,
  };
});
