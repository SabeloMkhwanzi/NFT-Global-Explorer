/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Table, Tr, Th, Td, Text, useColorModeValue } from "@chakra-ui/react";
import {
  Box,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableFooter,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    maxWidth: 1130,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    borderRadius: 8,
    padding: "3px 10px",
    display: "center",
  },
}));

export default function TableData({ data, onClick }) {
  console.log(data);

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {" "}
      <Box
        display="flex"
        justifyContent="space-between"
        ml={"100px"}
        alignItems="center"
      >
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table
            cursor={"pointer"}
            borderColor="purple.600"
            borderWidth={3}
            className={classes.table}
            aria-label="simple table"
            bg="#11052c"
          >
            <TableHead>
              <TableRow>
                <Th>
                  <Text color="#b5ffd9" fontWeight="semibold" fontSize="lg">
                    Collection
                  </Text>
                </Th>
                <Th>
                  <Text color="#b5ffd9" fontWeight="semibold" fontSize="lg">
                    Market Cap
                  </Text>
                </Th>
                <Th>
                  <Text color="#b5ffd9" fontWeight="semibold" fontSize="lg">
                    24hr Volume
                  </Text>
                </Th>
                <Th>
                  <Text color="#b5ffd9" fontWeight="semibold" fontSize="lg">
                    Avg Price
                  </Text>
                </Th>
                <Th>
                  <Text color="#b5ffd9" fontWeight="semibold" fontSize="lg">
                    Transaction
                  </Text>
                </Th>
                <Th>
                  <Text color="#b5ffd9" fontWeight="semibold" fontSize="lg">
                    Wallets
                  </Text>
                </Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((o, i) => {
                  return (
                    <Tr
                      key={i}
                      onClick={() => {
                        onClick(o.collection_address);
                      }}
                    >
                      <Td color={useColorModeValue("white", "gray.200")}>
                        {o.collection_name ? o.collection_name : "null"}
                      </Td>
                      <Td color={useColorModeValue("white", "gray.200")}>
                        {o.market_cap_quote
                          ? formatter.format(o.market_cap_quote).split(".")[0]
                          : "null"}
                      </Td>
                      <Td color={useColorModeValue("white", "gray.200")}>
                        {o.volume_quote_24h
                          ? formatter.format(o.volume_quote_24h).split(".")[0]
                          : "null"}
                      </Td>
                      <Td color={useColorModeValue("white", "gray.200")}>
                        {" "}
                        {o.avg_volume_quote_24h
                          ? formatter
                              .format(o.avg_volume_quote_24h)
                              .split(".")[0]
                          : "null"}
                      </Td>
                      <Td color={useColorModeValue("white", "gray.200")}>
                        {o.transaction_count_alltime
                          ? numberWithCommas(o.transaction_count_alltime)
                          : "null"}
                      </Td>
                      <Td color={useColorModeValue("white", "gray.200")}>
                        {o.unique_wallet_purchase_count_alltime
                          ? numberWithCommas(
                              o.unique_wallet_purchase_count_alltime
                            )
                          : "null"}
                      </Td>
                    </Tr>
                  );
                })}
            </TableBody>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                bg={useColorModeValue("white", "gray.800")}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
