import axios from 'axios';

export const API_URL = 'localhost:8080/api';

export enum Endpoints {
  Question = '/question',
  Retrospective = '/retrospective',
  Answer = '/answer',
  SocketHello = '/hello',
}

export const apiRequest = axios.create({
  baseURL: `http://${API_URL}`,
  withCredentials: true,
});

export type MayBeError<T> = (T & { error?: true }) | { error: true };
