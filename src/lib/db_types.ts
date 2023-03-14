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
          creator_id: string | null
          end_at: string | null
          id: string
          name: string | null
          spot_id: string | null
          start_at: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          end_at?: string | null
          id?: string
          name?: string | null
          spot_id?: string | null
          start_at?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          end_at?: string | null
          id?: string
          name?: string | null
          spot_id?: string | null
          start_at?: string | null
          updated_at?: string | null
        }
      }
      events_invitations: {
        Row: {
          created_at: string | null
          event_id: string | null
          event_participation_id: string | null
          id: string
          status: Database["public"]["Enums"]["invitation_status"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          event_participation_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["invitation_status"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          event_participation_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["invitation_status"] | null
          user_id?: string | null
        }
      }
      events_participations: {
        Row: {
          created_at: string | null
          event_id: string | null
          id: string
          status: Database["public"]["Enums"]["invitation_status"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["invitation_status"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["invitation_status"] | null
          user_id?: string | null
        }
      }
      locations: {
        Row: {
          city: string | null
          country: number | null
          created_at: string | null
          department: string | null
          id: number
          latitude: number | null
          longitude: number | null
        }
        Insert: {
          city?: string | null
          country?: number | null
          created_at?: string | null
          department?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
        }
        Update: {
          city?: string | null
          country?: number | null
          created_at?: string | null
          department?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
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
      review: {
        Row: {
          content: string | null
          created_at: string | null
          creator_id: string | null
          id: string
          note: number | null
          spot_id: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          creator_id?: string | null
          id?: string
          note?: number | null
          spot_id?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          creator_id?: string | null
          id?: string
          note?: number | null
          spot_id?: string | null
          title?: string | null
          updated_at?: string | null
        }
      }
      review_like: {
        Row: {
          created_at: string | null
          id: number
          profile_id: string | null
          review_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          profile_id?: string | null
          review_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          profile_id?: string | null
          review_id?: string | null
        }
      }
      spots: {
        Row: {
          created_at: string | null
          creator: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty"] | null
          id: string
          image: string[] | null
          location: number | null
          name: string | null
          type: Database["public"]["Enums"]["type"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty"] | null
          id?: string
          image?: string[] | null
          location?: number | null
          name?: string | null
          type?: Database["public"]["Enums"]["type"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty"] | null
          id?: string
          image?: string[] | null
          location?: number | null
          name?: string | null
          type?: Database["public"]["Enums"]["type"] | null
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
      spot_extanded_view: {
        Row: {
          created_at: string | null
          creator: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty"] | null
          id: string | null
          image: string[] | null
          location: number | null
          name: string | null
          note: number | null
          type: Database["public"]["Enums"]["type"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty"] | null
          id?: string | null
          image?: string[] | null
          location?: number | null
          name?: string | null
          note?: never
          type?: Database["public"]["Enums"]["type"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty"] | null
          id?: string | null
          image?: string[] | null
          location?: number | null
          name?: string | null
          note?: never
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
