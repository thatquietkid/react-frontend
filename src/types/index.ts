<<<<<<< HEAD
export type UserRole = 'Student' | 'Teacher' | 'Admin' | 'Maintenance Staff';
=======
export type UserRole = 'Student' | 'Teacher' | 'Admin';
>>>>>>> f6289686b729762440b51042e7cc0b34c1ce7fe1

export interface User {
  username: string;
  full_name: string;
  role: UserRole;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}