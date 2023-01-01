import { HealthValue } from 'react-native-health';

import permissions, { PERMISSIONS } from './permissions';

import { usePromiseMemo } from 'utils/promise';

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
