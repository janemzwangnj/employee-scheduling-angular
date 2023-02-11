export interface User {
  id?: number;
  username: string;
  password: string; 
  profiles?: [{
    id: number,
    type?: string
  }]
}