import { useState } from "react"

export default function Answer({ choice, handleChoicesClick }) {
    const [checked, setChecked] = useState(false)

    return (
        <>
            <div className="answers">
                <input 
                    type="radio" 
                    id={choice} 
                    name="answer" 
                    value={choice} 
                    onChange={(e) => {
                        handleChoicesClick(e)
                        setChecked(!checked)
                    }}
                 />
                <label htmlFor={choice}>{choice}</label>
                
            </div>
        </>
    )
}