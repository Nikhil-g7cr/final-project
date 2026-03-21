import { useState } from "react";
import { Link } from "react-router-dom";

export interface CardProps {
  path: string;
  imageSrc: string;
  imageAlt: string;
  imageTitle?: string;
  subheading: string;
}

const Card = ({
  path,
  subheading,
  imageSrc,
  imageAlt,
  imageTitle,
}: CardProps) => {
  const [isApproved, setIsApproved] = useState(false);

  const handleApprove = () => {
    setIsApproved(true);
  };

  const handleDecline = () => {
    setIsApproved(false);
  };

  return (
    <div>
      <Link className="Card" to={path}>
        <img src={imageSrc} alt={imageAlt} title={imageTitle} />

        <h4>{subheading}</h4>
      </Link>
      {!isApproved ? (
        <div>
          <button className="btn btn-success" onClick={handleApprove}>
            Approve
          </button>
          <button className="btn btn-danger" onClick={handleDecline}>
            Decline
          </button>
        </div>
      ) : (
        <div className="approved-message">
          <p>Approved</p>
        </div>
      )}
    </div>
  );
};

export default Card;
