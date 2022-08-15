import States from "./components/States";
import "./App.css";
import { useEffect, createContext, useState } from "react";

interface FoodDataResult {
  state: string;
  recalling_firm: string;
  reason_for_recall: string;
  product_description: string;
}

interface FoodsInfo {
  results: FoodDataResult[];
  error: {};
}

interface FoodData {
  foodData?: FoodsInfo;
  testProperty?: any;
}

export const FoodDataContext = createContext<FoodData>({} as FoodData);

function App() {
  const [foodData, setFoodData] = useState<FoodsInfo>();
  const [stateFilter, setStateFilter] = useState<string>("");

  useEffect(() => {
    fetch(
      `https://api.fda.gov/food/enforcement.json?search=report_date:[20220101+TO+20221231]${
        stateFilter ? `+AND+state:${stateFilter}` : ""
      }&limit=999`
    )
      .then((response) => response.json())
      .then((data) => {
        setFoodData(data);
      });
  }, [stateFilter]);

  return (
    <div className="App">
      <FoodDataContext.Provider value={{ foodData: foodData }}>
        <States setStateFilter={setStateFilter} />
      </FoodDataContext.Provider>
    </div>
  );
}

export default App;
