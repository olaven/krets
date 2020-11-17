import * as faker from "faker";
import { database } from "../../../src/database/database";
import { first } from "../../../src/database/helpers/query";
import { PageModel, ResponseModel, Emotion, UserModel, AnswerModel, QuestionModel, EmbeddableModel } from "../../../src/models/models";


export const comparable = (array: { id?: string }[]) =>
    array.map(it => it.id).sort();


export const randomUser = (id = faker.random.uuid()): UserModel => ({
    id,
    active: true,
    wants_email_summary: false,
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
    archived,
});


//DANGER: unsafe SQL-variable injection. MUST NOT be exposed outside of test code. 
const fakeCreation = <T>(tableName: string, id: string) => first<T>(
    `update ${tableName} set created_at = $2 where id = $1 returning *`,
    [id, faker.date.past(1)]
);

export const setupAnswers = async (amount = faker.random.number({ min: 1, max: 25 }))
    : Promise<[UserModel, PageModel, ResponseModel, AnswerModel[]]> => {

    const user = await database.users.create(randomUser());
    const page = await database.pages.create(randomPage(user.id));
    const response = await database.responses.create(randomResponse(page.id));

    const persisted = [];
    for (let i = 0; i < amount; i++) {

        const answer = await database.answers.createAnswer(randomAnswer(response.id));
        persisted.push(answer);
    }

    return [user, page, response, persisted];
}

export const setupQuestions = async (amount = faker.random.number({ min: 1, max: 25 }), archived = false)
    : Promise<[UserModel, PageModel, QuestionModel[]]> => {

    const user = await database.users.create(randomUser());
    const page = await database.pages.create(randomPage(user.id));

    const persisted = [];
    for (let i = 0; i < amount; i++) {

        const question = await database.questions.create(
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

        const original = await database.users.create(randomUser());
        const alteredDate = await fakeCreation<UserModel>("users", original.id);
        persisted.push(alteredDate)
    }

    return persisted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export const blindSetup = async (responseCount = faker.random.number({ min: 1, max: 30 }))
    : Promise<[PageModel, UserModel, ResponseModel[]]> => {

    const user = await database.users.create(randomUser());
    const page = await database.pages.create(randomPage(user.id));
    const createdResonses = [];

    for (let i = 0; i < responseCount; i++) {

        const original = await database.responses.create(randomResponse(page.id))
        const alteredDate = await fakeCreation<ResponseModel>("responses", original.id);

        createdResonses.push(alteredDate);
    }

    //NOTE: as `fakeCreationDate` messes with sorting
    createdResonses.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return [page, user, createdResonses];
}

export const randomEmbeddable = (pageId: string): EmbeddableModel => ({
    token: faker.random.uuid(),
    page_id: pageId,
})

export const setupPages = async (amount = faker.random.number({ min: 2, max: 15 }), mandatoryContactDetails = false): Promise<[UserModel, PageModel[]]> => {

    const user = await database.users.create(randomUser(faker.random.uuid()));

    const persisted = []
    for (let i = 0; i < amount; i++) {


        const original = await database.pages.create(
            randomPage(user.id, null, null)
        );

        const alteredDate = await fakeCreation<PageModel>("pages", original.id);
        const withMandatoryProp = mandatoryContactDetails ?
            await database.pages.update({
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

export const setupEmbeddable = async (): Promise<[UserModel, PageModel, EmbeddableModel]> => {

    const user = await database.users.create(randomUser(faker.random.uuid()));
    const page = await database.pages.create(randomPage(user.id));
    const embeddable = await database.embeddables.create(randomEmbeddable(page.id))

    return [user, page, embeddable];
}

export const setupPage = async (mandatoryContactDetails = false): Promise<[UserModel, PageModel]> => {

    const [owner, [page]] = await setupPages(1, mandatoryContactDetails);
    return [owner, page];
}