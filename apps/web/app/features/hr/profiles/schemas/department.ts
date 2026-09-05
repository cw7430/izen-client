import { z } from 'zod';

const teamResponseSchema = z.object({
  teamId: z.string().transform((val) => BigInt(val)),
  teamCode: z.string(),
  teamName: z.string(),
});

const departmentResponseSchema = z.object({
  departmentId: z.string().transform((val) => BigInt(val)),
  departmentCode: z.string(),
  departmentName: z.string(),
  teams: z.array(teamResponseSchema),
});

export const departmentListResponseSchema = z.array(departmentResponseSchema);

export type DepartmentListResponseDto = z.infer<
  typeof departmentListResponseSchema
>;
