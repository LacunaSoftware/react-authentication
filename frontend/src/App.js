// import logo from './logo.svg';
import $ from "jquery";
import "./App.css";
import signatureForm from "./signature-form.js";

function App(props) {
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
              <label htmlFor="certificateSelect">Choose a certificate</label>
              <select id="certificateSelect" className="custom-select"></select>
            </div>

            <div className="form-group">
              <button
                id="signInButton"
                type="button"
                className="btn btn-primary"
              >
                <i className="fas fa-user"></i> Sign In
              </button>
              <button
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

export default App;
