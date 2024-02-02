import SubmitButton from './SubmitButton';

const CreateOrderPageLayout = ({ title, itemCount, onAddClick, children, onSubmit}) => {
    return (
      <div className="h-full w-full">
        <div className="flex justify-center items-center px-10">
          <div className="relative flex flex-col justify-center items-center w-full">
            <div className="w-full flex justify-between my-12">
              <h1 className="text-xl font-bold text-[#313649]">
                {title} 
              </h1>
              
            </div>
            <form onSubmit={onSubmit} className="w-4/6">
            {/* <div className="w-full flex justify-between"> */}
            {/* <button
              onClick={onAddClick}
              className="bg-[#10823A] hover:[#4DB63F] text-white font-bold py-2 px-4 rounded"
            >
              Add Product
            </button> */}
            {/* </div> */}
            {children}
            <div className="mt-5 w-full flex justify-end flex justify-center">
                <SubmitButton label="Submit" />
            </div>
        </form>  
          </div>
        </div>
      </div>
    );
  };
  
  export default CreateOrderPageLayout;