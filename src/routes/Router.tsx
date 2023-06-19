import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";

function Router() {
  return (
    <BrowserRouter basename="/react-masterclass-coins">
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route exact path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
