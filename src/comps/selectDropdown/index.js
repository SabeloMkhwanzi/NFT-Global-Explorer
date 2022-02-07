import { Select } from "@chakra-ui/react";

export default function selectDropdown({ options, onChange }) {
  return (
    <Select
      borderColor="purple.600"
      bg="blackAlpha.700"
      textTransform="uppercase"
      color="#3c9b6f"
      fontSize="md"
      fontWeight="semibold"
      maxW={"150"}
      onChange={onChange}
    >
      {options.map((o, i) => {
        return (
          <option key={i} value={o.value}>
            {o.name}
          </option>
        );
      })}
    </Select>
  );
}
