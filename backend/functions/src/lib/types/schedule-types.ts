import { Routes } from '@prisma/client';

export type TRoutes = Omit<Routes, 'id' | 'createdAt' | 'updatedAt'>;
