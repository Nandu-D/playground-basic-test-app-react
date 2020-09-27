import React from "react";

const Report = (props) => {
    const {data, questions, answers} = props;

    const createReport = () => {
        const items = createReportItems(questions, answers);

        const reportObj = {
            "resourceType": data.resourceType,
            "identifier": data.id,
            "status": data.status,
            "item": items,
        }
        return reportObj;
    }

    const createReportItems = (questions, answers) => {
        const items = [];
        questions.forEach(question => {
            const item = {
                "linkId": question.linkId,
                "text": question.text,
            }
            if (question.type === "group") {
                item["item"] = createReportItems(question.item, answers);
            } else {
                item["answer"] = answers[question.linkId].value;
            }
            items.push({...item});
        });
        return items;
    }

    return (
        <div style={{margin: "1rem"}}>
            <b>Report</b>
            <pre>
                {JSON.stringify(createReport(), undefined, 2)}
            </pre>
        </div>
    );
}

export default Report;