import type { User } from "../../services/UserService";
import { useUserProvider } from "../../providers/UserProvider";

interface UserCardProps {
    userItem: User;
    onDeleteClick: (email: string) => void;
}

const UserCard = ({ userItem, onDeleteClick }: UserCardProps) => {

    const { user: currentUser } = useUserProvider();
    const defaultImage = "https://via.placeholder.com/100";

    return (
        <div className="card">

            <div className="card-body text-center">

                <img
                    src={userItem.photo || defaultImage}
                    alt={userItem.name}
                    className="rounded-circle mb-2"
                    width="80"
                    height="80"
                />

                <h5>{userItem.name}</h5>
                <p>{userItem.email}</p>

                {currentUser?.email !== userItem.email ? (
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDeleteClick(userItem.email)}
                    >
                        Delete
                    </button>
                ) : (
                    <button className="btn btn-secondary btn-sm" disabled>
                        Current User
                    </button>
                )}

            </div>

        </div>
    );
};

export default UserCard;