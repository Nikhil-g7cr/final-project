import { useUserProvider } from "../../providers/UserProvider";

const Profile = () => {
    const { user } = useUserProvider();
  return (
    <div className="container mt-4">    
        <h2>User Profile</h2>
        {user ? (
          <div className="card mb-4" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={user.photo || "https://via.placeholder.com/150"}
                        className="img-fluid rounded-start"
                        alt={user.name}
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text"><strong>Email:</strong> {user.email}</p>
                        <p className="card-text"><strong>Role:</strong> {user.roles?.join(", ")}</p>
                    </div>
                </div>
            </div>
          </div>
        ) : (
          <p>Please log in to view your profile information.</p>
        )}

    </div>
  );
}

export default Profile;