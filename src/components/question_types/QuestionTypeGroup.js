import React from "react";
import QuestionTypeBoolean from "./QuestionTypeBoolean";
import QuestionTypeString from "./QuestionTypeString";
import QuestionTypeDate from "./QuestionTypeDate";

const QuestionTypeGroup = (props) => {
    const {linkId, text, item, onChange} = props;

    return (
        <>
            <b>{linkId} {text}</b>
            <p style={{marginLeft: "1rem"}}>
                {item.map(question => {
                    switch(question.type) {
                        case 'group':
                            return <QuestionTypeGroup {...question} onChange={onChange} key={question.linkId} />;
                        case 'boolean':
                            return <QuestionTypeBoolean {...question} onChange={onChange} key={question.linkId} />;
                        case 'string':
                            return <QuestionTypeString {...question} onChange={onChange} key={question.linkId} />;
                        case 'date':
                            return <QuestionTypeDate {...question} onChange={onChange} key={question.linkId} />;
                        default:
                            return <b>Group not recognizable</b>; 
                    }
                })}
            </p>
        </>
    );
}

export default QuestionTypeGroup;