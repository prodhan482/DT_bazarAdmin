const TextEditorPageLayout = ({ title, itemCount, onAddClick, children }) => {
    return (
      <div className="h-full w-full">
        <div className="flex justify-center items-center px-10">
          <div className="relative flex flex-col justify-center items-center w-full">
            <div className="w-full flex justify-between my-4">
              <h1 className="text-xl font-bold">
                {title} ({itemCount})
              </h1>

            </div>
            {children}
          </div>
        </div>
      </div>
    );
  };
  
  export default TextEditorPageLayout;