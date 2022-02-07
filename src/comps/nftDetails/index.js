import React from "react";
import {
  Box,
  Stack,
  Text,
  Image,
  VStack,
  SimpleGrid,
  Tr,
  Td,
  Table,
} from "@chakra-ui/react";
import { Divider } from "@material-ui/core";

export default function NftDetails({ data }) {
  return (
    <Box display="flex" alignSelf="center" borderRadius="lg" maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Box
          textAlign="center"
          flex="2"
          alignItems="center"
          justifyContent="center"
          h={{ base: "100%", sm: "400px", lg: "500px" }}
        >
          <Image
            rounded="lg"
            alt=""
            src={data?.external_data?.image}
            onError={(event) => {
              event.target.classList.add("error-image");
              event.target.classList.remove("nft-img");
            }}
          />
        </Box>
        <Stack>
          <Box as={"header"}>
            <Text
              fontSize="2xl"
              color="#3c9b6f"
              fontWeight="bold"
              letterSpacing={2}
            >
              {data?.external_data?.name}
            </Text>
            <Text fontSize={"lg"} fontWeight="semibold">
              Token ID : {data?.token_id}
            </Text>
          </Box>

          <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text color="#b5ffd9" fontSize={"lg"}>
                {data?.external_data?.description}
              </Text>
            </VStack>

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
              <Table color="#3c9b6f" fontWeight="bold" fontSize="md">
                {data?.external_data?.attributes ? (
                  <>
                    {data.external_data.attributes.map((o, i) => {
                      return (
                        <Tr key={i}>
                          <Td color="#3c9b6f" border="none">
                            {o.trait_type} :
                          </Td>

                          <Td color="#b5ffd9" border="none">
                            {o.value}
                          </Td>
                          <Divider />
                        </Tr>
                      );
                    })}
                  </>
                ) : null}
              </Table>
            </Box>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
