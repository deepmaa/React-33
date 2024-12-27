import HttpService from "../../services/http-service";

class AuthService extends HttpService {
  registerUser = async(data) => {
    try {
      const result = await this.postRequest("/auth/register", data, { files: true })
      return result;
    } catch (exeption) {
      console.log("register", exeption)
      throw exeption
    }
  };
}

const authSvc = new AuthService()

export default authSvc;
