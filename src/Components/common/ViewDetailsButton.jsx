function ViewDetailsButton({ label, onClick }) {
    return (
      <button className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onClick}>
        {label}
      </button>
    );
  }
  
  export default ViewDetailsButton;
