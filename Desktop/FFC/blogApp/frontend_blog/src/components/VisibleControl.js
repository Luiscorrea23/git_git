import { useState, forwardRef, useImperativeHandle } from 'react'

const Control = forwardRef(({ children, buttonLabel }, ref) => {
    const [visible, setVisible] = useState(false);
  
    const controlVisible = () => {
      setVisible(!visible);
    };
  
    useImperativeHandle(ref, () => {
      return {
        controlVisible,
      };
    });
  
    return (
      <div>
        <button onClick={controlVisible}>{buttonLabel}</button>
        <div style={{ marginLeft: '10px', display: visible ? '' : 'none' }}>
          {children}
          <button onClick={controlVisible}>Cancel</button>
        </div>
      </div>
    );
  });
  
  export default Control;