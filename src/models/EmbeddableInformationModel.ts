import { EmbeddableModel } from "./EmbeddableModel";
import { PageModel } from "./PageModel";
import { QuestionModel } from "./QuestionModel";

/**
 * Information returned by the GET endpoint for embeddables, 
 * neededt to generate embeddable layout 
 */
export interface EmbeddableInformationModel {
    embeddable: EmbeddableModel, //THINKABOUT: needed?
    //page: PageModel,
    questions: QuestionModel[],
    mandatoryContactDetails: boolean
}