import { expect, test, describe } from '@jest/globals';

// This function should receive the variable name as a string or null because 
// we have the verification of null in the first "if"
function getCapitalizeFirstWord(name: string | null ): string {
  if (name == null) {
    throw new Error('Failed to capitalize first word with null');
  }
  if (!name) {
    return name;
  }
  return name.split(' ').map(
    n => n.length > 1 ? (n.substring(0, 1).toUpperCase() + n.substring(1).toLowerCase()) : n
  ).join(' ');
}


describe('getCapitalizeFirstWord', () => {

  test('should capitalize first letter of each word in a multi-word string', () => {
    // Given
    const name = 'mohibul alom';

    // When
    const result = getCapitalizeFirstWord(name);

    // Then
    expect(result).toBe('Mohibul Alom');
  });

  test('should handle single-letter words correctly', () => {
    // Given
    const name = 'm a';

    // When
    const result = getCapitalizeFirstWord(name);

    // Then
    expect(result).toBe('M A');
  });

  test('should return empty string when given an empty string', () => {
    // Given
    const name = '';

    // When
    const result = getCapitalizeFirstWord(name);

    // Then
    expect(result).toBe('');
  });

  test('should throw an error when name is null', () => {
    // Given
    const name = null;

    // Then
    expect(() => {
      // When
      getCapitalizeFirstWord(name);
    }).toThrow('Failed to capitalize first word with null');
  });

});

