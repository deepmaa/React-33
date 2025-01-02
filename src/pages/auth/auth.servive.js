import HttpService from "../../services/http-service";

class AuthService extends HttpService {
  registerUser = async (data) => {
    try {
      const result = await this.postRequest("/auth/register", data, {
        files: true,
      });
      return result;
    } catch (exeption) {
      console.log("registerUser", exeption);
      throw exeption;
    }
  };

  activateUsingOTP = async (data) => {
    try {
      const result = await this.postRequest("/auth/activate", data);
      return result;
    } catch (exception) {
      console.log("registerUser", exception);
      throw exception;
    }
  };

  resendOtp = async (data) => {
    try {
      const result = await this.postRequest("/auth/resend-otp", data);
      return result;
    } catch (exception) {
      console.log("registerUser", exception);
      throw exception;
    }
  };
}

const authSvc = new AuthService();

export default authSvc;
