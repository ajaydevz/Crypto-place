import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$"
  });
//   const [error, setError] = useState(null);  // To capture fetch errors

  // Fetch all coins with improved error handling
  const fetchAllCoin = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-pEotGBs4xyfEhUzns2jybpoz" // Validate this key
        }
      };

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setAllCoin(data);
    } catch (err) {
      console.error("Fetch error: ", err);
    //   setError(err.message);  // Set error state
    }
  };

  // Trigger fetch whenever the currency changes
  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
    // error  // Pass error to context for usage elsewhere
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
