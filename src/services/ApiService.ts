import axios, { AxiosInstance } from "axios";

class ApiService {
  private axiosInstance: AxiosInstance;
  private accessToken: string | null = null;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.API_URL,
    });

    this.axiosInstance.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(async (res) => {
      if (res.status === 401 || res.status === 203) {
        try {
          await this.refreshToken();
          return this.axiosInstance(res.config);
        } catch (error) {
          return res;
        }
      }

      return res;
    });
  }

  private async refreshToken() {
    const res = await axios.post(
      "/api/auth/refresh",
      {},
      { withCredentials: true }
    );

    this.accessToken = res.data.token;
  }

  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  public get axios() {
    return this.axiosInstance;
  }
}

export const apiService = new ApiService();
