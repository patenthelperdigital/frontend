import FilterProvider from "./FilterProvider";
import ThemeProvider from "./ThemeProvider";

const MasterProvider = ({ children }) => {
  return (
    <FilterProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </FilterProvider>
  );
};

export default MasterProvider;
