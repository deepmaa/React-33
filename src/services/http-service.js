import { data } from "autoprefixer"
import axiosInstance from "../config/axios.config"

class HttpService {
  config = {
    Headers: {
      "Content-Type" : "application/json"
    }
  }

  setConfig = (reqConfig) => {
    if (reqConfig.file || reqConfig.files) {
      this.config = {
        ...this.config,
        headers: {
          ...this.config.headers,
          "Content-Type": "multipart/form-data"
        }
      }
    }

    if (reqConfig.auth) {
        this.config = {
          ...this.config,
          headers: {
            ...this.config.headers,
            "Authorization" : "",
          }
        }
    }

    if (reqConfig.params) {
      this.config = {
        ...this.config,
        params: {
          ...this.config,
          ...reqConfig.params
        }
      }
    }
  }

  getRequest = () => {

  }

  postRequest = async(url, data = {}, config=null) => {
    try {
      if (config) {
        this.setConfig(config)
      }
      const response = await axiosInstance.post(url, data, this.config)
      console.log("Success", response)
      return response
    } catch (exeption) {
      console.log("postRequest", exeption)
      throw exeption
    }
  }

  putRequest = () => {

  }

  patchRequest = () => {

  }

  deleteRequest = () => {

  }
}

export default HttpService;