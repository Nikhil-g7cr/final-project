import { Link } from "react-router-dom";

const AdminPage = () => {
    const nav=[
        {navtag:"Open", link:"/admin/users",htag:"User Management",ptag:"Manage All Users"},
        {navtag:"Books aproval Requests", link:"/books/approve",htag:"Book Management",ptag:"Manage All Books"},
        {navtag:"Authors aproval Request", link:"/authors/approve",htag:"Author Management",ptag:"Manage All Authors"}

    ]
    return (
        <div className="container mt-4">

            <h2 className="mb-4">Admin Dashboard</h2>

            <div className="row">

                {nav.map((item)=>(
                    <div  className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <h5>{item.htag}
                                </h5>
                                    <p>
                                       {item.ptag}
                                    </p>
                                        <Link to={item.link} className="btn btn-primary">
                                        {item.navtag}
                                        </Link>
                            </div>
                        </div>
                    </div>
                ))}

                {/* <div className="col-md-4 mb-3">
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
                </div> */}

            </div>

        </div>
    );
};

export default AdminPage;