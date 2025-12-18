export enum RoleEnum {
  ADMIN = 1,
  PHARMACIST = 2,
  CASHIER = 3,
  MANAGER = 4,
  USER = 5,
}

export type Role = {
  id: number | string;
  name?: string;
};
