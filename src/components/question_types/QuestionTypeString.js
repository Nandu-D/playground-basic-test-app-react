import React, { useState } from "react";

const QuestionTypeString = (props) => {
    const {linkId, text, type, onChange} = props;
    const [givenAnswer, setGivenAnswer] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setGivenAnswer(value);
        onChange(linkId, value, type);
    }

    return (
        <>
            <label><b>{linkId} {text}</b><br />
                <input type="text" value={givenAnswer} onChange={handleChange} />
            </label><br /><br />
        </>
    );
}

export default QuestionTypeString;