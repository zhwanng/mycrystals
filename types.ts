
export interface Crystal {
  id: string;
  name: string;
  chemicalFormula?: string;
  color: string[];
  hardness?: string;
  chakra?: string[];
  zodiac?: string[];
  element?: string[];
  healingProperties: string[];
  description: string;
  origin?: string;
  imageUrl: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface CrystalSearchResponse {
  content: string;
  sources: GroundingSource[];
}
