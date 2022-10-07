import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { certs: [], selectedCertThumbprint: "" };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      webPkiService: props.webPkiService,
      authenticationService: props.authenticationService,
    };
  }

  async componentDidMount() {
    await this.state.webPkiService.init();
    await this._loadCertificates();
  }

  async _loadCertificates() {
    console.log("load certificates");
    const certs = await this.state.webPkiService.loadCertificates();

    const state = this.state;
    state.certs = certs;
    state.selectedCertThumbprint = this.state.certs[0].thumbprint;
    this.setState(state);
  }

  async _authenticate() {
    const token = await this.state.authenticationService.start();

    const thumbprint = this.state.selectedCertThumbprint;
    await this.state.webPkiService.signWithRestPki(thumbprint, token);

    const result = await this.state.authenticationService.complete(token);
    if (result.isValid) {
      alert(
        `Authenticated with success:
Name: ${result.certificate.name}
Email: ${result.certificate.email}
CPF: ${result.certificate.cpf}
Expira em: ${result.certificate.validityEnd}`
      );
    } else {
      alert(`the certificate is not valid: ${result.validation}`);
    }
  }

  _handleCertSelectionChange(e) {
    const state = this.state;
    state.selectedCertThumbprint = e.target.value;
    this.setState(state);
  }

  render() {
    return (
      <div className="Home">
        <div>
          <h2>Authentication</h2>

          <div>
            <form>
              <div>
                <label>Choose a certificate</label>
                <select
                  value={this.state.selectedCertThumbprint}
                  onChange={(e) => this._handleCertSelectionChange(e)}
                >
                  {this.state.certs &&
                    this.state.certs.map((cert) => (
                      <option key={cert.thumbprint} value={cert.thumbprint}>
                        {cert.subjectName}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <button
                  type="button"
                  onClick={async () => await this._authenticate()}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={async () => this._loadCertificates()}
                >
                  Refresh Certificates
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
