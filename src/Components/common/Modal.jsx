import { useEffect, useRef, useContext } from 'react';
import Cross from '../Icons/Cross';
import { tokens, ColorModeContext } from "../../theme";
import { useTheme } from "@mui/material";

function Modal({ title, onClose, children }) {
  const modalRef = useRef(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { toggleColorMode } = useContext(ColorModeContext);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    // <div className={`flex justify-center items-center fixed inset-0 overflow-y-auto h-full w-full bg-${toggleColorMode}`} style={{ backdropFilter: 'blur(2px)' }}>
    //   <div ref={modalRef} className={`relative mt-8 w-2/6 bg-${toggleColorMode === 'dark' ? 'black' : 'white'} p-8 rounded flex flex-col justify-center items-center`} style={{ backgroundColor: colors.primary[700], color: colors.primary[500], fontWeight:"800"}}>
    //     <div className="w-full">
    //       <h1 className={`text-2xl my-6 font-bold text-[#ffff]`}>{title}</h1>
    //       <hr className="mb-4 border-1" style={{ borderColor: colors.grey[500] }} />
    //     </div>
    //     {children}
    //     <Cross className="cross" onClick={onClose} style={{ color: colors.grey[100] }} />
    //   </div>
    // </div>

    <div className="flex justify-center items-center fixed inset-0 bg-gray-600 bg-opacity-10 overflow-y-auto h-full w-full z-[99]" style={{ backdropFilter: 'blur(2px)' }}>
    <div ref={modalRef} className="relative mt-8 w-2/6 bg-white p-8 rounded flex flex-col justify-center items-center" style={{ backgroundColor: colors.primary[700], color: colors.black}}>
      <div className="w-full">
        <h1 className="text-2xl my-6 font-bold">{title}</h1>
        <hr className="mb-4 border-1" />
      </div>
      {children}
      <Cross className="cross" onClick={onClose} />
    </div>
  </div>
  );
}

export default Modal;
