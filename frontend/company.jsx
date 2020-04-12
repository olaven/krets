import React from "https://dev.jspm.io/react";


export const CompanyFrontend = (props) => {

    const { company } = props; 

    const [comment, setComment] = React.useState(null); 
    const [indicator, setIndicator] = React.useState(null);
    const [feedbacks, setFeedbacks] = React.useState([]);

    const send = async () => {

        console.log("going to send feedback")
        const response = await fetch("/api/cmpanies/:company_name/feedbacks", {
            method: "post", 
            body: JSON.stringify({
                comment, indicator
            })
        }); 

        console.log(response);
    }

    const fetchFeedback = async () => {

        const response = await fetch(`/api/companies/${company.name}/feedbacks`); 
        const feedbacks = await response.json(); 
        setFeedbacks(feedbacks);
    }
    
    return (<div>
        <h1>Give feedback to {company.name}</h1>
        <input type="text" placeholder="your feedback" onChange={(event) => {
            setComment(event.target.value); 
        }}></input>
        <div>
            <button onClick={() => {setIndicator("smile")}}>:-)</button>
            <button onClick={() => { setIndicator("neutral") }}>:-|</button>
            <button onClick={() => { setIndicator("bad") }}>:-(</button>
        </div>
        <button onClick={send}>Send feedback</button>

        <h1>Previous feedback</h1>
        <button onClick={fetchFeedback}>Load feedback</button>
        {feedbacks.map(feedback => <>
            <p>{feedback.indicator}</p>
            <p>{feedback.comment}</p>
        </>
        )}

    <div/>)
}