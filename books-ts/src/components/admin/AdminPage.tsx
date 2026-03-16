import { Link } from "react-router-dom";

const AdminPage = () => {
    return (
        <div className="container mt-4">

            <h2 className="mb-4">Admin Dashboard</h2>

            <div className="row">

                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5>User Management</h5>
                            <p>Manage all users</p>
                            <Link to="/admin/users" className="btn btn-primary">
                                Open
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5>Add Book</h5>
                            <p>Add new books</p>
                            <Link to="/books/add" className="btn btn-success">
                                Add Book
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5>Add Author</h5>
                            <p>Create new author</p>
                            <Link to="/authors/add" className="btn btn-warning">
                                Add Author
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AdminPage;