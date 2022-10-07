import LacunaWebPKI from "web-pki";

import config from "../config.json";

export default class WebPkiService {
  constructor() {
    this._webpki = new LacunaWebPKI();
  }

  async init() {
    return new Promise((resolve) => {
      this._webpki.init({
        restPkiUrl: config.RESTPKI_ENDPOINT,
        ready: resolve,
      });
    });
  }

  async loadCertificates() {
    return new Promise((resolve, reject) =>
      this._webpki.listCertificates().success(resolve).fail(reject)
    );
  }

  async signWithRestPki(thumbprint, token) {
    return new Promise((resolve, reject) =>
      this._webpki
        .signWithRestPki({ token, thumbprint })
        .success(resolve)
        .fail(reject)
    );
  }
}
