import { Endpoints, MayBeError, apiRequest } from './index';
import { Answer, ID } from '../stores/retrospectiveStore';

const createAnswer = async (answer: string): Promise<MayBeError<Answer>> => {
  const res = await apiRequest
    .post(Endpoints.Answer, {
      answer,
    })
    .catch(() => null);

  if (!res) return { error: true };

  return res.data;
};

const deleteAnswer = async (answerId: string): Promise<MayBeError<void>> => {
  const res = await apiRequest.delete(`${Endpoints.Question}/${answerId}`).catch(() => null);

  if (!res) return { error: true };
};

const editAnswer = async (
  answer: ID<Partial<Pick<Answer, 'text'>>>,
): Promise<MayBeError<Answer>> => {
  const res = await apiRequest.patch(`${Endpoints.Question}/${answer.id}`).catch(() => null);

  if (!res) return { error: true };

  return res.data;
};

export default { createAnswer, editAnswer, deleteAnswer };
