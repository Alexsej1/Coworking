export interface CoworkingSpace {
  id: number;
  name: string;
  location: string;
  price: number;
  type: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
  amenities: string[];
}

export interface BookingFormData {
  space_id: number;
  user_name: string;
  email: string;
  phone: string;
  guests: string;
  date: Date | undefined;
  time: string;
  notes: string;
}

export interface BookingData {
  userName: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  notes: string;
  space: {
    id: number;
    name: string;
    location: string;
    price: number;
  };
}
