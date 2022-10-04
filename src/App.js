// import logo from './logo.svg';
import $ from 'jquery';
import './App.css';
import signatureForm from './signature-form.js'
import LacunaWebPKI from 'web-pki';
import config from './config.js';

function App(token) {
  return (
    <div className="App">
        <div className="content">
        <h2 className="ls-title">Authentication with REST PKI</h2>

        <div className="ls-content">
            <form id="signInForm" method="POST">
                <input type="hidden" id="tokenField" name="token" value={token}/>
                <div className="form-group">
                    <label htmlFor="certificateSelect">Choose a certificate</label>
                    <select id="certificateSelect" className="custom-select"></select>
                </div>

                <div className="form-group">
                    <button id="signInButton" type="button" className="btn btn-primary">
                        <i className="fas fa-user"></i> Sign In
                    </button>
                    <button id="refreshButton" type="button" className="btn btn-outline-primary">
                        <i className="fas fa-retweet"></i> Refresh Certificates
                    </button>
                </div>
            </form>
            </div>
        </div>
    </div>
  );
}

// ------------------------------------------------------------------------------------------
// LacunaWebPKI: Send authenticated request Example
// ----------------------------------------

$(document).ready(function () {
		// Once the page is ready, we call the init() function on the javascript code
		// (see signature-form.js).
		signatureForm.init({
			form: $('#signInForm'),                     // The form that should be submitted when the operation is complete.
			certificateSelect: $('#certificateSelect'), // The <select> element (combo box) to list the certificates.
			refreshButton: $('#refreshButton'),         // The "refresh" button.
			signButton: $('#signInButton'),             // The button that initiates the operation.
			token: config._token                         // The token acquired from REST PKI.
    });
});

export default App;
