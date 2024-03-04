import { alertSlice } from "./alertSlice";
import { vi, describe, it, expect, afterAll, vitest, afterEach } from 'vitest';

describe('alertSlice', () => {
  test('should return the initial state', () => {
    expect(alertSlice.reducer(undefined, { type: 'TEST_ACTION' })).toEqual({
      headerText: "",
      icon: {
      iconColor: "",
      iconSize: "",
      iconType: "",
      isVisible: false,
      },
      inProgress: false,
      messageText: "",
      showAlert: false,
      variantStyle: "dark",
    });
  });

  test('should set the header text', () => {
    expect(alertSlice.reducer(undefined, { type: 'alert/setHeaderText', payload: 'test header' })).toEqual({
      headerText: "test header",
      icon: {
      iconColor: "",
      iconSize: "",
      iconType: "",
      isVisible: false,
      },
      inProgress: false,
      messageText: "",
      showAlert: false,
      variantStyle: "dark",
    });
  });

  test('should set the icon', () => {
    expect(alertSlice.reducer(undefined, { type: 'alert/setIcon', payload: {iconColor: 'red', iconSize: 'large', iconType: 'info', isVisible: true} })).toEqual({
      headerText: "",
      icon: {
      iconColor: "red",
      iconSize: "large",
      iconType: "info",
      isVisible: true,
      },
      inProgress: false,
      messageText: "",
      showAlert: false,
      variantStyle: "dark",
    });
  });

  test('should set in progress', () => {
    expect(alertSlice.reducer(undefined, { type: 'alert/setInProgress', payload: true })).toEqual({
      headerText: "",
      icon: {
      iconColor: "",
      iconSize: "",
      iconType: "",
      isVisible: false,
      },
      inProgress: true,
      messageText: "",
      showAlert: false,
      variantStyle: "dark",
    });
  });

  test('should set the message text', () => { 
    expect(alertSlice.reducer(undefined, { type: 'alert/setMessageText', payload: 'test message' })).toEqual({
      headerText: "",
      icon: {
      iconColor: "",
      iconSize: "",
      iconType: "",
      isVisible: false,
      },
      inProgress: false,
      messageText: "test message",
      showAlert: false,
      variantStyle: "dark",
    });
  });

  test('should set show alert', () => { 
    expect(alertSlice.reducer(undefined, { type: 'alert/setShowAlert', payload: true })).toEqual({
      headerText: "",
      icon: {
      iconColor: "",
      iconSize: "",
      iconType: "",
      isVisible: false,
      },
      inProgress: false,
      messageText: "",
      showAlert: true,
      variantStyle: "dark",
    });
  });

  test('should set the variant style', () => {
    expect(alertSlice.reducer(undefined, { type: 'alert/setVariantStyle', payload: 'success' })).toEqual({
      headerText: "",
      icon: {
      iconColor: "",
      iconSize: "",
      iconType: "",
      isVisible: false,
      },
      inProgress: false,
      messageText: "",
      showAlert: false,
      variantStyle: "success",
    });
  });
}); 

