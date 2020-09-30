import { useUsers } from "../../effects/useUsers"

export const Users = () => {

    const [users, moreAvailable, pageLoading, getNextPages] = useUsers();

    return <>
        <p>List of users {users.length}</p>
        <p>loadmore</p>
        <p>Are they active?</p>
        <p>Are they administrators?</p>
        <p>toggle active</p>
        <p>double confirm: toggle admin</p>
    </>
}