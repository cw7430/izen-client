import { z } from 'zod';

export const pageRequestSchema = <T extends [string, ...string[]]>(
  sortPath: T,
) =>
  z.object({
    page: z.number(),
    size: z.number(),
    blockSize: z.number(),
    sortPath: z.enum(sortPath),
    sortOrder: z.enum(['ASC', 'DESC']),
  });

export const pageResponseSchema = <T extends z.ZodTypeAny>(content: T) =>
  z.object({
    totalElements: z.number(),
    totalPages: z.number(),
    currentPage: z.number(),
    size: z.number(),
    startPage: z.number(),
    endPage: z.number(),
    hasNext: z.boolean(),
    hasPrevious: z.boolean(),
    contents: z.array(content),
  });

export type PageResponseDto<T> = z.infer<
  ReturnType<typeof pageResponseSchema<z.ZodType<T>>>
>;
