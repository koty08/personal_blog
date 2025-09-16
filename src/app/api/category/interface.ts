import { Category } from "@prisma/client";

export interface CategoryWithPostCount extends Category {
  count: number;
}
