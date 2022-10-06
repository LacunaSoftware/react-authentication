function Complete(userCert) {
  return (
    <div className="content">
      <h2 class="ls-title">Authentication with REST PKI</h2>
      <h5 class="ls-subtitle">
        Authentication succeeded{" "}
        <i class="fas fa-check-circle text-success"></i>
      </h5>
      <div class="ls-content">
        <p>
          User certificate information:
          <ul>
            <li>
              <strong>Subject</strong>:{" "}
              <span text="{userCert.getSubjectName().getCommonName()}" />
            </li>
            <li>
              <strong>Email</strong>:{" "}
              <span text="{userCert.getEmailAddress()}" />
            </li>
            <li>
              <strong>ICP-Brasil fields</strong>:
              <ul>
                <li>
                  <strong>Tipo de certificado</strong>:{" "}
                  <span text="{userCert.getPkiBrazil().getCertificateType()}" />
                </li>
                <li>
                  <strong>CPF</strong>:{" "}
                  <span text="{userCert.getPkiBrazil().getCpfFormatted()}" />
                </li>
                <li>
                  <strong>Responsavel</strong>:{" "}
                  <span text="{userCert.getPkiBrazil().getResponsavel()}" />
                </li>
                <li>
                  <strong>Empresa</strong>:{" "}
                  <span text="{userCert.getPkiBrazil().getCompanyName()}" />
                </li>
                <li>
                  <strong>CNPJ</strong>:{" "}
                  <span text="{userCert.getPkiBrazil().getCnpjFormatted()}" />
                </li>
                <li>
                  <strong>RG</strong>:{" "}
                  <span text="{userCert.getPkiBrazil().getRGNumero()}" />
                  <span text="{userCert.getPkiBrazil().getRGEmissor()}" />{" "}
                  <span text="{userCert.getPkiBrazil().getRGEmissorUF()}" />
                </li>
                <li>
                  <strong>OAB</strong>:{" "}
                  <span text="{userCert.getPkiBrazil().getOabNumero()}" />{" "}
                  <span text="{userCert.getPkiBrazil().getOabUF()}" />
                </li>
              </ul>
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
}

export default Complete;