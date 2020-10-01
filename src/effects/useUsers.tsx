import { useEffect, useState } from "react";
import { UserModel } from "../models/models";
import { usePagination } from "./usePagination";

export const useUsers = (): [UserModel[], boolean, boolean, () => void] => {

    const [page, moreAvailable, loading, getNext] = usePagination<UserModel>(`/api/users`);

    //A buffer keeping old `.data`
    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {

        setUsers([...users, ...page.data])
    }, [page.next]);

    return [users, moreAvailable, loading, getNext];
}