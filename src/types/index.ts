export type UserRole = 'Student' | 'Teacher' | 'Admin';

export interface User {
  username: string;
  full_name: string;
  role: UserRole;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}