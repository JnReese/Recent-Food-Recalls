import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { FoodDataContext } from "../App";

function createData(state: string, product_description: string, reason_for_recall: string, recalFirm: string) {
  return { state, product_description, reason_for_recall, recalFirm };
}

export default function BasicTable() {
  const { foodData } = useContext(FoodDataContext);

  const newRows = () => {
    return foodData
      ? foodData?.results?.map((recall) =>
          createData(recall.state, recall.product_description, recall.reason_for_recall, recall.recalling_firm)
        )
      : [];
  };

  console.log(foodData?.error, "beams");
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Effected State </TableCell>
            <TableCell align="right">Recall Firm</TableCell>
            <TableCell align="right">Product Description</TableCell>
            <TableCell align="right">Recall Reason</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foodData?.error ? (
            <div className="noDataHandler">No Recalls for this State</div>
          ) : (
            newRows()?.map((row, idx) => {
              return (
                <TableRow key={idx} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.state}
                  </TableCell>
                  <TableCell align="right">{row.recalFirm}</TableCell>
                  <TableCell align="right">{row.product_description}</TableCell>
                  <TableCell align="right">{row.reason_for_recall}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
