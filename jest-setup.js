/* eslint-disable no-undef */

// Import Jest Native matchers
import { jest } from '@jest/globals';
import '@testing-library/jest-native/extend-expect';

// jest.useFakeTimers();
// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.setTimeout(10 * 1000);
