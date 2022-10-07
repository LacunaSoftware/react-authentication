import "./App.css";
import Home from "./components/Home";

function App({ webPkiService, authenticationService }) {
  return (
    <Home
      webPkiService={webPkiService}
      authenticationService={authenticationService}
    ></Home>
  );
}

export default App;
