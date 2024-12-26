import HttpService from "../../services/http-service";

class AuthService extends HttpService {
  registerUser = async(data) => {
    try {
      const result = await this.postRequest("auth/register", data, { files: true })
	  console.log("registerSuccess", result)
    return result;
    } catch (exeption) {
      console.log("register", exeption)
      throw exeption
    }
  };
}

const authSvc = new AuthService()

export default authSvc;
