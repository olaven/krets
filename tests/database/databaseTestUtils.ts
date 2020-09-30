import * as faker from "faker";
import { users, pages, responses, answers, questions } from "../../src/database/database";
import { first, run } from "../../src/database/helpers/query";
import { PageModel, ResponseModel, Emotion, UserModel, AnswerModel, QuestionModel } from "../../src/models/models";

const coinFlip = () =>
    faker.random.number({ min: 0, max: 1 }) === 1;

export const randomUser = (id = faker.random.uuid(), forceSubscription = false): UserModel => ({
    id,
    active: true,
    customer_id: faker.random.uuid(),
    invoice_paid: false,
    subscription_id: coinFlip() || forceSubscription ?
        faker.random.uuid() :
        null
});

export const randomPage = (ownerId: string, color: string = null, categoryId: string = null, mandatoryContactDetails = false): PageModel => ({
    id: faker.random.uuid(),
    name: faker.company.companyName(),
    owner_id: ownerId,
    color,
    category_id: categoryId,
    mandatory_contact_details: mandatoryContactDetails
});

export const randomResponse = (pageId: string, emotion: Emotion = ":-)", contactDetails: string | undefined = undefined): ResponseModel =>
    ({
        id: faker.random.uuid(),
        page_id: pageId,
        // text: faker.lorem.lines(1),
        emotion: emotion,
        contact_details: contactDetails
    });

export const randomAnswer = (responseId: string): AnswerModel => ({
    response_id: responseId,
    text: faker.lorem.lines(1)
});

export const randomQuestion = (pageId: string, archived = false): QuestionModel => ({
    page_id: pageId,
    text: faker.lorem.lines(1),
    archived
});


//DANGER: unsafe SQL-variable injection. MUST NOT be exposed outside of test code. 
const fakeCreation = <T>(tableName: string, id: string) => first<T>(
    `update ${tableName} set created_at = $2 where id = $1 returning *`,
    [id, faker.date.past(1)]
);

export const setupAnswers = async (amount = faker.random.number({ min: 1, max: 25 }))
    : Promise<[UserModel, PageModel, ResponseModel, AnswerModel[]]> => {

    const user = await users.createUser(randomUser());
    const page = await pages.createPage(randomPage(user.id));
    const response = await responses.createResponse(randomResponse(page.id));

    const persisted = [];
    for (let i = 0; i < amount; i++) {

        const answer = await answers.createAnswer(randomAnswer(response.id));
        persisted.push(answer);
    }

    return [user, page, response, persisted];
}

export const setupQuestions = async (amount = faker.random.number({ min: 1, max: 25 }), archived = false)
    : Promise<[UserModel, PageModel, QuestionModel[]]> => {

    const user = await users.createUser(randomUser());
    const page = await pages.createPage(randomPage(user.id));

    const persisted = [];
    for (let i = 0; i < amount; i++) {

        const question = await questions.createQuestion(
            randomQuestion(page.id, archived)
        );
        persisted.push(question);
    }

    return [user, page, persisted //NOTE: same order as db returns them -> easier to compare in tests
        .sort((a, b) => a.created_at < b.created_at ? 0 : -1)];
}


export const setupUsers = async (amount = faker.random.number({ min: 1, max: 20 })) => {

    const persisted: UserModel[] = [];
    for (let i = 0; i < amount; i++) {

        persisted.push(
            await fakeCreation<UserModel>(
                "users",
                (await users.createUser(randomUser())).id
            )
        );
    }

    return persisted;
}

export const blindSetup = async (responseCount = faker.random.number({ min: 1, max: 30 }))
    : Promise<[PageModel, UserModel, ResponseModel[]]> => {

    const user = await users.createUser(randomUser());
    const page = await pages.createPage(randomPage(user.id));
    const createdResonses = [];

    for (let i = 0; i < responseCount; i++) {

        const original = await responses.createResponse(randomResponse(page.id))
        const alteredDate = await fakeCreation<ResponseModel>("responses", original.id);

        createdResonses.push(alteredDate);
    }

    //NOTE: as `fakeCreationDate` messes with sorting
    createdResonses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return [page, user, createdResonses];
}


export const setupPages = async (amount = faker.random.number({ min: 2, max: 15 }), forceSubscription = false, mandatoryContactDetails = false): Promise<[UserModel, PageModel[]]> => {

    const user = await users.createUser(randomUser(faker.random.uuid(), forceSubscription));

    const persisted = []
    for (let i = 0; i < amount; i++) {


        const original = await pages.createPage(
            randomPage(user.id, null, null)
        );

        const alteredDate = await fakeCreation<PageModel>("pages", original.id);
        const withMandatoryProp = mandatoryContactDetails ?
            await pages.updatePage({
                ...alteredDate,
                mandatory_contact_details: true
            }) :
            alteredDate;

        persisted.push(withMandatoryProp);
    }

    //NOTE: as `fakeCreationDate` messes with sorting
    persisted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return [user, persisted];
}

export const setupPage = async (mandatoryContactDetails = false): Promise<[UserModel, PageModel]> => {

    const [owner, [page]] = await setupPages(1, false, mandatoryContactDetails);
    return [owner, page];
}