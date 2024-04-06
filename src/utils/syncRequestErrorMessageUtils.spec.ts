import { describe, expect } from "vitest";
import{getPlaidGeneralErrorMessage, getSyncRequestErrorDetails, isPlaidLoginError, isPlaidOtherError} from "./syncRequestErrorMessageUtils";

describe ("getPlaidGeneralErrorMessage", () => {
  test.each([
    { errors: [{error_message: "error1"}, {error_message: "error2"}], expected: "error1 error2" },
    { errors: [{error_message: "error1"}, {error_message: "error1"}], expected: "error1" },
    { errors: [{error_message: "error1"}, {error_message: "error2"}, {error_message: "error3"}], expected: "error1 error2 error3" },
  ])('returns $expected items in collection for $errors page of results: getPlaidGeneralErrorMessage($errors) -> $expected', (
    { errors, expected }) => {
    // Arrange
    let sut = getPlaidGeneralErrorMessage;
    
    // Act
    let result = sut (errors);
    expect(result).toEqual(expected)
  })
});

describe ("isPlaidLoginError", () => {
  test.each([
    { errors: [{error_code: "ITEM_LOGIN_REQUIRED"}, {error_code: "ITEM_LOGIN_REQUIRED"}], expected: true },
    { errors: [{error_code: "ITEM_LOGIN_REQUIRED"}], expected: true },
    { errors: [{error_code: "ITEM_LOGIN_REQUIRED"}, {error_code: "INVALID_INPUT"}, {error_code: "ITEM_LOGIN_REQUIRED"}, {error_code: "ITEM_LOGIN_REQUIRED"}], expected: true },
    { errors: [{error_code: "INVALID_INPUT"}], expected: false },
  ])('returns $expected items in collection for $errors page of results: isPlaidLoginError($errors) -> $expected', (
    { errors, expected }) => {
      // Arrange
      let sut = isPlaidLoginError;
      
      // Act
      let result = sut (errors);
      expect(result).toEqual(expected)
    })
  });  
  describe ("isPlaidOtherError", () => {
    test.each([
      { errors: [{error_type: "INVALID_INPUT", error_code: "INVALID_ACCESS_TOKEN"}], expected: true },
      { errors: [{error_type: "INVALID_INPUT", error_code: "ITEM_LOGIN_REQUIRED"}], expected: false },
    ])('returns $expected items in collection for $errors page of results: isPlaidOtherError($errors) -> $expected', (
      { errors, expected }) => {
        // Arrange
        let sut = isPlaidOtherError;
        
        // Act
        let result = sut (errors);
        expect(result).toEqual(expected)
      })
    });

    describe('getSyncRequestErrorDetails', () => {
      test.each([
        { userErrors: ["error1",  "error2"], accountErrors:[], transactionErrors:[], expectedMessage: "error1, error2", expectedHeader: "Error syncing your user account..." },
        { userErrors: [], accountErrors:["error1",  "error2"], transactionErrors:[], expectedMessage: "error1, error2", expectedHeader: "Error syncing your accounts..." },
        { userErrors: [], accountErrors:[], transactionErrors:["error1",  "error2"], expectedMessage: "error1, error2", expectedHeader: "Error syncing your transactions..." },
      ])('returns $expectedMessage and $expectedHeader in collection for $userErrors $accountErrors $transactionErrors : getSyncRequestErrorDetails($userErrors,$accountErrors,$transactionErrors)', (
        { userErrors,accountErrors,transactionErrors,  expectedMessage, expectedHeader }) => {
        // Arrange
        let sut = getSyncRequestErrorDetails;
        
        // Act
        let {headerText: headerTextResult, message: messageResult, plaidLoginError: plaidLoginErrorResult } = sut (userErrors, accountErrors, transactionErrors);
        expect(headerTextResult).toEqual(expectedHeader);
        expect(messageResult).toEqual(expectedMessage);
        expect(plaidLoginErrorResult).toEqual(false);
      })
    } );