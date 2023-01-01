import { HealthValue } from 'react-native-health';

import { PERMISSIONS, permissions } from 'health';

import usePromiseMemo from './usePromiseMemo';

export interface IHealthAuth {
  isAuthorized: boolean;
  authorizing: boolean;
  error: unknown;
}

// TODO(Benson): Refactor this - move into permissions.ts?
const useHealthPermissions = (): IHealthAuth => {
  const {
    results,
    loading: authorizing,
    error,
  } = usePromiseMemo<HealthValue>(() => permissions.initHealthKitAsync(PERMISSIONS), []);
  return { isAuthorized: !!results, authorizing, error };
};

export default useHealthPermissions;
