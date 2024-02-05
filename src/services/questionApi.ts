import { Endpoints, MayBeError, apiRequest } from './index';
import { ID, Question } from '../stores/retrospectiveStore';

const createQuestion = async (question: string): Promise<MayBeError<Question>> => {
  const res = await apiRequest
    .post(Endpoints.Question, {
      question,
    })
    .catch(() => null);

  if (!res) return { error: true };

  return res.data;
};

const deleteQuestion = async (questionId: string): Promise<MayBeError<void>> => {
  const res = await apiRequest.delete(`${Endpoints.Question}/${questionId}`).catch(() => null);

  if (!res) return { error: true };
};

const editQuestion = async (
  question: ID<Partial<Pick<Question, 'text'>>>,
): Promise<MayBeError<Question>> => {
  const res = await apiRequest.patch(`${Endpoints.Question}/${question.id}`).catch(() => null);

  if (!res) return { error: true };

  return res.data;
};

export default { createQuestion, deleteQuestion, editQuestion };
