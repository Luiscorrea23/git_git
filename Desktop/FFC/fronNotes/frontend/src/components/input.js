const Input = ({ placeholder, onChange, value }) => {
    return (
      <input required placeholder={placeholder} value={value} onChange={onChange} />
    );
  };

export default Input