import States from "./components/States";
import "./App.css";
import { useEffect, createContext, useState } from "react";
import styled from "styled-components";

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
  stateFilter: string;
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
      <Title>Recent Food Recalls</Title>
      <SubTitle> Recalls for the 2022 calendar year </SubTitle>
      <FoodDataContext.Provider value={{ foodData: foodData, stateFilter: stateFilter }}>
        <States setStateFilter={setStateFilter} />
      </FoodDataContext.Provider>
    </div>
  );
}

export default App;

const Title = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Lora:wght@600&display=swap");
  font-family: "Lora", serif;
`;

const SubTitle = styled.h2`
  font-family: "Lora", serif;
  font-weight: 300;
  font-size: unset;
`;
