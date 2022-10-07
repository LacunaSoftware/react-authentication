import axios from "axios";

import config from "../config.json";

export default class AuthenticationService {
  constructor() {
    this._axios = axios.create({
      baseURL: config.BACKEND_ENDPOINT,
    });
  }

  async start() {
    return await this._axios.post("/auth/start").then((res) => res.data);
  }

  async complete(token) {
    return await this._axios
      .post("/auth/complete", { token })
      .then((res) => res.data);
  }
}
