import axios from 'axios';

export const API_URL = 'http://localhost:3000';

export enum Endpoints {
  Question = '/question',
  Retrospective = '/retrospective',
  Answer = '/answer',
}

export const apiRequest = axios.create({
  baseURL: API_URL,
  headers: {
    'User-Agent': 'Simple-Retro-Frontend/1.0 (+https://github.com/simple-retro/website)',
  },
  withCredentials: true,
});

export type MayBeError<T> = (T & { error?: true }) | { error: true };
