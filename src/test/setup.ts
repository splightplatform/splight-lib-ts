import { jest } from "@jest/globals";
import Splight from "../Setup.js";

jest.mock("axios");

export const TestKeys = "Splight 123 456";
export const splight = Splight({ Authorization: "Splight 123 456" });
