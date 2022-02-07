import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NftDashboard from "./pages/NftDashboard";
import CollectionView from "./pages/CollectionView";
import NFTView from "./pages/NFTView";
import Minter from "./pages/Minter";
import LandingPage from "./pages/Landing";
//const dotenv = require("dotenv");

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Minter" component={Minter}>
            <Minter />
          </Route>
          <Route path="/nft/:address/:id/:chainId">
            <NFTView />
          </Route>
          <Route path="/collection/:address/:id">
            <CollectionView />
          </Route>
          <Route path="/NftDashboard" component={NftDashboard} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    </div>
  );
}
