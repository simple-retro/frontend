import { Endpoints, MayBeError, apiRequest } from './index';
import { Question } from '../stores/retrospectiveStore';

const createQuestion = async (question: string): Promise<MayBeError<Question>> => {
  const res = await apiRequest
    .post(Endpoints.Question, {
      question,
    })
    .catch(() => null);

  if (!res) return { error: true };

  return res.data;
};

export default { createQuestion };
