import { Endpoints, MayBeError, apiRequest } from './index';
import { Retrospective } from '../stores/retrospectiveStore';

const createRetrospective = async (
  name: string,
  description?: string,
): Promise<MayBeError<Retrospective>> => {
  const res = await apiRequest
    .post(Endpoints.Retrospective, {
      name,
      description,
    })
    .catch(() => null);

  // return { id: '12398', name, description, questions: [] };

  if (!res) return { error: true };

  return res.data;
};

const getRetrospective = async (retroId: string): Promise<MayBeError<Retrospective>> => {
  const result = await apiRequest.get(`${Endpoints.Retrospective}/${retroId}`).catch(() => null);

  if (!result) return { error: true };

  return result.data;
};

export default { createRetrospective, getRetrospective };
