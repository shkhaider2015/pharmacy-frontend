import { Category } from "@/services/api/types/category";

import { Generic } from "@/services/api/types/generic";

import { Manufacturer } from "@/services/api/types/manufacturer";

export type Product = {
  categories: Category[];

  generics: Generic[];

  manufacturer?: Manufacturer | null;

  manufactureDate?: string | null;

  expiryDate: string | null;

  stock: number | null;

  isPrescriptionRequired?: boolean;

  description?: string;

  name: string;

  id: string;
  createdAt: string;
  updatedAt: string;
};
