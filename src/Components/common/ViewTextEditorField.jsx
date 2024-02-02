  function ViewTextEditorField({fieldName, data}) {
    return ( 
        <div className="flex gap-2">
        <p className="font-semibold">{fieldName}: </p>
        <div dangerouslySetInnerHTML={data}>
            </div>
      </div>
     );
}

export default ViewTextEditorField;
