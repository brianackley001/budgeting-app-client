import exp from "constants";
import {
  plaidSlice,
  selectInstitutions,
  selectLinkedItems,
  selectPublicToken,
  setInstitutions,
  setLinkedItems,
  setPublicToken,
} from "./plaidSlice";
import { vi, describe, it, expect, afterAll, vitest, afterEach } from "vitest";
import rootState from "@/__mocks__/rootState";

describe("plaidSlice", () => {
  test("should return the initial state", () => {
    expect(plaidSlice.reducer(undefined, { type: "TEST_ACTION" })).toEqual({
      institutions: [],
      linkedItems: [],
      publicToken: "",
    });
  });
  test("should set the institutions", () => {
    expect(
      plaidSlice.reducer(undefined, {
        type: "plaid/setInstitutions",
        payload: ["test institution 1", "test institution 2"],
      })
    ).toEqual({
      institutions: ["test institution 1", "test institution 2"],
      linkedItems: [],
      publicToken: "",
    });
  });
  test("should set the linked items", () => {
    expect(
      plaidSlice.reducer(undefined, {
        type: "plaid/setLinkedItems",
        payload: ["test linked item 1", "test linked item 2"],
      })
    ).toEqual({
      institutions: [],
      linkedItems: ["test linked item 1", "test linked item 2"],
      publicToken: "",
    });
  });
  test("should set the public token", () => {
    expect(
      plaidSlice.reducer(undefined, {
        type: "plaid/setPublicToken",
        payload: "test public token",
      })
    ).toEqual({
      institutions: [],
      linkedItems: [],
      publicToken: "test public token",
    });
  });

  test("should select the institutions", () => {
    expect(selectInstitutions(rootState)).toEqual([
      "test institution 1",
      "test institution 2",
    ]);
  });
  test("should select the linked items", () => {
    expect(selectLinkedItems(rootState)).toEqual([
      "test linked item 1",
      "test linked item 2",
    ]);
  });
  test("should select the public token", () => {
    expect(selectPublicToken(rootState)).toEqual("test public token");
  });
});
