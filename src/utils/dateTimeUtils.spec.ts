import { vi, describe, it, expect, assert, afterAll, vitest, afterEach } from 'vitest';
import { getElapsedTime } from './dateTimeUtils';
import  { add } from "date-fns";

let currentDate: Date;

describe('DateTime Utils getElapsedTime', () => {

  beforeAll(() => {
    currentDate = new Date();
  });

  test('Outputs expected message text for seconds elapsed', () => {
    // Arrange
    const savedDateStringTime = add(currentDate, {
      seconds: -10,
    })
    // Act
    const result = getElapsedTime(savedDateStringTime.toISOString());
    // Assert
    expect(result).toMatch("Updated 10");
    expect(result).toMatch("seconds ago");
  })
  

  test('Outputs expected message text for minutes elapsed', () => {
    // Arrange
    const savedDateStringTime = add(currentDate, {
      minutes: -10,
      seconds: -10,
    })
    // Act
    const result = getElapsedTime(savedDateStringTime.toISOString());
    // Assert
    expect(result).toBe(" Updated 10 minutes ago");
  })

  test('Outputs expected message text for hours elapsed', () => {
    // Arrange
    const savedDateStringTime = add(currentDate, {
      hours: -10,
      minutes: -10,
      seconds: -10,
    })
    // Act
    const result = getElapsedTime(savedDateStringTime.toISOString());
    // Assert
    expect(result).toBe(" Updated 10 hours ago");
  })

  test('Outputs expected message text for days elapsed', () => {
    // Arrange
    const savedDateStringTime = add(currentDate, {
      days: -5,
      hours: -10,
      minutes: -10,
      seconds: -10,
    })
    // Act
    const result = getElapsedTime(savedDateStringTime.toISOString());
    // Assert
    expect(result).toBe(" Updated 5 days ago");
  })
})