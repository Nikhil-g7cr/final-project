import { useState, useEffect } from "react";
import userService, { type User } from "../../services/UserService";
import Loading from "../utils/Loading";
import UserCard from "./UserCards";

const UserManagementScreen = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleteUser, setDeleteUser] = useState<string | null>(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await userService.getAllUsers();
            const usersArray = Array.isArray(data) ? data : (data?.users || data?.data || []);
            setUsers(usersArray);
            setLoading(false);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Failed to load users");
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!deleteUser) return;

        try {
            await userService.deleteUser(deleteUser);
            setUsers(users.filter(u => u.email !== deleteUser));
            setDeleteUser(null);
        } catch {
            alert("Failed to delete user.");
            setDeleteUser(null);
        }
    };

    if (loading) return <Loading message="Loading..." />;

    if (error) {
        return (
            <div className="container">
                <div className="errorBox">{error}</div>
            </div>
        );
    }

    return (
        <div className="container">

            <div className="header">
                <h3 className="title">Users</h3>
            </div>

            {users.length === 0 && (
                <div className="emptyBox">
                    No users found in the database.
                </div>
            )}

            <div className="userList">
                {users.map((u, idx) => (
                    <div className="userItem" key={u.email || idx}>
                        <UserCard userItem={u} onDeleteClick={setDeleteUser} />
                    </div>
                ))}
            </div>

            {deleteUser && (
                <div className="modalBg">
                    <div className="modalBox">
                        <div className="modalContent">
                            <h5 className="modalTitle">Delete User?</h5>
                            <p className="modalText">{deleteUser}</p>

                            <div className="modalButtons">
                                <button className="btnCancel" onClick={() => setDeleteUser(null)}>
                                    Cancel
                                </button>

                                <button className="btnDelete" onClick={confirmDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default UserManagementScreen;