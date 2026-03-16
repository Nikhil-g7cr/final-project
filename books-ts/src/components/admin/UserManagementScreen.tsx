import { useState, useEffect } from "react";
import userService, { type User } from "../../services/UserService";
import Loading from "../utils/Loading";
import UserCard from "./UserCards";

const UserManagementScreen = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await userService.getAllUsers();
            const usersArray = Array.isArray(data) ? data : data?.users || [];
            setUsers(usersArray);
            setLoading(false);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const deleteUser = async (email: string) => {
        try {
            await userService.deleteUser(email);
            setUsers(users.filter(u => u.email !== email));
        } catch {
            alert("Delete failed");
        }
    };

    if (loading) return <Loading message="Loading users..." />;

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    return (

        <div className="container mt-4">

            <h3 className="mb-4">Users</h3>

            <div className="row">

                {users.map((u, index) => (
                    <div className="col-md-3 mb-3" key={u.email || index}>
                        <UserCard userItem={u} onDeleteClick={deleteUser} />
                    </div>
                ))}

            </div>

        </div>

    );
};

export default UserManagementScreen;