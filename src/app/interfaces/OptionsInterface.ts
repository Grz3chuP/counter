export interface OptionsInterface {
  id: number;
  user_id: number;
  step_value: number;
  max_value: number;
  created_at: string;
  updated_at: string;
}
export interface RootOptionsInterface {
  options: OptionsInterface;
}
