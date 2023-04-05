import { jest } from '@jest/globals';
import axios from 'axios';

export function MockedAxios() {
  return axios as jest.Mocked<typeof axios>;
}
