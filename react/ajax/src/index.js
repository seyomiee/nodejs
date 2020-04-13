import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

/**
 * / 
 
 
(Homepage) https://api.coinpaprika.com/v1/tickers
/exchanges https://api.coinpaprika.com/v1/exchanges
/coins https://api.coinpaprika.com/v1/coins


Homepage: Show the name of the coin, the symbol and price.
Exchanges: Show the name of the exchange, description and website link.
Coins: List the coins and sort them by rank.


Global Requirements:

Use Container/Presenter pattern with class components.
DO NOT use Hooks. I know they are awesome, we will use them later.
ALL PRESENTERS should use PropTypes.
Use PropTypes.shape
Use async/await
All AJAX requests MUST be made with an AXIOS INSTANCE ('axios.create')
Containers MUST NEVER call Axios directly, they should call the instance.
Use a Loader Component.

 */
