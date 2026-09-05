import { z } from 'zod';

const positionResponseSchema = z.object({
  positionId: z.string().transform((val) => BigInt(val)),
  positionCode: z.string(),
  positionName: z.string(),
  basicSalary: z.string().transform((val) => BigInt(val)),
  incentiveSalary: z.string().transform((val) => BigInt(val)),
});

export const positionListResponseSchema = z.array(positionResponseSchema);

export type PositionListResponseDto = z.infer<
  typeof positionListResponseSchema
>;
