export interface Category {
  id: number;
  category_name: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}
export interface RootObject {
  categories: Category[];
  last_used_category_id?: number | null;
}
