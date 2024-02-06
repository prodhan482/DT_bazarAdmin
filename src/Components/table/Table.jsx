import { useEffect, useRef, useContext } from 'react';
import { tokens, ColorModeContext } from "../../theme";
import { useTheme } from "@mui/material";

function Table({ children }) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const { toggleColorMode } = useContext(ColorModeContext);

    return (
      <table className="table-auto w-full border-2 mx-4" >
        {children}
      </table>
    );
  }
  
  export default Table;