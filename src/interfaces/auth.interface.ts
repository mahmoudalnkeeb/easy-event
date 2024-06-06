export interface UserSignup {
  fullname: string;
  username: string;
  password: string;
  email: string;
  phone: string;
}

export interface AdminSignup {
  username: string;
  email: string;
  password: string;
  access_level?: 'ADMIN' | 'SUPER_ADMIN' | 'ATTENDANCE_MANAGER';
}

export interface EmailLogin {
  email: string;
  password: string;
}

export interface UsernameLogin {
  username: string;
  password: string;
}
