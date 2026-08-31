export interface ServiceItem {
  id: string;
  name: string;
  badges: string[];
  shortDesc: string;
  fullDesc: string;
  priceTag: string;
  duration: string;
  image: string;
  popularFor?: string;
}

export interface StyleSelection {
  shape: string | null;
  length: string | null;
  vibe: string | null;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  tags: string[];
  serviceRecommended: string;
  styleName: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  proofTag: "Praised for longevity" | "Holli's artistry" | "Welcoming space";
}

export interface BookingFormData {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  styleChoice?: StyleSelection | null;
  fromInstagramStyle?: string | null;
}
