import Setup from "../../Setup.js";
import { MockedAxios } from "../../test/MockedAxios.js";
import { API_HOST } from "../../Urls.js";
import { expect, jest, test } from "@jest/globals";
import { splight, TestKeys } from "../../test/setup.js";
import { Asset, AssetParams } from "./Assets.js";

const mockedAxios = MockedAxios();

afterEach(() => {
  mockedAxios.mockReset();
});

const MockAsset: Asset = {
  id: "123",
  attributes: [],
  name: "test",
  latitude: undefined,
  longitude: undefined,
  verified: false,
  description: "test",
};

const MockAssetParams: AssetParams = {
  name: "test",
  description: "test",
};

test("List assets", async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: "something" },
    status: 200,
  });
  const { results, next } = await splight.engine.assets.list();
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}engine/assets/`, {
    headers: { Authorization: TestKeys },
  });
});

test("List assets with params", async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: "something" },
    status: 200,
  });
  const { results, next } = await splight.engine.assets.list({ page_size: 10 });
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}engine/assets/`, {
    headers: { Authorization: TestKeys },
    params: { page_size: 10 },
  });
});

test("Retrieve asset", async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAsset,
    status: 200,
  });
  const asset = await splight.engine.assets.retrieve("123");
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}engine/assets/123/`, {
    headers: { Authorization: TestKeys },
  });
});

test("Create asset", async () => {
  mockedAxios.mockResolvedValueOnce({
    data: MockAsset,
    status: 201,
  });
  const asset = await splight.engine.assets.create(MockAssetParams);
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}engine/assets/`, {
    data: MockAssetParams,
    method: "post",
    headers: { Authorization: TestKeys },
  });
});

test("Update asset", async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { ...MockAsset, name: "updated" },
    status: 200,
  });
  const asset = await splight.engine.assets.update("123", {
    ...MockAssetParams,
    name: "updated",
  });
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}engine/assets/123/`, {
    data: { ...MockAssetParams, name: "updated" },
    method: "patch",
    headers: { Authorization: TestKeys },
  });
});

test("Delete asset", async () => {
  mockedAxios.mockResolvedValueOnce({
    status: 204,
  });
  await splight.engine.assets.destroy("123");
  expect(mockedAxios).toHaveBeenCalledWith(`${API_HOST}engine/assets/123/`, {
    method: "delete",
    headers: { Authorization: TestKeys },
  });
});

test("Get asset attributes", async () => {
  mockedAxios.mockResolvedValueOnce({
    data: { results: [], next: "something" },
    status: 200,
  });
  const { results, next } = await splight.engine.assets.attributes("123");
  expect(mockedAxios).toHaveBeenCalledWith(
    `${API_HOST}engine/assets/123/attributes/`,
    {
      headers: { Authorization: TestKeys },
    }
  );
});
