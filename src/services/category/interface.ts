import { Category } from "@prisma/client";

export interface CategoryWithPostCount extends Category {
  count: number;
}

export interface CategoryCreatePayload {
  name: string;
}

export interface CategoryDeletePayload {
  id: number;
}
