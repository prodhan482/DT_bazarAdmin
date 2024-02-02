const SearchItemPageLayout = ({ title, children, startDate, endDate, orderStatus, onSubmit }) => {
    return (
      <div className="h-full w-full">
        <div className="flex justify-center items-center px-10">
          <div className="relative flex flex-col justify-center items-center w-full">
            <div className="w-full flex justify-between my-12">
            {/* <form onSubmit={onSubmit}> */}
              <h1 className="text-xl font-bold text-[#313649]">
                {title}
              </h1>
              {/* {startDate}
              {endDate}
              {orderStatus} */}
              {/* <button
              type="submit"
              className="bg-[#10823A] hover:[#4DB63F] text-white font-bold py-2 px-4 rounded"
            >
              submit
            </button> */}
            {/* </form> */}
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  };
  
  export default SearchItemPageLayout;