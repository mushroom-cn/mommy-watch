import { useEffect } from 'react';
import { requestCameraPermission } from '../permissions';

export function useCameraPermission() {
  useEffect(() => {
    requestCameraPermission();
  }, []);
}
