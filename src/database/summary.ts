import { SummaryModel } from "../models/models";
import { rows } from "./helpers/query";


export const get = (userId: string) => rows<SummaryModel>(
    `
    select pages.name as page_name, responses.emotion as emotion, questions.text as question_text, answers.text as answer_text, responses.contact_details as contact_details
    from pages 
        
        inner join responses 
        on pages.id = responses.page_id 
    
        left join answers
        on responses.id = answers.response_id
        
        left join questions 
        on pages.id = questions.page_id and answers.question_id = questions.id
    where pages.owner_id = $1;
    `,
    [userId]
)