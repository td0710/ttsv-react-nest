import axios from "axios";

export const authService = {
  login: async (email: string, microsoftId: string, fullName: string) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      { email, microsoft_id: microsoftId, full_name: fullName },
      { withCredentials: true }
    );
    return response.data;
  },

  logout: async () => {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
  },

  checkSession: async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/check-session`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Session check failed:", error);
      throw new Error("Session invalid");
    }
  },
};
