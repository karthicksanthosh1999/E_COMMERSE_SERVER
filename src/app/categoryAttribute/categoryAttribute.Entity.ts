export interface CategoryAttributeEntity {
  id: string;
  categoryId: string;

  key: string;
  label: string;

  type: string;
  scope: string;

  isRequired: boolean;
  options: unknown | null;

  position: number;
  isActive: boolean;
}