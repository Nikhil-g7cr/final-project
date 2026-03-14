export interface Author {
  _id: string;
  name: string;
  biography: string;
  image: string; // FIX: Changed from 'image' to 'photo' to match database
  tags?: string[];
}
