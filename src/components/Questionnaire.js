import React, { useState } from "react";
import QuestionTypeGroup from "./question_types/QuestionTypeGroup";
import QuestionTypeBoolean from "./question_types/QuestionTypeBoolean";
import QuestionTypeString from "./question_types/QuestionTypeString";
import QuestionTypeDate from "./question_types/QuestionTypeDate";
import Report from "./Report";
import questionnaireJSON from "../assets/questionnaire.json";

const Questionnaire = () => {
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState('');
    const [showReport, setShowReport] = useState(false);

    const data = JSON.parse(JSON.stringify(questionnaireJSON));
    const questions = JSON.parse(JSON.stringify(questionnaireJSON)).item;
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValidForm(answers)) {
            setError('');
            setShowReport(true);
        } else {
            setError('All fields are required');
            setShowReport(false);
        }
    }

    const handleChange = (id, value, type) => {
        const modifiedAnswers = {...answers};
        modifiedAnswers[id] = {
            "value": value,
            "type": type, 
        };
        setAnswers(modifiedAnswers);
    }

    const isValidForm = (answers) => {
        const totalNoOfQuestions = getTotalNoOfQuestions(questions);
        const noOfAnswers = Object.keys(answers).length;
        if (totalNoOfQuestions !== noOfAnswers) return false;
        for (const id in answers) {
            switch(answers[id].type) {
                case 'boolean':
                    if (answers[id].value === "Yes" || answers[id].value === "No") continue;
                    else return false;
                case "date":
                    if (/^\d{4}-\d{2}-\d{2}$/.test(answers[id].value)) continue;
                    else return false;
                case "string":
                    if (answers[id].value.length > 0) continue;
                    else return false;
                default:
                    return false;
            }
        }
        return true;
    }

    const getTotalNoOfQuestions = (questions) => {
        return questions.reduce((total, question) => {
            switch(question.type) {
                case "group": 
                    return total + getTotalNoOfQuestions(question.item);
                case "boolean":
                case "string":
                case "date":
                    return total + 1;
                default: 
                    return total;
            }
        }, 0);
    }
    
    return (
        <>
            <form onSubmit={handleSubmit} style={{margin: "1rem"}}>
                {questions.map(question => {
                    switch(question.type) {
                        case 'group':
                            return <QuestionTypeGroup {...question} onChange={handleChange} key={question.linkId} />;
                        case 'boolean':
                            return <QuestionTypeBoolean {...question} onChange={handleChange} key={question.linkId} />;
                        case 'string':
                            return <QuestionTypeString {...question} onChange={handleChange} key={question.linkId} />;
                        case 'date':
                            return <QuestionTypeDate {...question} onChange={handleChange} key={question.linkId} />;
                        default:
                            return <h4>Group not recognizable</h4>; 
                    }
                })}
                {error && (
                    <><span style={{color: "red"}}>{error}</span><br /></>
                )}
                <input type="submit" value="Submit" />
            </form>
            {showReport && (
                <Report data={data} questions={questions} answers={answers} />
            )}
        </>
    );
};

export default Questionnaire;