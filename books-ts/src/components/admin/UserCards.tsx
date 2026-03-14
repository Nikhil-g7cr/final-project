import type { User } from "../../services/UserService";
import { useUserProvider } from "../../providers/UserProvider";

interface UserCardProps {
    userItem: User;
    onDeleteClick: (email: string) => void;
}

const UserCard = ({ userItem, onDeleteClick }: UserCardProps) => {
    const { user: currentUser } = useUserProvider();
    
    const defaultImage = "https://via.placeholder.com/150?text=User";

    return (
        <div className="card h-100 border-0 shadow-sm p-3">
            <div className="card-body d-flex flex-column align-items-center text-center">
                
                <img 
                    src={userItem.photo || defaultImage} 
                    alt={userItem.name} 
                    className="rounded-circle mb-3"
                    style={{ width: "70px", height: "70px", objectFit: "cover" }}
                />
                
                <h6 className="fw-normal mb-1">{userItem.name}</h6>
                <span className="text-muted small mb-3">{userItem.email}</span>
                
                <div className="mb-4">
                    {userItem.roles && userItem.roles.length > 0 ? (
                        userItem.roles.map(role => (
                            <span key={role} className="badge bg-light text-dark border me-1 fw-normal">
                                {role}
                            </span>
                        ))
                    ) : (
                        <span className="badge bg-light text-secondary border fw-normal">User</span>
                    )}
                </div>

                <div className="mt-auto w-100">
                    {currentUser?.email !== userItem.email ? (
                        <button 
                            className="btn btn-sm btn-outline-danger w-100"
                            onClick={() => onDeleteClick(userItem.email)}
                        >
                            Delete
                        </button>
                    ) : (
                        <span className="btn btn-sm btn-light w-100 disabled">Current User</span>
                    )}
                </div>

            </div>
        </div>
    );
};

export default UserCard;