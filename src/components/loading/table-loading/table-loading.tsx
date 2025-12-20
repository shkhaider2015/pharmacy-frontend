import React from "react";
import Table from "@mui/material/Table";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

interface TableLoadingProps {
  rows?: number;
  columns?: number;
}

const TableLoading = ({ rows = 5, columns = 4 }: TableLoadingProps) => {
  return (
    <Container>
      <Box mb={5} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton variant="text" width="20%" height={70} />
        <Skeleton variant="text" width="10%" height={70} />
      </Box>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              {/* Create header skeletons */}
              {[...Array(columns)].map((_, index) => (
                <TableCell key={`header-${index}`}>
                  <Skeleton variant="text" width="60%" height={25} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Create rows skeletons */}
            {[...Array(rows)].map((_, rowIndex) => (
              <TableRow key={`row-${rowIndex}`}>
                {[...Array(columns)].map((_, colIndex) => (
                  <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                    <Skeleton
                      variant="rounded"
                      width={colIndex === 0 ? "40%" : "80%"} // Vary widths for realism
                      height={20}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableLoading;
