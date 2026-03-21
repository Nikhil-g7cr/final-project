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
  

  return (
    <div>
      <Link className="Card" to={path}>
        <img src={imageSrc} alt={imageAlt} title={imageTitle} />

        <h4>{subheading}</h4>
      </Link>
      
    </div>
  );
};

export default Card;
