import React from 'react';
import SubmitButton from './SubmitButton';
import { useLevels } from '../../Utils/useLevels';
const CustomerPlasticPointsPageLayout = ({ title, onChange, onSubmit, itemCount, children, returnPlastic, value }) => {

  const {admin} = useLevels();

    return (
      <div className="h-full w-full">
        <div className="flex justify-center items-center px-10">
          <div className="relative flex flex-col justify-center items-center w-full">
            <div className="w-full flex justify-between my-12">
              <h1 className="text-xl font-bold text-[#313649]">
                {title} ({itemCount})
              </h1>
              <form onSubmit={onSubmit} className="w-full">
             
             {
               admin &&(
                <div className="mt-5 w-full flex justify-end">
             
                <input type="number" id="returnPlastic" name="returnPlastic" placeholder="Enter Plastic Return" value={returnPlastic} onChange={(e) => onChange(e.target.value)}/>
                 
                 
                <SubmitButton label="Receive Plastic" />
                </div>
               )
             }
               </form>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  };
  
  export default CustomerPlasticPointsPageLayout;
