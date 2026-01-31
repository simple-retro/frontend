import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL;

export enum Endpoints {
  Question = '/question',
  Retrospective = '/retrospective',
  RetrospectiveExport = '/retrospective/export',
  Answer = '/answer',
  VoteAnswer = '/answer/vote',
  SocketHello = '/hello',
  Limits = '/limits',
}

export type ExportType = 'JSON' | 'MARKDOWN' | 'PDF';

export const apiRequest = axios.create({
  baseURL: `${import.meta.env.PROD ? 'https' : 'http'}://${API_URL}`,
  withCredentials: true,
});

export type MayBeError<T> = (T & { error?: true }) | { error: true };
