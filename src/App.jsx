import CustomerSideBar from "./Components/CustomerSidebar";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import Routes from "./Routes/routes";
import { useState } from "react";

// import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
// import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    // <>
    //   <div className="app flex ">
    //     <SideBar />
    //     <div className="flex flex-col h-full w-full pl-[250px] ">
    //       <NavBar />
    //       <div className="mt-20 ">
    //         <Routes />
    //       </div>
    //     </div>
    //   </div>
    // </>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideBar />
          <main className="content">
            <NavBar setIsSidebar={setIsSidebar} />
            <Routes />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
