function ViewDetailsText({ label, onClick }) {
    return (
      <div className="text-[blue] font-bold cursor-pointer mt-6" onClick={onClick}>
        {label}
      </div>
    );
  }
  
  export default ViewDetailsText;