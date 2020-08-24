import { Card } from "rebass";
import { QuestionModel } from "../../../models/models";

export const QuestionCard = ({ question }: { question: QuestionModel }) => {

    return <Card>
        {question.text} - {question.id}
    </Card>
}