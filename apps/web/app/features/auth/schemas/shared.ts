import { z } from 'zod';

export const authStateDataSchema = z.object({
  accessTokenExpiresAtMs: z.number().nullable(),
  employeeCode: z.string().nullable(),
  employeeName: z.string().nullable(),
  authRole: z.enum(['USER', 'ADMIN']).nullable(),
  employeeRole: z
    .enum(['DEPARTMENT_CHIEF', 'TEAM_CHIEF', 'EMPLOYEE'])
    .nullable(),
  department: z.string().nullable(),
  team: z.string().nullable(),
  position: z.string().nullable(),
});

export const loginAndRefreshResponseSchemaForClient = authStateDataSchema
  .partial()
  .extend({
    accessTokenExpiresAtMs: z.number(),
    employeeCode: z.string(),
    employeeName: z.string(),
    authRole: z.enum(['USER', 'ADMIN']),
    employeeRole: z.enum(['DEPARTMENT_CHIEF', 'TEAM_CHIEF', 'EMPLOYEE']),
    department: z.string(),
    team: z.string(),
    position: z.string(),
  });

export const loginAndRefreshResponseSchemaForServer =
  loginAndRefreshResponseSchemaForClient.extend({
    accessToken: z.string(),
    refreshToken: z.string(),
    refreshTokenExpiresAtMs: z.number(),
    isAuto: z.boolean(),
  });

export type LoginAndRefreshResponseDtoForClient = z.infer<
  typeof loginAndRefreshResponseSchemaForClient
>;

export type LoginAndRefreshResponseDtoForServer = z.infer<
  typeof loginAndRefreshResponseSchemaForServer
>;

export type AuthStateData = z.infer<typeof authStateDataSchema>;

export type AuthState = AuthStateData & {
  hasHydrated: boolean;

  setHasHydrated: (v: boolean) => void;

  login: (data: LoginAndRefreshResponseDtoForClient) => void;

  logout: () => void;
};
