import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import NftDetails from "../../comps/nftDetails";
import axios from "axios";

import { Spinner, Box, Button } from "@chakra-ui/react";

export default function NFTView() {
  let { address, id, chainId } = useParams();
  const [nft, setNft] = useState({});
  const [activeLoader, setLoader] = useState(true);
  //const API_KEY = process.env["REACT_APP_COVALENT_API"];
  const API_KEY = "ckey_4e73d56514984838ab3206fbaf4";
  const history = useHistory();

  useEffect(() => {
    handleNft();
  });

  // Request for nft metadata
  const handleNft = async () => {
    const resp = await axios.get(
      `https://api.covalenthq.com/v1/${chainId}/tokens/${address}/nft_metadata/${id}/?quote-currency=USD&format=JSON&key=${API_KEY}`
    );
    console.log(resp);
    setNft(
      resp.data.data.items[0].nft_data !== null
        ? resp.data.data.items[0].nft_data[0]
        : { external_data: { image: "" } }
    );
    setLoader(false);
  };

  return (
    <>
      {activeLoader ? (
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="2rem"
        >
          <Spinner
            display="flex"
            alignItems="center"
            justifyContent="center"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : (
        <>
          <Box padding="1rem" position="relative">
            <Box
              display="flex"
              justifyContent="left"
              alignItems="left"
              pos="relative"
              pb="2"
              cursor="pointer"
              height="20px"
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
            <NftDetails data={nft} />
          </Box>
        </>
      )}
    </>
  );
}
