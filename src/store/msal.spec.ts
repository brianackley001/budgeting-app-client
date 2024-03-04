import exp from "constants";
import { msalSlice, selectAccessToken, selectUid } from "./msalSlice";
import { vi, describe, it, expect, afterAll, vitest, afterEach } from "vitest";
import  rootState from "@/__mocks__/rootState";

describe("msalSlice", () => {
  test("should return the initial state", () => {
    expect(msalSlice.reducer(undefined, { type: "TEST_ACTION" })).toEqual({
      accessToken: "",
      uid: "",
    });
  });
  test("should set the access token", () => {
    expect(
      msalSlice.reducer(undefined, {
        type: "msal/setAccessToken",
        payload: "test token",
      })
    ).toEqual({
      accessToken: "test token",
      uid: "",
    });
  });
  test("should set the uid", () => {
    expect(
      msalSlice.reducer(undefined, { type: "msal/setUid", payload: "test uid 2" })
    ).toEqual({
      accessToken: "",
      uid: "test uid 2",
    });
  });

  test("should select the access token", () => {
    expect(selectAccessToken(rootState)).toEqual("test token");
  });
  test("should select the uid", () => {
    expect(selectUid(rootState)).toEqual("test uid");
  });
}); 