import { Endpoints, MayBeError, apiRequest } from './index';
import { Answer, ID, VoteAction } from '../stores/retrospectiveStore';
import { AxiosError, HttpStatusCode } from 'axios';

const createAnswer = async (answer: string, questionId: string): Promise<MayBeError<Answer>> => {
  const res = await apiRequest
    .post(Endpoints.Answer, {
      text: answer,
      question_id: questionId,
    })
    .catch(() => null);

  if (!res) return { error: true };

  return res.data;
};

const deleteAnswer = async (answerId: string): Promise<MayBeError<void>> => {
  const res = await apiRequest.delete(`${Endpoints.Answer}/${answerId}`).catch(() => null);

  if (!res) return { error: true };
};

const editAnswer = async (
  answer: ID<Partial<Pick<Answer, 'text'>>>,
): Promise<MayBeError<Answer>> => {
  const res = await apiRequest.patch(`${Endpoints.Answer}/${answer.id}`, answer).catch(() => null);

  if (!res) return { error: true };

  return res.data;
};

type ConflicVote = { conflict: boolean };

const voteInAnswer = async (
  answerId: string,
  action: VoteAction,
): Promise<MayBeError<ConflicVote>> => {
  const res = await apiRequest
    .post(Endpoints.VoteAnswer, {
      action,
      answer_id: answerId,
    })
    .catch((e: AxiosError) => e?.response?.status === HttpStatusCode.Conflict);

  if (!res) return { error: true };

  return { conflict: res === true };
};

export default { createAnswer, editAnswer, deleteAnswer, voteInAnswer };
