export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      countries: {
        Row: {
          continent: Database["public"]["Enums"]["continents"] | null
          id: number
          iso2: string
          iso3: string | null
          local_name: string | null
          name: string | null
        }
        Insert: {
          continent?: Database["public"]["Enums"]["continents"] | null
          id?: number
          iso2: string
          iso3?: string | null
          local_name?: string | null
          name?: string | null
        }
        Update: {
          continent?: Database["public"]["Enums"]["continents"] | null
          id?: number
          iso2?: string
          iso3?: string | null
          local_name?: string | null
          name?: string | null
        }
      }
      events: {
        Row: {
          created_at: string | null
          creator_id: string
          end_at: string | null
          id: string
          name: string
          places: number
          spot_id: string
          start_at: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id: string
          end_at?: string | null
          id?: string
          name: string
          places?: number
          spot_id: string
          start_at: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string
          end_at?: string | null
          id?: string
          name?: string
          places?: number
          spot_id?: string
          start_at?: string
          updated_at?: string | null
        }
      }
      events_invitations: {
        Row: {
          created_at: string | null
          event_id: string
          event_participation_id: string | null
          id: string
          status: Database["public"]["Enums"]["invitation_status"] | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          event_participation_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["invitation_status"] | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          event_participation_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["invitation_status"] | null
          user_id?: string
        }
      }
      events_participations: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          status: Database["public"]["Enums"]["invitation_status"] | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          status?: Database["public"]["Enums"]["invitation_status"] | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          status?: Database["public"]["Enums"]["invitation_status"] | null
          user_id?: string
        }
      }
      locations: {
        Row: {
          city: string | null
          country: number | null
          created_at: string | null
          department: string | null
          id: number
          latitude: number
          longitude: number
        }
        Insert: {
          city?: string | null
          country?: number | null
          created_at?: string | null
          department?: string | null
          id?: number
          latitude: number
          longitude: number
        }
        Update: {
          city?: string | null
          country?: number | null
          created_at?: string | null
          department?: string | null
          id?: number
          latitude?: number
          longitude?: number
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      reviews: {
        Row: {
          content: string | null
          created_at: string | null
          creator_id: string
          id: string
          note: number | null
          spot_id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          creator_id: string
          id?: string
          note?: number | null
          spot_id: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          creator_id?: string
          id?: string
          note?: number | null
          spot_id?: string
          title?: string | null
          updated_at?: string | null
        }
      }
      reviews_likes: {
        Row: {
          created_at: string | null
          id: number
          profile_id: string
          review_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          profile_id: string
          review_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          profile_id?: string
          review_id?: string
        }
      }
      spots: {
        Row: {
          approach: string | null
          cliff_height: number | null
          created_at: string | null
          creator: string
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty"]
          id: string
          image: string[] | null
          location: number
          name: string
          orientation: Database["public"]["Enums"]["orientation"][] | null
          period: Database["public"]["Enums"]["month"][] | null
          rock_type: string | null
          type: Database["public"]["Enums"]["type"]
          updated_at: string | null
        }
        Insert: {
          approach?: string | null
          cliff_height?: number | null
          created_at?: string | null
          creator: string
          description?: string | null
          difficulty: Database["public"]["Enums"]["difficulty"]
          id?: string
          image?: string[] | null
          location: number
          name: string
          orientation?: Database["public"]["Enums"]["orientation"][] | null
          period?: Database["public"]["Enums"]["month"][] | null
          rock_type?: string | null
          type: Database["public"]["Enums"]["type"]
          updated_at?: string | null
        }
        Update: {
          approach?: string | null
          cliff_height?: number | null
          created_at?: string | null
          creator?: string
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty"]
          id?: string
          image?: string[] | null
          location?: number
          name?: string
          orientation?: Database["public"]["Enums"]["orientation"][] | null
          period?: Database["public"]["Enums"]["month"][] | null
          rock_type?: string | null
          type?: Database["public"]["Enums"]["type"]
          updated_at?: string | null
        }
      }
    }
    Views: {
      detailed_review: {
        Row: {
          content: string | null
          created_at: string | null
          creator_avatar_url: string | null
          creator_id: string | null
          id: string | null
          like_count: number | null
          note: number | null
          spot_id: string | null
          title: string | null
          updated_at: string | null
        }
      }
      event_extanded_view: {
        Row: {
          created_at: string | null
          creator: Json | null
          end_at: string | null
          id: string | null
          name: string | null
          start_at: string | null
          updated_at: string | null
        }
      }
      spot_extanded_view: {
        Row: {
          approach: string | null
          cliff_height: number | null
          created_at: string | null
          creator: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty"] | null
          id: string | null
          image: string[] | null
          location: number | null
          name: string | null
          note: number | null
          orientation: Database["public"]["Enums"]["orientation"][] | null
          period: Database["public"]["Enums"]["month"][] | null
          rock_type: string | null
          type: Database["public"]["Enums"]["type"] | null
          updated_at: string | null
        }
        Insert: {
          approach?: string | null
          cliff_height?: number | null
          created_at?: string | null
          creator?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty"] | null
          id?: string | null
          image?: string[] | null
          location?: number | null
          name?: string | null
          note?: never
          orientation?: Database["public"]["Enums"]["orientation"][] | null
          period?: Database["public"]["Enums"]["month"][] | null
          rock_type?: string | null
          type?: Database["public"]["Enums"]["type"] | null
          updated_at?: string | null
        }
        Update: {
          approach?: string | null
          cliff_height?: number | null
          created_at?: string | null
          creator?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty"] | null
          id?: string | null
          image?: string[] | null
          location?: number | null
          name?: string | null
          note?: never
          orientation?: Database["public"]["Enums"]["orientation"][] | null
          period?: Database["public"]["Enums"]["month"][] | null
          rock_type?: string | null
          type?: Database["public"]["Enums"]["type"] | null
          updated_at?: string | null
        }
      }
      spot_search_view: {
        Row: {
          city: string | null
          country: number | null
          department: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty"] | null
          id: string | null
          location_id: number | null
          name: string | null
          note: number | null
          type: Database["public"]["Enums"]["type"] | null
        }
      }
    }
    Functions: {
      check_review_like: {
        Args: {
          user_id: number
          spot_id: number
        }
        Returns: boolean
      }
      get_clusters: {
        Args: {
          min_latitude: number
          max_latitude: number
          min_longitude: number
          max_longitude: number
        }
        Returns: {
          result: Json
        }[]
      }
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      parse_address: {
        Args: {
          "": string
        }
        Returns: Record<string, unknown>
      }
      search_spots: {
        Args: {
          keyword: string
        }
        Returns: {
          city: string | null
          country: number | null
          department: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty"] | null
          id: string | null
          location_id: number | null
          name: string | null
          note: number | null
          type: Database["public"]["Enums"]["type"] | null
        }[]
      }
      search_spots_within_bounds: {
        Args: {
          latitude_gte: number
          latitude_lte: number
          longitude_gte: number
          longitude_lte: number
        }
        Returns: {
          id: string
          name: string
          latitude: number
          longitude: number
        }[]
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      standardize_address:
        | {
            Args: {
              lextab: string
              gaztab: string
              rultab: string
              micro: string
              macro: string
            }
            Returns: Database["public"]["CompositeTypes"]["stdaddr"]
          }
        | {
            Args: {
              lextab: string
              gaztab: string
              rultab: string
              address: string
            }
            Returns: Database["public"]["CompositeTypes"]["stdaddr"]
          }
    }
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
      difficulty: "Easy" | "Medium" | "Hard"
      diffulty: "Easy" | "Medium" | "Hard"
      invitation_status: "Pending" | "Accepted"
      month:
        | "January"
        | "February"
        | "March"
        | "April"
        | "May"
        | "June"
        | "July"
        | "August"
        | "September"
        | "October"
        | "November"
        | "December"
      orientation: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW"
      type: "Indoor" | "Outdoor"
    }
    CompositeTypes: {
      stdaddr: {
        building: string
        house_num: string
        predir: string
        qual: string
        pretype: string
        name: string
        suftype: string
        sufdir: string
        ruralroute: string
        extra: string
        city: string
        state: string
        country: string
        postcode: string
        box: string
        unit: string
      }
    }
  }
}
