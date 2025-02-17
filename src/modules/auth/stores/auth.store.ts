import type AuthUserInterface from '@/modules/auth/interfaces/auth.user.interface';
import { AUTH_TOKEN_COOKIE_KEY } from '@/shared/constants';
import authApi from '@/modules/auth/services/auth.api';
import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  token: string | null;
  user: AuthUserInterface | null;
  login: (data: AuthLoginParams) => Promise<void>;
  register: (data: AuthRegisterParams) => Promise<void>;
  logout: () => void;
}

interface AuthLoginParams {
  email: string;
  password: string;
}

interface AuthRegisterParams {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
}

const AUTH_DATA_COOKIE = 'AUTH_DATA_COOKIE';

const initialToken = Cookies.get(AUTH_TOKEN_COOKIE_KEY) || null;
const initialUserData = Cookies.get(AUTH_DATA_COOKIE);
const initialUser = initialUserData ? JSON.parse(initialUserData) : null;

const useAuthStore = create<AuthState>((set, get) => ({
  token: initialToken,
  user: initialUser,
  login: (requestData: AuthLoginParams) =>
    new Promise<void>(async (resolve, reject) => {
      try {
        setAuthResponseHelper(set, await authApi.login(requestData));
        resolve();
      } catch (e) {
        reject(e);
      }
    }),
  register: (requestData: AuthRegisterParams) =>
    new Promise<void>(async (resolve, reject) => {
      try {
        setAuthResponseHelper(set, await authApi.register(requestData));
        resolve();
      } catch (e) {
        reject(e);
      }
    }),
  logout: async () => {
    try {
      await authApi.logout(get().token!);
    } catch (error) {
      console.log(error);
    } finally {
      Cookies.remove(AUTH_DATA_COOKIE);
      Cookies.remove(AUTH_TOKEN_COOKIE_KEY);
      set({ token: null, user: null });
    }
  },
}));

const setAuthResponseHelper = (set, response) => {
  const { token_type, access_token, user } = response.data;
  const token = `${token_type} ${access_token}`;
  set({
    token,
    user,
  });
  Cookies.set(AUTH_TOKEN_COOKIE_KEY, token);
  Cookies.set(AUTH_DATA_COOKIE, JSON.stringify(user));
};

export default useAuthStore;
