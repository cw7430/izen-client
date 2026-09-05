import { z } from 'zod';

import { pageRequestSchema, pageResponseSchema } from '~/shared/schemas';
import { departmentListResponseSchema } from './department';
import { positionListResponseSchema } from './position';

export const profileListRequestSchema = pageRequestSchema([
  'EMPLOYEE',
  'POSITION',
  'DEPARTMENT',
] as const);

export const createProfileRequestSchema = z.object({
  employeeCode: z.string().min(1, '사번을 생성해주세요.'),
  employeeName: z.string().min(1, '사원 이름을 입력해주세요.'),
  positionCode: z.string().regex(/^PSN\d{2,3}$/, '직급을 선택해주세요.'),
  teamCode: z.string().regex(/^TM\d{3}$/, '부서와 팀을 선택해주세요.'),
  employeeRole: z.enum(
    ['DEPARTMENT_CHIEF', 'TEAM_CHIEF', 'EMPLOYEE'],
    '직책을 선택해주세요.',
  ),
  phone: z
    .string()
    .min(1, '휴대전화 번호를 입력해주세요.')
    .regex(
      /^(010|011|016|017|018|019)-\d{3,4}-\d{4}$/,
      '전화번호 형식이 올바르지 않습니다.',
    ),
  email: z
    .string()
    .min(1, '이메일 입력해주세요.')
    .pipe(z.email('이메일 형식이 올바르지 않습니다.')),
});

export const updateProfileRequestSchema = z.object({
  positionCode: z.string().regex(/^PSN\d{2,3}$/, '직급을 선택해주세요.'),
  teamCode: z.string().regex(/^TM\d{3}$/, '부서와 팀을 선택해주세요.'),
  employeeRole: z.enum(
    ['DEPARTMENT_CHIEF', 'TEAM_CHIEF', 'EMPLOYEE'],
    '직책을 선택해주세요.',
  ),
});

const allowedProfileTeamsSchema = z.array(z.string());

const profileResponseSchema = z.object({
  employeeId: z.string().transform((val) => BigInt(val)),
  employeeCode: z.string(),
  employeeRole: z.enum(['DEPARTMENT_CHIEF', 'TEAM_CHIEF', 'EMPLOYEE', 'LEFT']),
  employeeName: z.string(),
  positionCode: z.string(),
  positionName: z.string(),
  departmentCode: z.string(),
  departmentName: z.string(),
  teamCode: z.string(),
  teamName: z.string(),
  phone: z.string(),
  email: z.string(),
  createdBy: z.string().nullable(),
  createdEmployeeName: z.string().nullable(),
  updatedBy: z.string().nullable(),
  updatedEmployeeName: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});

export const profileDetailResponseSchema = profileResponseSchema.extend({
  departments: departmentListResponseSchema,
  positions: positionListResponseSchema,
  allowedProfileTeams: allowedProfileTeamsSchema,
});

export const employeeCodeResponseSchema = z.object({
  employeeCode: z.string(),
});

export const profileListResponseSchema = z.object({
  employeeProfiles: pageResponseSchema(profileResponseSchema),
  departments: departmentListResponseSchema,
  positions: positionListResponseSchema,
  allowedProfileTeams: allowedProfileTeamsSchema,
});

export type ProfileListRequestDto = z.infer<typeof profileListRequestSchema>;
export type CreateProfileRequestDto = z.infer<
  typeof createProfileRequestSchema
>;
export type UpdateProfileRequestDto = z.infer<
  typeof updateProfileRequestSchema
>;
export type ProfileResponseDto = z.infer<typeof profileResponseSchema>;
export type ProfileDetailResponseDto = z.infer<
  typeof profileDetailResponseSchema
>;
export type ProfileListResponseDto = z.infer<typeof profileListResponseSchema>;
export type EmployeeCodeResponseDto = z.infer<
  typeof employeeCodeResponseSchema
>;
