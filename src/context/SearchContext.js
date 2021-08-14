import React, { useState, createContext } from "react";

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        query,
        setQuery,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
