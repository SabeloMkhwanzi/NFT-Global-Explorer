import React from "react";
import {
  chakra,
  Box,
  useColorModeValue,
  Button,
  Stack,
  Text,
  Icon,
  HStack,
} from "@chakra-ui/react";

import WalletModel from "../../comps/WalletModel";

export default function LandingPage() {
  return (
    <Box px={6} py={3} mx="auto">
      <HStack display="flex" justifyContent="space-around" spacing="50%">
        <Box
          display="flex"
          borderWidth="1px"
          borderColor="purple.600"
          borderRadius="2xl"
          maxWidth="400"
          direction={{ base: "column", md: "row" }}
          boxShadow={"2xl"}
          padding={"1rem"}
          bg="blackAlpha.600"
          mr="6"
        >
          <Button
            as="a"
            href="/NftDashboard"
            borderRadius="xl"
            mx="2"
            colorScheme="green"
            bg="green.500"
            variant="solid"
            textTransform="uppercase"
            color="white"
          >
            NFT DASHBOARD
          </Button>

          <Button
            as="a"
            borderRadius="xl"
            mx="2"
            colorScheme="green"
            bg="green.500"
            variant="solid"
            href="/Minter"
            textTransform="uppercase"
            color="white"
          >
            TOKEN MINTER
          </Button>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
          borderWidth="1px"
          borderColor="purple.600"
          borderRadius="2xl"
          Width="800"
          direction={{ base: "column", md: "row" }}
          boxShadow={"2xl"}
          padding={"1rem"}
          bg="blackAlpha.600"
          mx="100%"
        >
          <Box
            as="a"
            href="/NftDashboard"
            borderRadius="xl"
            mx="2"
            colorScheme="teal"
            variant="solid"
          ></Box>

          <WalletModel />
        </Box>
      </HStack>

      <Box
        w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
        mx="auto"
        textAlign={{ base: "left", md: "center" }}
        pt="190px"
      >
        <chakra.h1
          mb={6}
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="bold"
          lineHeight="none"
          letterSpacing={{ base: "normal", md: "tight" }}
          color={useColorModeValue("white", "white")}
        >
          Welcome to{" "}
          <Text
            display={{ base: "block", lg: "inline" }}
            w="full"
            bgClip="text"
            bgGradient="linear(to-r, green.400,purple.500)"
            fontWeight="extrabold"
          >
            NFT Global Explorer
          </Text>{" "}
          in one single place.
        </chakra.h1>
        <chakra.p
          px={{ base: 0, lg: 24 }}
          mb={6}
          fontWeight="semibold"
          fontSize={{ base: "lg", md: "xl" }}
          color="#3c9b6f"
          textTransform="uppercase"
        >
          Your one Stop NFT Global Explorer. A NFT Dashboard that displays all
          nft collection data addresses and their market data. With the
          possibility to Mint your NFT Token. Deployed on the Polygon
          blockchain. Data fetching Was made easy with the Covalent API.
        </chakra.p>
        <Stack
          direction={{ base: "column", sm: "row" }}
          mb={{ base: 4, md: 8 }}
          spacing={2}
          justifyContent={{ sm: "left", md: "center" }}
        >
          <Button
            as="a"
            borderWidth={1}
            borderColor="purple.600"
            borderRadius="2xl"
            variant="solid"
            width="250"
            colorScheme="teal"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w={{ base: "full", sm: "auto" }}
            mb={{ base: 2, sm: 0 }}
            size="lg"
            cursor="pointer"
            href="/Minter"
            bg="green.500"
            color="white"
          >
            Mint NFT
            <Icon boxSize={4} ml={1} viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </Icon>
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
