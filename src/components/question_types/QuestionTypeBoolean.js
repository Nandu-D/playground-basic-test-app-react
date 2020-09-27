import React, { useState } from "react";

const QuestionTypeBoolean = (props) => {
    const {linkId, text, type, onChange} = props;
    const [selection, setSelection] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setSelection(value);
        onChange(linkId, value, type);
    }

    return (
        <>
            <label><b>{linkId} {text}</b><br />
                <select value={selection} onChange={handleChange}>
                    <option value="">Please select a value</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </label><br /><br />
        </>
    );
}

export default QuestionTypeBoolean;