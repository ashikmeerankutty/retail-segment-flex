import { Input, Text } from "@twilio-paste/core";
import { SearchIcon } from "@twilio-paste/icons/cjs/SearchIcon";
import React from "react";

const SearchForm = () => {
  return (
    <>
      <Input
        aria-describedby="search_text"
        id={`navbar-input`}
        name="search"
        type="search"
        placeholder="search"
        insertAfter={
          <Text as="span" fontWeight="fontWeightSemibold">
            <SearchIcon decorative={false} title="Description of icon" />
          </Text>
        }
      />
    </>
  );
};

export default SearchForm;
