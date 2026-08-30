import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type {
  AuthState,
  AuthStateData,
  LoginAndRefreshResponseDtoForClient,
} from '~/features/auth/schemas';

const initialState = {
  accessTokenExpiresAtMs: null,
  employeeCode: null,
  employeeName: null,
  authRole: null,
  employeeRole: null,
  department: null,
  team: null,
  position: null,
};

export const validateAuthIntegrity = (state: AuthStateData) => {
  const {
    accessTokenExpiresAtMs,
    employeeCode,
    employeeName,
    authRole,
    employeeRole,
    department,
    team,
    position,
  } = state;

  const isAccessTokenValid =
    accessTokenExpiresAtMs != null &&
    Date.now() + 30 * 1000 < accessTokenExpiresAtMs;

  return !!(
    employeeCode &&
    employeeName &&
    authRole &&
    employeeRole &&
    department &&
    team &&
    position &&
    isAccessTokenValid
  );
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,

      hasHydrated: false,

      setHasHydrated: (v: boolean) => set({ hasHydrated: v }),

      login: (data: LoginAndRefreshResponseDtoForClient) => set({ ...data }),

      logout: () => set(initialState),
    }),
    {
      name: 'auth-storage',

      partialize: (state) => ({ ...state }),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
