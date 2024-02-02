function CancelButton({ label, onClick }) {
    return (
      <button className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onClick}>
        {label}
      </button>
    );
  }
  
  export default CancelButton;
