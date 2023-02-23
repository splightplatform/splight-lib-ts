import axios from "axios";
import { expect, jest, test } from "@jest/globals";

export function MockedAxios() {
  return axios as jest.Mocked<typeof axios>;
}
