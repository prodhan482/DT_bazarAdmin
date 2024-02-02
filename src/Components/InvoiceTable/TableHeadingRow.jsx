function TableHeadingRow({ children }) {
    return <thead>
      {/* <div className="w-[90%]"> */}
      <tr>
      {children}
      </tr>
      {/* </div> */}
    </thead>;
  }
  
  export default TableHeadingRow;