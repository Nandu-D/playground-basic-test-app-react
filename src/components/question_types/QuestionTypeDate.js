import React, { useState} from "react";

const QuestionTypeDate = (props) => {
    const {linkId, text, type, onChange} = props;
    const [selectedDate, setSelectedDate] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedDate(value);
        onChange(linkId, value, type);
    }

    return (
        <>
            <label><b>{linkId} {text}</b><br />
                <input type="date" value={selectedDate} onChange={handleChange} />
            </label><br /><br />
        </>
    );
}

export default QuestionTypeDate;