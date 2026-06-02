export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  showOnHome: boolean;
  displayOrder: number;
  isCombo?: boolean;
  createdAt: string;
  updatedAt?: string;
}
