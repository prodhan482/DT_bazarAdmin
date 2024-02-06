import { useEffect, useRef, useContext } from 'react';
import { tokens, ColorModeContext } from "../../theme";
import { useTheme } from "@mui/material";

function TableBody({children}) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (  
    <tbody>
        {children}
    </tbody> );
}

export default TableBody;