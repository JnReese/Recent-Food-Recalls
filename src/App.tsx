import States from "./components/States";
import "./App.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "styled-components";
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
  stateFilter: string;
}

export const FoodDataContext = createContext<FoodData>({} as FoodData);

function App() {
  const [foodData, setFoodData] = useState<FoodsInfo>();
  const [stateFilter, setStateFilter] = useState<string>("");
  const [loader, setLoader] = useState<string>("none");

  useEffect(() => {
    if (stateFilter) {
      setLoader("flex");
      fetch(
        `https://api.fda.gov/food/enforcement.json?search=report_date:[20220101+TO+20221231]${`+AND+state:${stateFilter}`}&limit=999`
      )
        .then((response) => response.json())
        .then((data) => {
          setFoodData(data);
          setLoader("none");
        });
    }
  }, [stateFilter]);

  return (
    <div className="App">
      <Title>Recent Food Recalls</Title>
      <SubTitle> Recalls for the 2022 calendar year </SubTitle>
      <FoodDataContext.Provider value={{ foodData: foodData, stateFilter: stateFilter }}>
        <States setStateFilter={setStateFilter} />
        <Box sx={{ display: loader, justifyContent: "center", marginTop: "1em" }}>
          <CircularProgress />
        </Box>
      </FoodDataContext.Provider>
    </div>
  );
}

export default App;

const Title = styled.h1`
  font-family: "Open Sans", sans-serif;
`;

const SubTitle = styled.h2`
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-size: unset;
  font-style: italic;
`;
