import React, { createContext, useEffect, useState } from "react";
import { PageModel, ReseponseModel } from "../models";
import { usePage } from "../effects/usePage";
import { useResponses } from "../effects/useResponses";
import PageId from "../pages/[pageId]";
import { get } from "../http/methods";


type AwaitingAdminInfo = {
    fetchedPage: Promise<[number, PageModel?]>,
    fetchedResponses: Promise<[number, ReseponseModel[]?]>
}[]

interface ContextInterface {
    awaitingAdminInfo: AwaitingAdminInfo,
    loading: boolean,
}


export const AdminPageContext = createContext<ContextInterface>({ awaitingAdminInfo: [], loading: true });


export const AdminPageContextProvider = ({ pageIds, children }: { pageIds: string[], children: any }) => {

    const [awaitingAdminInfo, setAwaitingAdminInfo] = useState<AwaitingAdminInfo>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        setLoading(true);
        const awaitingAdminInfo = pageIds
            .map(id => {

                //NOTE: somehow generalize fetch, as aving string url mutliple places is no fun in the long run..
                const fetchedPage = get<PageModel>(`/api/pages/${id}`);
                const fetchedResponses = get<ReseponseModel[]>(`/api/pages/${id}/responses`);

                return { fetchedPage, fetchedResponses }
            });

        setAwaitingAdminInfo(awaitingAdminInfo);
        setLoading(false);
    }, [pageIds.length]);

    return <AdminPageContext.Provider value={{ awaitingAdminInfo, loading }}>
        {children}
    </AdminPageContext.Provider>
};

