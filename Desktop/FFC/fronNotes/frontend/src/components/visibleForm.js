import { useState, forwardRef, useImperativeHandle } from 'react'
import Button from './button'



const Togglable = forwardRef(({children, buttonLabel, ref}) => {

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? "none" : ""}
    const showWhenVisible = {display: visible ? "" : "none"}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {toggleVisibility}
    })

    return(
        <>
            <div style={hideWhenVisible}>
                <Button text={buttonLabel} onClick={toggleVisibility} />
            </div>
            <div style={showWhenVisible}>
                {children}
                <Button text={"cancel"} onClick={toggleVisibility}/>
            </div>
        </>
    )
})

export default Togglable