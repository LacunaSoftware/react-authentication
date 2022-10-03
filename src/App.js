// import logo from './logo.svg';
import $ from 'jquery';
import './App.css';
import LacunaWebPKI from 'web-pki';

function App() {
  return (
    <div className="App">
      <h2>Web PKI - Send authenticated request Example</h2>
      <select id="certificateSelect"></select>
      <button id="refreshCertificates" type="button">Refresh Certificates</button><br /><br />
      <button id="sendRequest" type="button">Send</button><br />

      <h3>Response</h3>
      <textarea id="responseArea" rows="18" cols="170"></textarea>
      <div id="logPanel"></div>
    </div>
  );
}


// ------------------------------------------------------------------------------------------
// LacunaWebPKI: Send authenticated request Example

var pki = new LacunaWebPKI('ASYAanNmaWRkbGUubmV0LHdlYnBraS5sYWN1bmFzb2Z0d2FyZS5jb20AAAABClKvO1J22vAD+YmfANiKQLbcLE1lNraPKCel6tRM+ZxR+h6M/crtJYRRVGGz7hrdbM0Y0mfTu15RMYGqQMi1QNZS6GrT4vNzIayv552Fl0EFWQA7jWlctUwfYoHRHVEnCNx9YGXDiA9+yDoGlVwgTR7fjzNeS3Fen1MVIyKBF464gN0JvdiCRJMI47JGVDkPmKjcrYIvJs6y5Lg25RW4ZnBKVruS+HR2s3k8ZrV4y4RCQE4UYMKbukF9vsF+JqAEifRlPq2xLcrNdxBveVDSXS/LRHAcrZrMM+Iw4A79jl0ngWPcy+CwinAhT+3dxVo5ZWMRQFpmTkylEMDvTjV9wQ==');

// Setup the request parameters
var request = {
    // Service URL
    url: 'https://nfe-homologacao.svrs.rs.gov.br/ws/NfeStatusServico/NfeStatusServico4.asmx',
    method: 'post',
    headers: {
        'Content-Type': 'application/soap+xml; charset=utf-8'
    },
    // Request SOAP envelope
    body: '<?xml version="1.0" encoding="utf-8"?><soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body><nfeDadosMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeStatusServico4"><consStatServ xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00"><tpAmb>2</tpAmb><cUF>53</cUF><xServ>STATUS</xServ></consStatServ></nfeDadosMsg></soap12:Body></soap12:Envelope>'
};
// ----------------------------------------

function sendRequest() {
    // Set the user certificate to authenticate the request
    request.certificateThumbprint = $('#certificateSelect').val();
    if (!request.certificateThumbprint) {
        alert('Please select a certificated');
        return;
    }
    
    log('Sending request')
    pki.sendAuthenticatedRequest(request).success(function (response) {
        log('Printing response');
        printResponse(response);
    });
}

function printResponse(response) {
    var contentText = '';
    if (response.content) {
        // get string of Base64 content
        contentText = atob(response.content);
    }
    // write response to view text
    $('#responseArea').val(JSON.stringify({
        status: response.status,
        statusCode: response.statusCode,
        headers: response.headers,
        content: contentText
    }, null, 2));
}

function start() {
    log('Initializing component ...');
    pki.init({
        ready: onWebPkiReady,
        requiredApiVersion: pki.apiVersions.v1_4
    });
}

function onWebPkiReady () {
    log('Component ready, listing certificates ...');
    refreshCertificates();
}

function refreshCertificates() {
    pki.listCertificates({
        selectId: 'certificateSelect'
    }).success(function (certs) {
        log(certs.length + ' certificates found.');
    });
}

function log(message) {
    $('#logPanel').append('<p>' + message + '</p>');
    console.log(message);
}

$(function() {
    $('#refreshCertificates').click(refreshCertificates);
    $('#sendRequest').click(sendRequest);
    start();
});


export default App;
