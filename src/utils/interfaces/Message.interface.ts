export interface Message<T = null> {
  message?: string;
  status: boolean;
  data?: T;
  count?: number;
}
