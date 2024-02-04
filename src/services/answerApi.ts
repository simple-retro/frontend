import { Endpoints, MayBeError, apiRequest } from './index';
import { Answer } from '../stores/retrospectiveStore';

const createAnswer = async (answers: string): Promise<MayBeError<Question>> => {
  const res = await apiRequest
    .post(Endpoints.Answer, {
      answer,
    })
    .catch(() => null);

  if (!res) return { error: true };

  return res.data;
};

export default { createAnswer };
