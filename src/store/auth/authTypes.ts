// src/store/auth/authTypes.ts

import { User } from '../../types';

export interface AuthState {
  user: User | null;
  token: string | null;
}

