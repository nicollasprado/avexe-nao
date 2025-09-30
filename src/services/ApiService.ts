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

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          await this.refreshToken();
          return this.axiosInstance(error.config);
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshToken() {
    const res = await axios.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );

    this.accessToken = res.data.accessToken;
  }

  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  public get axios() {
    return this.axiosInstance;
  }
}

export const apiService = new ApiService();
