import React from 'react';
import SubmitButton from './SubmitButton';
import Cross from '../Icons/Cross';
import Modal from './Modal';

import { useLevels } from "../../Utils/useLevels";

function EditOrderStatusFormLayout({ title, onSubmit, children }) {

  const { admin, cs, cx, executive, operationEmployee } = useLevels();

  return (
  
    <div className="flex justify-center items-center h-full w-full mt-2">
              <form onSubmit={onSubmit} className="w-full">
                  {children}
                  <div className="mt-5 w-full flex justify-end flex justify-center">
                  {( admin || cs || cx || executive )&& (
                      <SubmitButton label="Submit" />
                    )}
                  </div>
              </form>
    </div>
  );
}

export default EditOrderStatusFormLayout;
