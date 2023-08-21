import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const SearchBar = (props) => {
  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      mt={40}
      placeholder="Search for a touristic package"
      {...props}
    />
  );
};

export default SearchBar;
