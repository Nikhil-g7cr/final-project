import { useState, useEffect } from "react";
import AuthorService from "../../services/AuthorService";
import type { Author } from "../../types/Author";

const AuthorManagment = () => {
    const [pendingAuthors, setPendingAuthors] = useState<Author[]>([]);

    useEffect(() => {
        // Fetch only pending authors on load
        AuthorService.getPendingAuthors()
            .then(setPendingAuthors)
            .catch(err => console.error("Failed to fetch pending authors", err));
    }, []);

    const handleApprove = async (id: string) => {
        try {
            await AuthorService.approveAuthor(id);
            
            setPendingAuthors((currentAuthors) => 
                currentAuthors.filter((author) => author._id !== id)
            );
        } catch (error) {
            console.error("Failed to approve author", error);
        }
    };

    const handleReject = async (id: string) => {
        try {
            await AuthorService.deleteAuthorById(id);
            
            setPendingAuthors((currentAuthors) => 
                currentAuthors.filter((author) => author._id !== id)
            );
            
        } catch (error) {
            console.error("Failed to reject author", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Pending Authors Approval</h2>
            {pendingAuthors.length === 0 ? (
                <p>No pending authors to approve.</p>
            ) : (
                <div className="list-group">
                    {pendingAuthors.map((author) => (
                        <div key={author._id} className="list-group-item d-flex justify-content-between align-items-center mb-3 shadow-sm rounded">
                            <div className="d-flex align-items-center gap-3">
                                {author.image && (
                                    <img 
                                        src={author.image} 
                                        alt={author.name} 
                                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }} 
                                    />
                                )}
                                <div>
                                    <h5 className="mb-0">{author.name}</h5>
                                    <small className="text-muted">{author.biography?.substring(0, 60)}...</small>
                                </div>
                            </div>
                            
                            <div className="d-flex gap-2">
                                <button 
                                    className="btn btn-success" 
                                    onClick={() => handleApprove(author._id!)}
                                >
                                    Approve
                                </button>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleReject(author._id!)}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AuthorManagment;