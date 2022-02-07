import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import SelectDropdown from "../../comps/selectDropdown";
import TimeSeries from "../../comps/timeseriesChart";
import axios from "axios";
import { CONFIG } from "../../config";
import moment from "moment";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
  Spinner,
  Tr,
  Td,
  Table,
} from "@chakra-ui/react";

export default function CollectionView() {
  let { address, id } = useParams();
  const [nft, setNft] = useState([]);
  const [graphData, setGraph] = useState([]);
  const [weiData, setWei] = useState([]);
  const [activeLoader, setLoader] = useState(true);
  const [graphLoader, setGraphLoader] = useState(true);
  const [collectionData, setData] = useState([]);
  const [graphErr, setErr] = useState(false);
  const history = useHistory();
  const currentDay = moment().format("YYYY-MM-DD");

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  //const API_KEY = process.env['REACT_APP_COVALENT_API']
  const API_KEY = "ckey_4e73d56514984838ab3206fbaf4";

  useEffect(() => {
    handleCollection(7);
    handleNft();
  }, []);

  // Handle Graph data
  const handleGraph = async (filter) => {
    setGraphLoader(true);
    setErr(false);
    setGraph([]);
    setWei([]);
    let from = moment().subtract(filter, "days").format("YYYY-MM-DD");

    console.log(from, currentDay);

    // If filter is 0 (All time), apply different parameters
    let api_call =
      filter > 0
        ? // 2 dates (from - to)
          `https://api.covalenthq.com/v1/${id}/nft_market/collection/${address}/?from=${from}&to=${currentDay}&key=${API_KEY}`
        : // 1 date (current date - all data before it)
          `https://api.covalenthq.com/v1/${id}/nft_market/collection/${address}/?to=${currentDay}&key=${API_KEY}`;

    // Request for floor prices and add parameters to format for graph
    try {
      const resp = await axios.get(api_call);

      // Organize response data to insert into graph
      setGraph(
        resp.data.data.items
          .map((i) => ({ x: i.opening_date, y: i.floor_price_quote_7d }))
          .reverse()
      );

      setWei(
        resp.data.data.items
          .map((i) => ({ x: i.opening_date, y: i.floor_price_wei_7d }))
          .reverse()
      );

      setErr(false);
    } catch (error) {
      setErr(true);
    }

    setGraphLoader(false);
  };

  // Request for collection data
  const handleCollection = async (filter) => {
    try {
      const resp = await axios.get(
        `https://api.covalenthq.com/v1/${id}/nft_market/collection/${address}/?&key=${API_KEY}`
      );
      setData([...resp.data.data.items]);
    } catch (error) {}

    // Call endpoint with 7 day parameters
    handleGraph(7);
  };

  // Request for nft collection (first 5)
  const handleNft = async () => {
    let resp;
    let collection = [];
    try {
      resp = await axios.get(
        `https://api.covalenthq.com/v1/${id}/tokens/${address}/nft_token_ids/?quote-currency=USD&format=JSON&page-size=5&key=${API_KEY}`
      );

      // Request for nft metadata for display pictures
      for (let i of resp.data.data.items) {
        try {
          let resp2 = await axios.get(
            `https://api.covalenthq.com/v1/${id}/tokens/${address}/nft_metadata/${i.token_id}/?quote-currency=USD&format=JSON&key=${API_KEY}`
          );

          collection.push(
            resp2.data.data.items[0].nft_data != null
              ? resp2.data.data.items[0].nft_data[0]
              : { external_data: { image: "" } }
          );
        } catch (err) {}
      }
      setNft([...collection]);
      setLoader(false);
    } catch (err) {}
  };

  return (
    <Box pos="relative" overflow="hidden" mb="7" padding="2rem">
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

      <Box maxW="7xl" mx="auto">
        {/* Collection Section */}

        <Box>
          <Text
            textTransform="uppercase"
            color="#3c9b6f"
            fontSize="lg"
            fontWeight="semibold"
            size="md"
            my={5}
            letterSpacing={2}
          >
            Overview
          </Text>
        </Box>

        <Box
          display="flex"
          borderWidth="1px"
          borderColor="purple.600"
          borderRadius="lg"
          maxWidth={"100%"}
          direction={{ base: "column", md: "row" }}
          boxShadow={"2xl"}
          padding={"3rem"}
          bg="blackAlpha.600"
        >
          <Flex>
            {activeLoader ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#3c9b6f"
                size="xl"
              />
            ) : (
              <Image
                borderRadius={"xl"}
                maxH={"300px"}
                marginLeft={"-5%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                src={nft[0]?.external_data?.image}
                onError={(event) => {
                  event.target.classList.add("error-image");
                  event.target.classList.remove("collection-img");
                }}
              />
            )}
          </Flex>

          <Box display="flex">
            <Box>
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
                Collection Address
              </Text>
              <Text
                fontSize="lg"
                fontWeight="light"
                size="md"
                ml={5}
                p={"8px 60px 0px 0px"}
                letterSpacing={1}
                as="samp"
                color="#b5ffd9"
              >
                {address}
              </Text>
              <Table mt={"20px"}>
                <Tr
                  color="#3c9b6f"
                  p={"8px 60px 0px 0px"}
                  fontWeight="bold"
                  fontSize="20px"
                >
                  <Td border="none">Ticker Symbol</Td>
                  <Td border="none">24hr Volume</Td>
                  <Td border="none">24hr Sold Count</Td>
                </Tr>
                <Tr color="#b5ffd9" fontWeight="bold" fontSize="20px">
                  <Td border="none">
                    {collectionData[0]?.collection_ticker_symbol
                      ? collectionData[0]?.collection_ticker_symbol
                      : "null"}
                  </Td>
                  <Td border="none">
                    {" "}
                    {collectionData[0]?.volume_quote_day
                      ? formatter
                          .format(collectionData[0]?.volume_quote_day)
                          .split(".")[0]
                      : "null"}
                  </Td>
                  <Td border="none">
                    {collectionData[0]?.unique_token_ids_sold_count_day
                      ? collectionData[0]?.unique_token_ids_sold_count_day
                      : "null"}
                  </Td>
                </Tr>
              </Table>
            </Box>
          </Box>
        </Box>

        {/* Graph Section */}
        <Box>
          <Text
            textTransform="uppercase"
            color="#3c9b6f"
            fontSize="lg"
            fontWeight="semibold"
            size="md"
            my={5}
            letterSpacing={2}
          >
            Floor Price
          </Text>
        </Box>

        <Box
          px="5"
          py="5"
          borderRadius="lg"
          position="relative"
          width="100%"
          mt="30px"
          borderWidth="1px"
          direction={{ base: "column", md: "row" }}
          borderColor="purple.600"
          bg="blackAlpha.600"
        >
          {graphLoader && (
            <Box position="absolute" top="40%" left="50%">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#3c9b6f"
                size="xl"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              />
            </Box>
          )}
          {graphErr && (
            <Text position="absolute" top="40%" left="50%" ml="-100%">
              No data available between these dates
            </Text>
          )}

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            h="50px"
          >
            <Text></Text>
            <SelectDropdown
              options={CONFIG.GRAPH_OPTIONS}
              onChange={(e) => {
                handleGraph(e.target.value);
              }}
            />
          </Box>

          <Box h="500px" w="100%" minW="100%">
            <TimeSeries quote={graphData} wei={weiData} />
          </Box>
        </Box>

        {/* NFT details Section */}

        <Box mt="50px">
          <Text
            textTransform="uppercase"
            color="#3c9b6f"
            fontSize="lg"
            fontWeight="semibold"
            size="md"
            ml={5}
            letterSpacing={2}
          >
            NFT Preview
          </Text>
          {activeLoader ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="#3c9b6f"
                size="xl"
              />
            </Box>
          ) : (
            <Box
              mt="30px"
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
              borderWidth="1px"
              direction={{ base: "column", md: "row" }}
              borderColor="purple.600"
              px="5"
              py="5"
              borderRadius="lg"
              bg="blackAlpha.600"
            >
              {nft &&
                nft.map((o, i) => {
                  return (
                    <Box
                      w="200px"
                      h="200px"
                      cursor="pointer"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      key={i}
                      m=" 8px 0px 8px 0px"
                    >
                      <Image
                        borderRadius="lg"
                        alt=""
                        onError={(event) => {
                          event.target.classList.add("error-image");
                          event.target.classList.remove("collection-img");
                        }}
                        className="collection-img"
                        key={i}
                        src={o?.external_data?.image}
                        onClick={() => {
                          history.push(`/nft/${address}/${o.token_id}/${id}`);
                        }}
                      ></Image>
                    </Box>
                  );
                })}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
