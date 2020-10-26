/**
 * Representing a Question 
 */
export interface QuestionModel {
    /**
     * ID of the Question 
     */
    id?: string,
    /**
     * ID of the page the question belongs to
     */
    page_id: string,
    /**
     * Wether the questions is archived or not. 
     */
    archived: boolean,
    /**
     * A number indicating display order. 
     * Low -> High 
     */
    order: number,
    /**
     * Text-content of question 
     * (The question itself)
     */
    text: string,
    /**
     * When the question was created. 
     */
    created_at?: string,
}