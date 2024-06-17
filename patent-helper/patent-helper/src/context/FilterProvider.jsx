import { createContext, useState } from "react";

export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [filterId, setFilterId] = useState();
  return (
    <FilterContext.Provider value={[filterId, setFilterId]}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
