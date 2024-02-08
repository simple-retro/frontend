import axios from 'axios';

export const API_URL = 'localhost:8080';

export enum Endpoints {
  Question = '/question',
  Retrospective = '/retrospective',
  Answer = '/answer',
  SocketHello = '/hello',
}

export const apiRequest = axios.create({
  baseURL: `http://${API_URL}/api`,
  withCredentials: true,
});

export type MayBeError<T> = (T & { error?: true }) | { error: true };
