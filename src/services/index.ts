import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL;

export enum Endpoints {
  Question = '/question',
  Retrospective = '/retrospective',
  Answer = '/answer',
  VoteAnswer = '/answer/vote',
  SocketHello = '/hello',
  Limits = '/limits',
}

export const apiRequest = axios.create({
  baseURL: `${import.meta.env.PROD ? 'https' : 'http'}://${API_URL}`,
  withCredentials: true,
});

export type MayBeError<T> = (T & { error?: true }) | { error: true };
