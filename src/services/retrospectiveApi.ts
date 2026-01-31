import { Endpoints, ExportType, MayBeError, apiRequest } from './index';
import { ID, Retrospective } from '../stores/retrospectiveStore';

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

  if (!res) return { error: true };

  return res.data;
};

const getRetrospective = async (retroId: string): Promise<MayBeError<Retrospective>> => {
  const result = await apiRequest.get(`${Endpoints.Retrospective}/${retroId}`).catch(() => null);

  if (!result) return { error: true };

  return result.data;
};

const deleteRestrospective = async (retroId: string): Promise<MayBeError<void>> => {
  const result = await apiRequest.delete(`${Endpoints.Retrospective}/${retroId}`).catch(() => null);

  if (!result) return { error: true };
};

const updateRetrospective = async (
  toUpdate: ID<Partial<Pick<Retrospective, 'name' | 'description'>>>,
): Promise<MayBeError<Retrospective>> => {
  const result = await apiRequest
    .patch(`${Endpoints.Retrospective}/${toUpdate.id}`, toUpdate)
    .catch(() => null);

  if (!result) return { error: true };

  return result.data;
};

const exportRetrospective = async (
  retrospectiveId: string,
  exportType: ExportType,
): Promise<MayBeError<Blob>> => {
  const result = await apiRequest
    .post(
      Endpoints.RetrospectiveExport,
      {
        retrospective_id: retrospectiveId,
        export_type: exportType,
      },
      { responseType: 'blob' },
    )
    .catch(() => null);

  if (!result) return { error: true };

  return result.data;
};

export default {
  createRetrospective,
  getRetrospective,
  deleteRestrospective,
  updateRetrospective,
  exportRetrospective,
};
