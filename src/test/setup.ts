import { jest } from "@jest/globals";
import Setup from "../Setup.js";

jest.mock("axios");

export const TestKeys = "Splight 123 456";
export const splight = Setup.configure({ Authorization: "Splight 123 456" });
