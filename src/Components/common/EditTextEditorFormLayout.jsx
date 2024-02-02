import React from 'react';
import SubmitButton from './SubmitButton';
import Cross from '../Icons/Cross';
import Modal from './Modal';

function EditTextEditorFormLayout({ title, onSubmit, children }) {
  return (
  
    <div className="flex justify-center items-center h-full w-full mt-2">
              <form onSubmit={onSubmit} className="w-full">
                  {children}
                  <div className="mt-5 w-full flex justify-end flex justify-center">
                      <SubmitButton label="Submit" />
                  </div>
              </form>
    </div>
  );
}

export default EditTextEditorFormLayout;

