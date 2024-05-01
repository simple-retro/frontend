import { AxiosError } from 'axios';
import { Endpoints, MayBeError, apiRequest } from '.';
import logger from './logger';

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
  const result = await apiRequest.get(Endpoints.Limits).catch((e: AxiosError) => {
    if (e?.response?.status === 404) {
      logger.error('The limit route is not yet implemented. Using hardcoded ones');

      return {
        data: {
          answer: { text: 300 },
          question: { text: 100 },
          retrospective: { name: 100, description: 300 },
        },
      };
    }
  });

  if (!result) return { error: true };

  return result.data;
};

export default { getLimits };
