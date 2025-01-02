import axiosInstance from "../config/axios.config";

class HttpService {
  config = null;

  setConfig = (reqConfig) => {
    this.config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    console.log(reqConfig)
    if (reqConfig.file || reqConfig.files) {
      this.config = {
        ...this.config,
        headers: {
          ...this.config.headers,
          "Content-Type": "multipart/form-data",
        }
      }
    }

    if (reqConfig.auth) {
      this.config = {
        ...this.config,
        headers: {
          ...this.config.headers,
          Authorization: "",
        }
      }
    }

    if (reqConfig.params) {
      this.config = {
        ...this.config,
        params: {
          ...this.config,
          ...reqConfig.params,
        }
      }
    }
  }

  getRequest = () => {};

  postRequest = async (url, data = {}, config = null) => {
    try {
      if (config) {
        this.setConfig(config);
      }
      const response = await axiosInstance.post(url, data, this.config);
      console.log("Success", response);
      return response;
    } catch (exeption) {
      console.log("postRequest", exeption);
      throw exeption;
    }
  };

  putRequest = async (url, data = {}, config = null) => {
    try {
      this.config = null;
      if (config) {
        this.setConfig(config);
      }
      const response = await axiosInstance.put(url, data, this.config);
      return response;
    } catch (exception) {
      console.log("putRequest", exception);
      throw exception;
    }
  };

  patchRequest = () => {};

  deleteRequest = () => {};
}

export default HttpService;
