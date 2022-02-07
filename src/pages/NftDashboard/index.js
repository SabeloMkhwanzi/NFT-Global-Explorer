import React, { useEffect, useState } from "react";
import SelectDropdown from "../../comps/selectDropdown";
import TableData from "../../comps/tableData";
import { useHistory } from "react-router-dom";
import { CONFIG } from "../../config";

import axios from "axios";

import { Box, Spinner, Text, Button } from "@chakra-ui/react";

export default function NftDashboard() {
  const history = useHistory();
  const [chain, setChain] = useState(1);
  const [market, setMarket] = useState([]);
  const [activeLoader, setLoader] = useState(true);
  //const API_KEY = process.env['REACT_APP_COVALENT_API']
  const API_KEY = "ckey_4e73d56514984838ab3206fbaf4";

  useEffect(() => {
    handleMarket(chain);
  }, [chain]);

  // Request for market (global view)
  const handleMarket = async (id) => {
    setLoader(true);
    try {
      const resp = await axios.get(
        `https://api.covalenthq.com/v1/${id}/nft_market/?&key=${API_KEY}`
      );
      setMarket(resp.data.data.items);
      setLoader(false);
    } catch (error) {}
  };

  return (
    <>
      <Box padding="2rem" position="relative">
        <Box
          height="10%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box
            display="flex"
            justifyContent="start"
            alignItems="start"
            pos="relative"
            overflow="hidden"
            pb="10"
            cursor="pointer"
          >
            <Button
              borderRadius="full"
              width="250"
              bgGradient="linear(to-r, purple.600,green.500)"
              _hover={{ bg: "brand.700" }}
              className="back"
              onClick={() => {
                history.goBack();
              }}
              color="white"
            >
              Back
            </Button>
          </Box>

          <Box
            display="flex"
            justifyContent="right"
            alignContent="center"
            mb="2"
          >
            <SelectDropdown
              options={CONFIG.FILTER_OPTIONS}
              onChange={(e) => {
                setChain(e.target.value);
              }}
            />
          </Box>

          <Box mb="4">
            <Text
              textTransform="uppercase"
              color="#3c9b6f"
              fontSize="lg"
              fontWeight="semibold"
              size="md"
              ml={5}
              letterSpacing={2}
              p={"8px 60px 0px 0px"}
            >
              Select collection
            </Text>
          </Box>
          {activeLoader ? (
            <Box display="flex" justifyContent="center" alignContent="center">
              <Spinner
                //mx={"550px"}
                my={"40"}
                thickness="6px"
                speed="0.3s"
                color="#3c9b6f"
                emptyColor="gray.200"
                size="xl"
              />
            </Box>
          ) : (
            <TableData
              onClick={(id) => {
                history.push(`/collection/${id}/${chain}`);
              }}
              data={market}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
