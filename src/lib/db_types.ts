export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      'climbing-spot': {
        Row: {
          created_at: string | null;
          creator: string | null;
          description: string | null;
          difficulty: Database['public']['Enums']['difficulty'][] | null;
          id: number;
          image: string[] | null;
          location: number | null;
          name: string | null;
          type: Database['public']['Enums']['type'] | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          creator?: string | null;
          description?: string | null;
          difficulty?: Database['public']['Enums']['difficulty'][] | null;
          id?: number;
          image?: string[] | null;
          location?: number | null;
          name?: string | null;
          type?: Database['public']['Enums']['type'] | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          creator?: string | null;
          description?: string | null;
          difficulty?: Database['public']['Enums']['difficulty'][] | null;
          id?: number;
          image?: string[] | null;
          location?: number | null;
          name?: string | null;
          type?: Database['public']['Enums']['type'] | null;
          updated_at?: string | null;
        };
      };
      countries: {
        Row: {
          continent: Database['public']['Enums']['continents'] | null;
          id: number;
          iso2: string;
          iso3: string | null;
          local_name: string | null;
          name: string | null;
        };
        Insert: {
          continent?: Database['public']['Enums']['continents'] | null;
          id?: number;
          iso2: string;
          iso3?: string | null;
          local_name?: string | null;
          name?: string | null;
        };
        Update: {
          continent?: Database['public']['Enums']['continents'] | null;
          id?: number;
          iso2?: string;
          iso3?: string | null;
          local_name?: string | null;
          name?: string | null;
        };
      };
      location: {
        Row: {
          city: string | null;
          country: number | null;
          created_at: string | null;
          department: string | null;
          description: string | null;
          id: number;
          image: string[] | null;
          latitude: number | null;
          longitude: number | null;
          name: string | null;
        };
        Insert: {
          city?: string | null;
          country?: number | null;
          created_at?: string | null;
          department?: string | null;
          description?: string | null;
          id?: number;
          image?: string[] | null;
          latitude?: number | null;
          longitude?: number | null;
          name?: string | null;
        };
        Update: {
          city?: string | null;
          country?: number | null;
          created_at?: string | null;
          department?: string | null;
          description?: string | null;
          id?: number;
          image?: string[] | null;
          latitude?: number | null;
          longitude?: number | null;
          name?: string | null;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
      };
      review: {
        Row: {
          'climbing-spot': number | null;
          comment: string | null;
          created_at: string | null;
          id: number;
          rating: number | null;
        };
        Insert: {
          'climbing-spot'?: number | null;
          comment?: string | null;
          created_at?: string | null;
          id?: number;
          rating?: number | null;
        };
        Update: {
          'climbing-spot'?: number | null;
          comment?: string | null;
          created_at?: string | null;
          id?: number;
          rating?: number | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      parse_address: {
        Args: {
          '': string;
        };
        Returns: Record<string, unknown>;
      };
      standardize_address:
        | {
            Args: {
              lextab: string;
              gaztab: string;
              rultab: string;
              micro: string;
              macro: string;
            };
            Returns: Database['public']['CompositeTypes']['stdaddr'];
          }
        | {
            Args: {
              lextab: string;
              gaztab: string;
              rultab: string;
              address: string;
            };
            Returns: Database['public']['CompositeTypes']['stdaddr'];
          };
    };
    Enums: {
      continents:
        | 'Africa'
        | 'Antarctica'
        | 'Asia'
        | 'Europe'
        | 'Oceania'
        | 'North America'
        | 'South America';
      difficulty: 'Easy' | 'Medium' | 'Hard';
      diffulty: 'Easy' | 'Medium' | 'Hard';
      type: 'Indoor' | 'Outdoor';
    };
    CompositeTypes: {
      stdaddr: {
        building: string;
        house_num: string;
        predir: string;
        qual: string;
        pretype: string;
        name: string;
        suftype: string;
        sufdir: string;
        ruralroute: string;
        extra: string;
        city: string;
        state: string;
        country: string;
        postcode: string;
        box: string;
        unit: string;
      };
    };
  };
}
