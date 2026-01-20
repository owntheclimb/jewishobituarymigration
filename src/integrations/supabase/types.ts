export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          id: string
          key: string
          updated_at: string | null
          updated_by: string | null
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string | null
          event_name: string
          event_properties: Json | null
          id: string
          ip_country: string | null
          page_url: string | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_name: string
          event_properties?: Json | null
          id?: string
          ip_country?: string | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_name?: string
          event_properties?: Json | null
          id?: string
          ip_country?: string | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cemeteries: {
        Row: {
          city: string
          created_at: string
          custom_rules: string | null
          denomination: string | null
          email: string | null
          has_available_plots: boolean | null
          id: string
          latitude: number | null
          location: string
          longitude: number | null
          name: string
          phone: string | null
          photos: Json | null
          plot_pricing: Json | null
          state: string
          updated_at: string
          visiting_hours: string | null
          website: string | null
        }
        Insert: {
          city: string
          created_at?: string
          custom_rules?: string | null
          denomination?: string | null
          email?: string | null
          has_available_plots?: boolean | null
          id?: string
          latitude?: number | null
          location: string
          longitude?: number | null
          name: string
          phone?: string | null
          photos?: Json | null
          plot_pricing?: Json | null
          state: string
          updated_at?: string
          visiting_hours?: string | null
          website?: string | null
        }
        Update: {
          city?: string
          created_at?: string
          custom_rules?: string | null
          denomination?: string | null
          email?: string | null
          has_available_plots?: boolean | null
          id?: string
          latitude?: number | null
          location?: string
          longitude?: number | null
          name?: string
          phone?: string | null
          photos?: Json | null
          plot_pricing?: Json | null
          state?: string
          updated_at?: string
          visiting_hours?: string | null
          website?: string | null
        }
        Relationships: []
      }
      communities: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
          stats_recent_count: number | null
          status: string | null
          submitted_by: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
          stats_recent_count?: number | null
          status?: string | null
          submitted_by?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
          stats_recent_count?: number | null
          status?: string | null
          submitted_by?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      community_links: {
        Row: {
          community_id: string
          created_at: string | null
          id: string
          obituary_id: string
        }
        Insert: {
          community_id: string
          created_at?: string | null
          id?: string
          obituary_id: string
        }
        Update: {
          community_id?: string
          created_at?: string | null
          id?: string
          obituary_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_links_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_links_obituary_id_fkey"
            columns: ["obituary_id"]
            isOneToOne: false
            referencedRelation: "obituaries"
            referencedColumns: ["id"]
          },
        ]
      }
      guestbook_entries: {
        Row: {
          author_name: string
          author_user_id: string | null
          created_at: string | null
          id: string
          message: string
          obituary_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          author_name: string
          author_user_id?: string | null
          created_at?: string | null
          id?: string
          message: string
          obituary_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          author_name?: string
          author_user_id?: string | null
          created_at?: string | null
          id?: string
          message?: string
          obituary_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guestbook_entries_obituary_id_fkey"
            columns: ["obituary_id"]
            isOneToOne: false
            referencedRelation: "obituaries"
            referencedColumns: ["id"]
          },
        ]
      }
      media_assets: {
        Row: {
          caption: string | null
          created_at: string | null
          duration_seconds: number | null
          height: number | null
          id: string
          obituary_id: string
          status: string | null
          storage_key: string
          thumb_key: string | null
          title: string | null
          type: string
          updated_at: string | null
          uploader_user_id: string | null
          visibility: string | null
          width: number | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          height?: number | null
          id?: string
          obituary_id: string
          status?: string | null
          storage_key: string
          thumb_key?: string | null
          title?: string | null
          type: string
          updated_at?: string | null
          uploader_user_id?: string | null
          visibility?: string | null
          width?: number | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          height?: number | null
          id?: string
          obituary_id?: string
          status?: string | null
          storage_key?: string
          thumb_key?: string | null
          title?: string | null
          type?: string
          updated_at?: string | null
          uploader_user_id?: string | null
          visibility?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_assets_obituary_id_fkey"
            columns: ["obituary_id"]
            isOneToOne: false
            referencedRelation: "obituaries"
            referencedColumns: ["id"]
          },
        ]
      }
      memories: {
        Row: {
          author_name: string
          author_user_id: string | null
          body: string
          created_at: string | null
          id: string
          obituary_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          author_name: string
          author_user_id?: string | null
          body: string
          created_at?: string | null
          id?: string
          obituary_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          author_name?: string
          author_user_id?: string | null
          body?: string
          created_at?: string | null
          id?: string
          obituary_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "memories_obituary_id_fkey"
            columns: ["obituary_id"]
            isOneToOne: false
            referencedRelation: "obituaries"
            referencedColumns: ["id"]
          },
        ]
      }
      obit_sources: {
        Row: {
          active: boolean | null
          created_at: string | null
          feed_url: string | null
          key: string
          label: string
          type: string
          updated_at: string | null
          url: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          feed_url?: string | null
          key: string
          label: string
          type: string
          updated_at?: string | null
          url: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          feed_url?: string | null
          key?: string
          label?: string
          type?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      obits: {
        Row: {
          city: string | null
          created_at: string | null
          id: string
          image_url: string | null
          published_at: string | null
          source_name: string
          source_url: string
          state: string | null
          summary: string | null
          title: string
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          id: string
          image_url?: string | null
          published_at?: string | null
          source_name: string
          source_url: string
          state?: string | null
          summary?: string | null
          title: string
        }
        Update: {
          city?: string | null
          created_at?: string | null
          id?: string
          image_url?: string | null
          published_at?: string | null
          source_name?: string
          source_url?: string
          state?: string | null
          summary?: string | null
          title?: string
        }
        Relationships: []
      }
      obituaries: {
        Row: {
          biography: string | null
          city: string | null
          colleges: string[] | null
          created_at: string
          date_of_birth: string | null
          date_of_death: string | null
          full_name: string
          funeral_details: string | null
          hebrew_name: string | null
          high_schools: string[] | null
          id: string
          location: string | null
          military_branches: string[] | null
          photo_url: string | null
          published: boolean | null
          state: string | null
          updated_at: string
          user_id: string
          visibility: string | null
        }
        Insert: {
          biography?: string | null
          city?: string | null
          colleges?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          date_of_death?: string | null
          full_name: string
          funeral_details?: string | null
          hebrew_name?: string | null
          high_schools?: string[] | null
          id?: string
          location?: string | null
          military_branches?: string[] | null
          photo_url?: string | null
          published?: boolean | null
          state?: string | null
          updated_at?: string
          user_id: string
          visibility?: string | null
        }
        Update: {
          biography?: string | null
          city?: string | null
          colleges?: string[] | null
          created_at?: string
          date_of_birth?: string | null
          date_of_death?: string | null
          full_name?: string
          funeral_details?: string | null
          hebrew_name?: string | null
          high_schools?: string[] | null
          id?: string
          location?: string | null
          military_branches?: string[] | null
          photo_url?: string | null
          published?: boolean | null
          state?: string | null
          updated_at?: string
          user_id?: string
          visibility?: string | null
        }
        Relationships: []
      }
      obituary_settings: {
        Row: {
          allow_public_uploads: boolean | null
          guestbook_enabled: boolean | null
          max_video_seconds: number | null
          obituary_id: string
          require_moderation_for_uploads: boolean | null
          updated_at: string | null
        }
        Insert: {
          allow_public_uploads?: boolean | null
          guestbook_enabled?: boolean | null
          max_video_seconds?: number | null
          obituary_id: string
          require_moderation_for_uploads?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allow_public_uploads?: boolean | null
          guestbook_enabled?: boolean | null
          max_video_seconds?: number | null
          obituary_id?: string
          require_moderation_for_uploads?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "obituary_settings_obituary_id_fkey"
            columns: ["obituary_id"]
            isOneToOne: true
            referencedRelation: "obituaries"
            referencedColumns: ["id"]
          },
        ]
      }
      obituary_themes: {
        Row: {
          accent_color_hex: string | null
          background_style: string | null
          music_enabled: boolean | null
          obituary_id: string
          updated_at: string | null
        }
        Insert: {
          accent_color_hex?: string | null
          background_style?: string | null
          music_enabled?: boolean | null
          obituary_id: string
          updated_at?: string | null
        }
        Update: {
          accent_color_hex?: string | null
          background_style?: string | null
          music_enabled?: boolean | null
          obituary_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "obituary_themes_obituary_id_fkey"
            columns: ["obituary_id"]
            isOneToOne: true
            referencedRelation: "obituaries"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          notification_preferences: Json | null
          phone: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          notification_preferences?: Json | null
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          notification_preferences?: Json | null
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      rb2b_leads: {
        Row: {
          city: string | null
          company_domain: string | null
          company_industry: string | null
          company_name: string | null
          company_size: string | null
          country: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          first_seen_at: string | null
          full_name: string | null
          id: string
          job_title: string | null
          last_name: string | null
          last_seen_at: string | null
          linkedin_url: string | null
          notes: string | null
          page_url: string | null
          rb2b_id: string | null
          referrer: string | null
          state: string | null
          status: string | null
          updated_at: string | null
          visit_count: number | null
        }
        Insert: {
          city?: string | null
          company_domain?: string | null
          company_industry?: string | null
          company_name?: string | null
          company_size?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          first_seen_at?: string | null
          full_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          last_seen_at?: string | null
          linkedin_url?: string | null
          notes?: string | null
          page_url?: string | null
          rb2b_id?: string | null
          referrer?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          visit_count?: number | null
        }
        Update: {
          city?: string | null
          company_domain?: string | null
          company_industry?: string | null
          company_name?: string | null
          company_size?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          first_seen_at?: string | null
          full_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          last_seen_at?: string | null
          linkedin_url?: string | null
          notes?: string | null
          page_url?: string | null
          rb2b_id?: string | null
          referrer?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          visit_count?: number | null
        }
        Relationships: []
      }
      scraped_obituaries: {
        Row: {
          city: string | null
          created_at: string | null
          date_of_death: string | null
          id: string
          image_url: string | null
          is_jewish: boolean
          name: string
          published_at: string | null
          snippet: string | null
          source: string
          source_url: string
          state: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          date_of_death?: string | null
          id?: string
          image_url?: string | null
          is_jewish?: boolean
          name: string
          published_at?: string | null
          snippet?: string | null
          source: string
          source_url: string
          state?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          date_of_death?: string | null
          id?: string
          image_url?: string | null
          is_jewish?: boolean
          name?: string
          published_at?: string | null
          snippet?: string | null
          source?: string
          source_url?: string
          state?: string | null
        }
        Relationships: []
      }
      scraped_sources: {
        Row: {
          base_url: string
          created_at: string | null
          id: string
          is_active: boolean
          listing_url: string
          name: string
          region: string | null
        }
        Insert: {
          base_url: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          listing_url: string
          name: string
          region?: string | null
        }
        Update: {
          base_url?: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          listing_url?: string
          name?: string
          region?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          community_id: string
          created_at: string | null
          frequency: string | null
          id: string
          last_sent_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          community_id: string
          created_at?: string | null
          frequency?: string | null
          id?: string
          last_sent_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          community_id?: string
          created_at?: string | null
          frequency?: string | null
          id?: string
          last_sent_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "communities"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_profile_for_notification: {
        Args: { obituary_user_id: string }
        Returns: {
          email: string
          full_name: string
        }[]
      }
      get_profiles_for_digest: {
        Args: never
        Returns: {
          community_id: string
          community_name: string
          community_slug: string
          community_type: string
          last_sent_at: string
          subscription_id: string
          user_email: string
          user_full_name: string
          user_id: string
        }[]
      }
      is_obituary_owner: {
        Args: { check_user_id: string; obit_id: string }
        Returns: boolean
      }
      update_community_stats: { Args: never; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
