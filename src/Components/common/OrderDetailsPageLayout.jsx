import { useLevels } from "../../Utils/useLevels";

const OrderDetailsPageLayout = ({
  orderID,
  orderDate,
  orderStatus,
  customerName,
  customerPhone,
  customerEmail,
  fullAddressString,
  areaString,
  orderTotalPlasticPoint,
  children,
  handleRoute,
  handleCancelOrderClick
}) => {
  // const navigate = useNavigate();
  // const handleRoute = () => {
  //   navigate(`/Reorder/${id}`);
  // };
  const { admin, cs, cx, executive, operationEmployee } = useLevels();
  return (
    <div className="h-full w-full">
      <div className="flex justify-center items-center px-10">
        <div className="relative flex flex-col justify-center items-center w-full">
          <div className="w-full mt-4 gap-4 flex justify-end items-center">
          {( admin || cs || cx || executive )&& (
            <button
              onClick={handleRoute}
              className="bg-[#10823A] hover:bg-[#10823A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Re Order
            </button>
            )}
            {( admin || cs || cx || executive )&& (
            <button
              onClick={handleCancelOrderClick}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel order
            </button>
            )}
          </div>

          <div className="w-full flex justify-between mt-12 mb-6">
            {/* <h1 className="text-xl font-bold text-[#313649]">
                {title} ({itemCount})
              </h1> */}
            {/* <button 
                onClick={onAddClick}
                className="bg-[#10823A] hover:[#4DB63F] text-white font-bold py-2 px-4 rounded"
              >
                Add {title}
              </button> */}

            <div className="bg-[#cdf0e06b] pt-3 pr-10 w-full">
              <div className="grid grid-cols-2 ">
                <div className="ml-6">
                  {/* <h1><img src={logo} alt="logo" width="20%" /></h1> */}
                  <h2 className="text-2xl mb-1.5">Order ID: #{orderID}</h2>
                  <p className="text-[#262626] mb-1">
                    Order Date: {orderDate}{" "}
                  </p>
                  <p className="text-[#262626] mb-1">
                    Order Status: {orderStatus}{" "}
                  </p>
                </div>
                <div className="">
                  <div className="float-right text-right mr-2.5">
                    <p className="text-2xl mb-1.5">
                      Customer Name: {customerName}
                    </p>
                    <p className="text-green">
                      Customer Email: {customerEmail}
                    </p>
                    <p className="text-green">
                      Customer Phone: {customerPhone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" pt-3 pr-10 w-full">
            <div className="grid grid-cols-2 ">
              <div className="ml-6">
                <h2 className="text-2xl mb-1.5">Address Information</h2>
                <h2 className="text-[#262626] mb-1.5">
                  Full Address: {fullAddressString}
                </h2>
                <p className="text-[#262626] mb-1">Area: {areaString} </p>
                {/* <p className="text-[#262626] mb-1">Order Status: {orderStatus} </p> */}
              </div>
              <div className="">
                <div className="float-right text-right mr-12">
                  <p className="text-2xl mb-1.5">
                    Total Plastic Point: {orderTotalPlasticPoint}
                  </p>
                  {/* <p className="text-green">Customer Email: {customerEmail}</p>
                        <p className="text-green">Customer Phone: {customerPhone}</p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-4 border-[1px solid gray]">
            <h3 className="text-xl mb-1.5">Ordered Items:</h3>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPageLayout;
