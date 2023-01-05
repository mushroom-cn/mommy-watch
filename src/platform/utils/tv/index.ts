import { Platform } from 'react-native';
export const isTv = () => Platform.isTV;
export const isIOS = () => Platform.OS === 'ios';
export const isAndroidMobile = () =>
  !Platform.isTV && Platform.OS === 'android';
export const isAndroidTab = () => !Platform.isTV && Platform.OS === 'android';
