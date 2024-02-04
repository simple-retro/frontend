import axios from 'axios';

export const API_URL = 'localhost:8080';

export enum Endpoints {
  Question = '/question',
  Retrospective = '/retrospective',
  Answer = '/answer',
  SocketHello = '/hello',
}

export const apiRequest = axios.create({
  baseURL: `http://${API_URL}`,
  headers: {
    'User-Agent': 'Simple-Retro-Frontend/1.0 (+https://github.com/simple-retro/website)',
  },
  withCredentials: true,
});

export type MayBeError<T> = (T & { error?: true }) | { error: true };
