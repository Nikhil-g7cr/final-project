import { Link } from "react-router-dom";

const AdminPage = () => {
    return (
        <div className="container mt-5">
            <h2 className="fw-light mb-4">Admin Dashboard</h2>
            
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h5 className="fw-normal mb-3">User Management</h5>
                            <p className="text-muted small mb-4">View, verify, and manage user accounts.</p>
                            <Link to="/admin/users" className="btn btn-dark w-100">Manage Users</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h5 className="fw-normal mb-3">Books</h5>
                            <p className="text-muted small mb-4">Add a new book title to the catalog.</p>
                            <Link to="/books/add" className="btn btn-outline-dark w-100">Add Book</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h5 className="fw-normal mb-3">Authors</h5>
                            <p className="text-muted small mb-4">Create a new author profile.</p>
                            <Link to="/authors/add" className="btn btn-outline-dark w-100">Add Author</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;