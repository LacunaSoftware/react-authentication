// import logo from './logo.svg';
import { $ } from "jquery";
import { useEffect, useRef } from "react";
import "./App.css";
import signatureForm from "./signature-form.js";

function App(props) {
  var signButton = useRef(null);
  var refreshButton = useRef(null);
  var form = useRef(null);
  var certificateSelect = useRef(null);

  useEffect(() => {
    console.log(certificateSelect);
    console.log(refreshButton);
    console.log(signButton);
    signatureForm.init({
      token: props.token.data, // The token acquired from REST PKI.
      form: form.current, // The form that should be submitted when the operation is completed.
      certificateSelect: certificateSelect.current, // The <select> element (combo box) to list the certificates.
      refreshButton: refreshButton.current, // The "refresh" button.
      signButton: signButton.current, // The button that initiates the operation.
    });
  });
  return (
    <div className="App">
      <div className="content">
        <h2 className="ls-title">Authentication with REST PKI</h2>

        <div className="ls-content">
          <form id="signInForm" method="POST">
            <input
              type="hidden"
              id="tokenField"
              name="token"
              value={props.token}
            />
            <div className="form-group">
              <label htmlFor="certificateSelect">
                Choose a certificate
              </label>
              <select ref={certificateSelect} id="certificateSelect" className="custom-select"></select>
            </div>

            <div className="form-group">
              <button
                ref={signButton}
                id="signInButton"
                type="button"
                className="btn btn-primary"
              >
                <i className="fas fa-user"></i> Sign In
              </button>
              <button
                ref={refreshButton}
                id="refreshButton"
                type="button"
                className="btn btn-outline-primary"
              >
                <i className="fas fa-retweet"></i> Refresh Certificates
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Once the page is ready, we call the init() function on the javascript code (see signature-form.js).

export default App;
