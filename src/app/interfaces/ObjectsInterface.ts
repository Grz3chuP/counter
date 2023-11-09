export interface ObjectInterface {
  id: number;
  category_id: number;
  object_name: string;
  value: number;
  created_at: string;
  updated_at: string;
}
export interface RootObjectInterface {
  objects: ObjectInterface[];
}
