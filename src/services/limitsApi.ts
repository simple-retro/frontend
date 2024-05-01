import { Endpoints, MayBeError, apiRequest } from '.';

export type Limits = {
  retrospective: {
    name: number;
    description: number;
  };
  question: {
    text: number;
  };
  answer: {
    text: number;
  };
};

const getLimits = async (): Promise<MayBeError<Limits>> => {
  const result = await apiRequest.get(Endpoints.Limits).catch(() => null);

  if (!result) return { error: true };

  return result.data;
};

export default { getLimits };
