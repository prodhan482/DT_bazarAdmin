function Table({ children }) {
    return (
        <div className="bg-white w-full border-collapse">
            <h3 class="text-xl mb-[08px]">Ordered Items</h3>
      <table className="shadow-[0px_0px_5px_0.5px_gray]">
        {children}
      </table>
       </div>
    );
  }
  
  export default Table;