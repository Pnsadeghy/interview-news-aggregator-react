import apiInstance from '@/shared/utils/api.utils';

const authApi = {
  login: (data: { email: string; password: string }) =>
    apiInstance.post(process.env.AUTH_LOGIN_API!, data),
  register: (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => apiInstance.post(process.env.AUTH_REGISTER_API!, data),
  logout: (token: string) =>
    apiInstance.post(
      process.env.AUTH_LOGOUT_API!,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),
};

export default authApi;
