import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useRef, useEffect, useState } from "react";
import { FoodDataContext } from "../App";
import styled from "styled-components";

function createData(state: string, product_description: string, reason_for_recall: string, recalFirm: string) {
  return { state, product_description, reason_for_recall, recalFirm };
}

export default function BasicTable() {
  const { foodData } = useContext(FoodDataContext);
  const [width, setWidth] = useState<number>(0);
  const [currentlyExpanded, setCurrentlyExpanded] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current?.offsetWidth) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  const newRows = () => {
    return foodData
      ? foodData?.results?.map((recall) =>
          createData(recall.state, recall.product_description, recall.reason_for_recall, recall.recalling_firm)
        )
      : [];
  };

  const handleLongDescription = (prod: string, idx: number) => {
    if (prod.length > 125 && !currentlyExpanded.includes(idx)) {
      return prod.substring(0, 125) + "...  ";
    }
    return prod;
  };

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>, idx: number) => {
    setCurrentlyExpanded([idx]);
    if (currentlyExpanded.includes(idx)) {
      setCurrentlyExpanded([]);
      e.currentTarget.childNodes[0].textContent = "⮟";
    } else {
      e.currentTarget.childNodes[0].textContent = "⮝";
    }
  };

  return (
    <TableContainer component={Paper} ref={ref} sx={{ marginTop: "1em" }}>
      <Table sx={{ minWidth: 375, display: "table", tableLayout: "fixed", width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: 600, fontSize: "1.3em" }}>
              Recall Firm
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 600, fontSize: "1.3em" }}>
              Product Description
            </TableCell>
            {width > 572 ? (
              <TableCell align="left" sx={{ fontWeight: 600, fontSize: "1.3em" }}>
                Recall Reason
              </TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {foodData?.error ? (
            <TableRow>
              <TableCell align="left" sx={{ display: "flex", tableLayout: "fixed", width: "100%" }}>
                No Recalls for this State
              </TableCell>
            </TableRow>
          ) : (
            newRows()?.map((row, idx) => {
              return (
                <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left">{row.recalFirm}</TableCell>
                  <TableCell align="left">
                    {row.product_description.length > 125
                      ? handleLongDescription(row.product_description, idx)
                      : row.product_description}
                    {row.product_description.length > 125 ? (
                      <Expand onClick={(e) => handleExpand(e, idx)}>⮟</Expand>
                    ) : null}
                  </TableCell>

                  {width > 572 ? <TableCell align="left">{row.reason_for_recall}</TableCell> : null}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const Expand = styled.button`
  margin-left: 10px;
  font-family: "Open Sans", sans-serif;
  font-size: 9px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 1px 1px 0px 0px, 2px 2px 0px 0px, 1px 1px 0px 0px, 2px 2px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:active {
    box-shadow: 10px;
  }

  @media (min-width: 768px) {
    padding: 0.25em 0.75em;
  }
`;
