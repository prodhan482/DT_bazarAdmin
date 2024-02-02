function TableRow({ children, item }) {
    return (
      <tr key={item._id}>
        {children}
      </tr>
    );
  }
  
  export default TableRow;