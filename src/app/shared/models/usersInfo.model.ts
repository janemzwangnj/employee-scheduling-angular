import { User } from "./user.model";

export interface UsersInfo {
  name: string;
  phone: string; 
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  user: User
}