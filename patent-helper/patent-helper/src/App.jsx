import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Patents from "./pages/Patents/Patents"
import Holders from "./pages/Holders/Holders";
import SinglePatent from "./pages/SinglePatent/SinglePatent";
import SingleHolder from "./pages/SingleHolder/SingleHolder";
import Filters from "./pages/Filters/Filters";
import PatentsStat from "./pages/PatentsStat/PatentsStat";
import HoldersStat from "./pages/HoldersStat/HoldersStat";
import MasterProvider from "./context/MasterProvider";
import {

  ConfigProvider,
} from "antd";

function App() {

  return (
    <div>
      <MasterProvider>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "#531dab",
                colorPrimaryHover: "#9254de",
                colorPrimaryActive: "#9254de",
                colorText: "#531dab",
                colorBorder: "#531dab",
                lineWidth: 1,
              },
              Switch: {
                colorPrimary: "#ffc53d",
                colorPrimaryHover: "#ffd666",
                colorTextTertiary: "#722ed1",
                colorTextQuaternary: "#531dab",
              },
              Table: {
                cellFontSize: 10,
                cellPaddingBlock: 8,
                headerBorderRadius: 0,
                headerColor: "#595959",
                rowHoverBg: "rgba(249,240,255, 0.3)",
                //headerBg:  "#f9f0ff",
                //headerBg: "rgba(249,240,255, 0.3)",
                boxShadowSecondary:
                  "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
              },
              Pagination: {
                itemActiveBg: "#f9f0ff",
                colorPrimary: "#531dab",
                colorPrimaryHover: "#9254de",
                colorPrimaryBorder: "#531dab",
              },
              Select: {
                itemActiveBg: "#f9f0ff",
                colorPrimary: "#531dab",
                colorPrimaryHover: "#9254de",
                colorPrimaryBorder: "#531dab",
                optionSelectedBg: "#f9f0ff",
              },
            },
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Patents />} />
                <Route path="filters" element={<Filters />} />
                <Route path="patents">
                  <Route index element={<Patents />} />
                  <Route path=":stat" element={<PatentsStat />} />
                </Route>
                <Route path="patent">
                  <Route path=":patent_kind">
                    <Route
                      path=":patent_reg_number"
                      element={<SinglePatent />}
                    />
                  </Route>
                </Route>
                <Route path="persons">
                  <Route index element={<Holders />} />
                  <Route path=":person_tax_number" element={<SingleHolder />} />
                  <Route path=":stat" element={<HoldersStat />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
      </MasterProvider>
    </div>
  );
}

export default App;
