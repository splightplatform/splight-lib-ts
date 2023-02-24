import Setup from "../../Setup.js";
import { MockedAxios } from "../../test/MockedAxios.js";
import { API_HOST } from "../../Urls.js";
import { expect, jest, test } from "@jest/globals";
import { splight, TestKeys } from "../../test/setup.js";
import { AnonymousQuery, Query, QueryParams } from "./Queries.js";

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockQuery: Query = {
  name: "test",
  description: "",
  output_format: "Number",
  filters: {
    asset: "123",
  },
  target: "test",
  source_type: "Native",
  limit: 10,
};

const MockQueryParams: QueryParams = {
  name: "test",
  output_format: "Number",
  filters: {
    asset: "123",
  },
  target: "test",
  source_type: "Native",
  limit: 10,
};

const MockAnonymousQuery: AnonymousQuery = {
  output_format: "Number",
  filters: {
    asset: "123",
  },
  target: "test",
  source_type: "Native",
  limit: 10,
};

test("List queries", async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: "something" },
    status: 200,
  });
  const { results, next } = await splight.engine.queries.list();
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}engine/queries/`, {
    headers: { Authorization: TestKeys },
  });
});

test("List queries with params", async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: "something" },
    status: 200,
  });
  const { results, next } = await splight.engine.queries.list({
    page_size: 10,
  });
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}engine/queries/`, {
    headers: { Authorization: TestKeys },
    params: { page_size: 10 },
  });
});

test("Retrieve queries", async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockQuery,
    status: 200,
  });
  const query = await splight.engine.queries.retrieve("123");
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}engine/queries/123/`, {
    headers: { Authorization: TestKeys },
  });
});

test("Create query", async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockQuery,
    status: 201,
  });
  const query = await splight.engine.queries.create(MockQueryParams);
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}engine/queries/`, {
    data: MockQueryParams,
    method: "post",
    headers: { Authorization: TestKeys },
  });
});

test("Update query", async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...MockQuery, name: "updated" },
    status: 200,
  });
  const query = await splight.engine.queries.update("123", {
    ...MockQueryParams,
    name: "updated",
  });
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}engine/queries/123/`, {
    data: { ...MockQueryParams, name: "updated" },
    method: "patch",
    headers: { Authorization: TestKeys },
  });
});

test("Delete query", async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 204,
  });
  await splight.engine.queries.destroy("123");
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}engine/queries/123/`, {
    method: "delete",
    headers: { Authorization: TestKeys },
  });
});
