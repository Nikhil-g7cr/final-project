import { Link } from "react-router-dom";

export interface CardProps {
  path:any;
  imageSrc:any;
  imageAlt:string;
  imageTitle?:string;
  subheading:string;
}

const Card = ({ path,subheading,imageSrc,imageAlt,imageTitle  }: CardProps) => {
  return (
    <Link 
        className="Card" 
        to={path}
    >
      <img 
        src={imageSrc} 
        alt={imageAlt} 
        title={imageTitle} 
      />

      <h4>
        {subheading}
      </h4>
    </Link>
  );
};

export default Card;
