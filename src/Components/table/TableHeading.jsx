// function TableHeading({ text, align }) {
//   return (
//     <th className={`px-6 py-3 ${align} font-medium text-gray-500 uppercase tracking-wider `}>
//       {text}
//     </th>
//   );
// }

// export default TableHeading;
import { useEffect, useRef, useContext } from 'react';
import { tokens, ColorModeContext } from "../../theme";
import { useTheme } from "@mui/material";

function TableHeading({ text, align }) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const alignmentClass = align ? 'text-right' : 'text-left';
  
  return (
    <th className={`px-6 py-3 ${alignmentClass} font-medium uppercase tracking-wider`} style={{ backgroundColor: colors.greenAccent[700], color: colors.black}}>
      {text}
    </th>
  );
}

export default TableHeading;
