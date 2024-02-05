import { useLevels } from "../../Utils/useLevels";

const CustomerPageLayout = ({ title, itemCount, onAddClick, children }) => {

    const { admin, cs, cx, executive, operationEmployee, marketing } = useLevels();

    return (
      <div className="h-full w-full">
        <div className="flex justify-center items-center px-10">
          <div className="relative flex flex-col justify-center items-center w-full">
            <div className="w-full flex justify-between">
              <h1 className="text-xl font-bold">
                {title} ({itemCount})
              </h1>
              {(admin || cs || cx || executive) && (
              <button
                onClick={onAddClick}
                className="bg-[#10823A] hover:[#4DB63F] text-white font-bold py-2 px-4 rounded"
              >
                Add {title}
              </button>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  };
  
  export default CustomerPageLayout;
  