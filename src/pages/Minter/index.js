import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "../../util/interact.js";

import {
  Box,
  Button,
  Text,
  chakra,
  FormControl,
  Input,
} from "@chakra-ui/react";

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a
            target="_blank"
            href={`https://metamask.io/download.html`}
            rel="noreferrer"
          >
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(url, name, description);
    setStatus(status);
    if (success) {
      setName("");
      setDescription("");
      setURL("");
    }
  };

  return (
    <Box
      w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
      mx="auto"
      textAlign={{ base: "left", md: "center" }}
      pt="30px"
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
          // onClick={() => {
          //   history.goBack();
          // }}
          color="white"
        >
          Back
        </Button>
      </Box>

      <Button
        textAlign="right"
        float="right"
        lineHeight="16px"
        as="a"
        borderRadius="xl"
        mx="2"
        colorScheme="green"
        bg="green.500"
        variant="solid"
        href="/Minter"
        textTransform="uppercase"
        color="white"
        id="walletButton"
        onClick={connectWalletPressed}
      >
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </Button>

      <chakra.h1
        mb={6}
        fontSize={{ base: "4xl", md: "6xl" }}
        fontWeight="bold"
        lineHeight="none"
        letterSpacing={{ base: "normal", md: "tight" }}
        color="gray.100"
      >
        <Text
          display={{ base: "block", lg: "inline" }}
          w="full"
          bgClip="text"
          bgGradient="linear(to-r, green.400,purple.500)"
          fontWeight="extrabold"
        >
          NFT Minter
        </Text>
      </chakra.h1>

      <chakra.p
        px={{ base: 0, lg: 24 }}
        mb={6}
        fontWeight="semibold"
        fontSize={{ base: "lg", md: "xl" }}
        color="white"
        textTransform="uppercase"
      >
        Simply add your asset's link, name, and description, then press Mint.
      </chakra.p>

      <FormControl pt="5">
        <Text
          textAlign="left"
          textTransform="uppercase"
          color="#3c9b6f"
          fontSize="lg"
          fontWeight="semibold"
        >
          Link to asset:{" "}
        </Text>
        <Input
          padding="32px 60px"
          borderColor="purple.600"
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <Text
          textAlign="left"
          textTransform="uppercase"
          color="#3c9b6f"
          fontSize="lg"
          fontWeight="semibold"
        >
          Name:{" "}
        </Text>
        <Input
          padding="32px 60px"
          borderColor="purple.600"
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <Text
          textAlign="left"
          textTransform="uppercase"
          color="#3c9b6f"
          fontSize="lg"
          fontWeight="semibold"
        >
          Description:{" "}
        </Text>
        <Input
          padding="32px 60px"
          borderColor="purple.600"
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </FormControl>

      <Button
        mt="5"
        textAlign="right"
        float="right"
        lineHeight="16px"
        as="a"
        borderRadius="xl"
        mx="2"
        colorScheme="green"
        bg="green.500"
        variant="solid"
        href="/Minter"
        textTransform="uppercase"
        color="white"
        onClick={onMintPressed}
      >
        Mint NFT
      </Button>
      <chakra.p id="status" color="red">
        {status}
      </chakra.p>
    </Box>
  );
};

export default Minter;
