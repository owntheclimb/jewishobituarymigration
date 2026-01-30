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
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_settings: {
        Row: {
          category: string | null
          default_value: Json | null
          description: string | null
          id: string
          is_secret: boolean | null
          key: string
          label: string | null
          sort_order: number | null
          updated_at: string | null
          updated_by: string | null
          value: Json
          value_type: string | null
        }
        Insert: {
          category?: string | null
          default_value?: Json | null
          description?: string | null
          id?: string
          is_secret?: boolean | null
          key: string
          label?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
          value: Json
          value_type?: string | null
        }
        Update: {
          category?: string | null
          default_value?: Json | null
          description?: string | null
          id?: string
          is_secret?: boolean | null
          key?: string
          label?: string | null
          sort_order?: number | null
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
          value_type?: string | null
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
          address: string | null
          city_name: string | null
          created_at: string | null
          denomination: string | null
          description: string | null
          email: string | null
          founded_year: number | null
          id: string
          name: string
          phone: string | null
          rabbi_name: string | null
          slug: string
          state_code: string | null
          stats_recent_count: number | null
          status: string | null
          submitted_by: string | null
          type: string
          updated_at: string | null
          verified: boolean | null
          website: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          city_name?: string | null
          created_at?: string | null
          denomination?: string | null
          description?: string | null
          email?: string | null
          founded_year?: number | null
          id?: string
          name: string
          phone?: string | null
          rabbi_name?: string | null
          slug: string
          state_code?: string | null
          stats_recent_count?: number | null
          status?: string | null
          submitted_by?: string | null
          type: string
          updated_at?: string | null
          verified?: boolean | null
          website?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          city_name?: string | null
          created_at?: string | null
          denomination?: string | null
          description?: string | null
          email?: string | null
          founded_year?: number | null
          id?: string
          name?: string
          phone?: string | null
          rabbi_name?: string | null
          slug?: string
          state_code?: string | null
          stats_recent_count?: number | null
          status?: string | null
          submitted_by?: string | null
          type?: string
          updated_at?: string | null
          verified?: boolean | null
          website?: string | null
          zip?: string | null
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
      contact_submissions: {
        Row: {
          admin_notes: string | null
          assigned_to: string | null
          category: string | null
          created_at: string | null
          email: string
          id: string
          ip_address: unknown
          message: string
          name: string
          notes: string | null
          obituary_id: string | null
          page_url: string | null
          phone: string | null
          replied_at: string | null
          replied_by: string | null
          source: string | null
          status: string | null
          subject: string | null
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
          vendor_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          assigned_to?: string | null
          category?: string | null
          created_at?: string | null
          email: string
          id?: string
          ip_address?: unknown
          message: string
          name: string
          notes?: string | null
          obituary_id?: string | null
          page_url?: string | null
          phone?: string | null
          replied_at?: string | null
          replied_by?: string | null
          source?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          vendor_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          assigned_to?: string | null
          category?: string | null
          created_at?: string | null
          email?: string
          id?: string
          ip_address?: unknown
          message?: string
          name?: string
          notes?: string | null
          obituary_id?: string | null
          page_url?: string | null
          phone?: string | null
          replied_at?: string | null
          replied_by?: string | null
          source?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_submissions_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_submissions_obituary_id_fkey"
            columns: ["obituary_id"]
            isOneToOne: false
            referencedRelation: "obituaries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_submissions_replied_by_fkey"
            columns: ["replied_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_submissions_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
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
      industry_pages: {
        Row: {
          created_at: string | null
          educational_content: string | null
          faq_content: Json | null
          hero_heading: string | null
          hero_subheading: string | null
          id: string
          intro_content: string | null
          is_published: boolean | null
          meta_description: string | null
          related_industries: string[] | null
          slug: string
          sort_order: number | null
          title: string
          updated_at: string | null
          vendor_type_id: string | null
        }
        Insert: {
          created_at?: string | null
          educational_content?: string | null
          faq_content?: Json | null
          hero_heading?: string | null
          hero_subheading?: string | null
          id?: string
          intro_content?: string | null
          is_published?: boolean | null
          meta_description?: string | null
          related_industries?: string[] | null
          slug: string
          sort_order?: number | null
          title: string
          updated_at?: string | null
          vendor_type_id?: string | null
        }
        Update: {
          created_at?: string | null
          educational_content?: string | null
          faq_content?: Json | null
          hero_heading?: string | null
          hero_subheading?: string | null
          id?: string
          intro_content?: string | null
          is_published?: boolean | null
          meta_description?: string | null
          related_industries?: string[] | null
          slug?: string
          sort_order?: number | null
          title?: string
          updated_at?: string | null
          vendor_type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "industry_pages_vendor_type_id_fkey"
            columns: ["vendor_type_id"]
            isOneToOne: false
            referencedRelation: "vendor_types"
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
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          name: string | null
          source: string | null
          status: string | null
          subscribed_at: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          name?: string | null
          source?: string | null
          status?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          name?: string | null
          source?: string | null
          status?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      notable_figures: {
        Row: {
          bio: string | null
          birth_date: string | null
          birth_year: number | null
          candle_count: number | null
          category: string | null
          created_at: string | null
          death_date: string | null
          death_year: number | null
          external_links: Json | null
          featured: boolean | null
          hebrew_name: string | null
          id: string
          image_url: string | null
          memory_count: number | null
          meta_description: string | null
          meta_title: string | null
          name: string
          notable_for: string | null
          short_bio: string | null
          slug: string
          sort_order: number | null
          status: string | null
          subcategory: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          birth_date?: string | null
          birth_year?: number | null
          candle_count?: number | null
          category?: string | null
          created_at?: string | null
          death_date?: string | null
          death_year?: number | null
          external_links?: Json | null
          featured?: boolean | null
          hebrew_name?: string | null
          id?: string
          image_url?: string | null
          memory_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          notable_for?: string | null
          short_bio?: string | null
          slug: string
          sort_order?: number | null
          status?: string | null
          subcategory?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          birth_date?: string | null
          birth_year?: number | null
          candle_count?: number | null
          category?: string | null
          created_at?: string | null
          death_date?: string | null
          death_year?: number | null
          external_links?: Json | null
          featured?: boolean | null
          hebrew_name?: string | null
          id?: string
          image_url?: string | null
          memory_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          notable_for?: string | null
          short_bio?: string | null
          slug?: string
          sort_order?: number | null
          status?: string | null
          subcategory?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      obit_sources: {
        Row: {
          active: boolean | null
          city: string | null
          created_at: string | null
          feed_url: string | null
          id: string | null
          is_active: boolean | null
          key: string
          label: string
          last_fetched: string | null
          name: string | null
          region: string | null
          state: string | null
          type: string
          updated_at: string | null
          url: string
        }
        Insert: {
          active?: boolean | null
          city?: string | null
          created_at?: string | null
          feed_url?: string | null
          id?: string | null
          is_active?: boolean | null
          key: string
          label: string
          last_fetched?: string | null
          name?: string | null
          region?: string | null
          state?: string | null
          type: string
          updated_at?: string | null
          url: string
        }
        Update: {
          active?: boolean | null
          city?: string | null
          created_at?: string | null
          feed_url?: string | null
          id?: string | null
          is_active?: boolean | null
          key?: string
          label?: string
          last_fetched?: string | null
          name?: string | null
          region?: string | null
          state?: string | null
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
        Relationships: []
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
      product_categories: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          compare_at_price: number | null
          created_at: string | null
          description: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          images: Json | null
          inventory_count: number | null
          meta_description: string | null
          meta_title: string | null
          name: string
          price: number
          short_description: string | null
          sku: string | null
          slug: string
          sort_order: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          compare_at_price?: number | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          images?: Json | null
          inventory_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          price: number
          short_description?: string | null
          sku?: string | null
          slug: string
          sort_order?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          compare_at_price?: number | null
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          images?: Json | null
          inventory_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          price?: number
          short_description?: string | null
          sku?: string | null
          slug?: string
          sort_order?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
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
          is_admin: boolean | null
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
          is_admin?: boolean | null
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
          is_admin?: boolean | null
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
          city: string | null
          created_at: string | null
          id: string
          is_active: boolean
          last_error: string | null
          last_scraped: string | null
          listing_url: string
          name: string
          obituary_list_url: string | null
          platform: string | null
          region: string | null
          scrape_count: number | null
          scraper_config: Json | null
          state: string | null
        }
        Insert: {
          base_url: string
          city?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean
          last_error?: string | null
          last_scraped?: string | null
          listing_url: string
          name: string
          obituary_list_url?: string | null
          platform?: string | null
          region?: string | null
          scrape_count?: number | null
          scraper_config?: Json | null
          state?: string | null
        }
        Update: {
          base_url?: string
          city?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean
          last_error?: string | null
          last_scraped?: string | null
          listing_url?: string
          name?: string
          obituary_list_url?: string | null
          platform?: string | null
          region?: string | null
          scrape_count?: number | null
          scraper_config?: Json | null
          state?: string | null
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content: string | null
          content_type: string | null
          id: string
          key: string
          page: string | null
          section: string | null
          title: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          content?: string | null
          content_type?: string | null
          id?: string
          key: string
          page?: string | null
          section?: string | null
          title?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          content?: string | null
          content_type?: string | null
          id?: string
          key?: string
          page?: string | null
          section?: string | null
          title?: string | null
          updated_at?: string | null
          updated_by?: string | null
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
      vendor_claims: {
        Row: {
          additional_notes: string | null
          address: string | null
          admin_notes: string | null
          business_name: string
          business_type: string
          city: string | null
          contact_email: string
          contact_name: string
          contact_phone: string
          contact_title: string | null
          created_at: string | null
          description: string | null
          email: string
          id: string
          phone: string
          reviewed_at: string | null
          reviewed_by: string | null
          services: string | null
          state: string | null
          status: string | null
          updated_at: string | null
          vendor_id: string | null
          verification_method: string
          website: string | null
          zip: string | null
        }
        Insert: {
          additional_notes?: string | null
          address?: string | null
          admin_notes?: string | null
          business_name: string
          business_type: string
          city?: string | null
          contact_email: string
          contact_name: string
          contact_phone: string
          contact_title?: string | null
          created_at?: string | null
          description?: string | null
          email: string
          id?: string
          phone: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          services?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          vendor_id?: string | null
          verification_method: string
          website?: string | null
          zip?: string | null
        }
        Update: {
          additional_notes?: string | null
          address?: string | null
          admin_notes?: string | null
          business_name?: string
          business_type?: string
          city?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          contact_title?: string | null
          created_at?: string | null
          description?: string | null
          email?: string
          id?: string
          phone?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          services?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          vendor_id?: string | null
          verification_method?: string
          website?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_claims_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_leads: {
        Row: {
          created_at: string | null
          id: string
          lead_data: Json | null
          lead_type: string
          source_page: string | null
          vendor_id: string | null
          visitor_ip: string | null
          visitor_session: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          lead_data?: Json | null
          lead_type: string
          source_page?: string | null
          vendor_id?: string | null
          visitor_ip?: string | null
          visitor_session?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          lead_data?: Json | null
          lead_type?: string
          source_page?: string | null
          vendor_id?: string | null
          visitor_ip?: string | null
          visitor_session?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_leads_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_types: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      vendors: {
        Row: {
          address: string | null
          city: string | null
          contact_submissions: number | null
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          email: string | null
          featured: boolean | null
          hours: Json | null
          id: string
          images: Json | null
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          meta_description: string | null
          meta_title: string | null
          name: string
          page_views: number | null
          phone: string | null
          phone_clicks: number | null
          price_range: string | null
          services: Json | null
          short_description: string | null
          slug: string
          sort_order: number | null
          state: string | null
          status: string | null
          tier: string | null
          type_id: string | null
          updated_at: string | null
          verified: boolean | null
          website: string | null
          website_clicks: number | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          contact_submissions?: number | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          featured?: boolean | null
          hours?: Json | null
          id?: string
          images?: Json | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          page_views?: number | null
          phone?: string | null
          phone_clicks?: number | null
          price_range?: string | null
          services?: Json | null
          short_description?: string | null
          slug: string
          sort_order?: number | null
          state?: string | null
          status?: string | null
          tier?: string | null
          type_id?: string | null
          updated_at?: string | null
          verified?: boolean | null
          website?: string | null
          website_clicks?: number | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          contact_submissions?: number | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          featured?: boolean | null
          hours?: Json | null
          id?: string
          images?: Json | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          page_views?: number | null
          phone?: string | null
          phone_clicks?: number | null
          price_range?: string | null
          services?: Json | null
          short_description?: string | null
          slug?: string
          sort_order?: number | null
          state?: string | null
          status?: string | null
          tier?: string | null
          type_id?: string | null
          updated_at?: string | null
          verified?: boolean | null
          website?: string | null
          website_clicks?: number | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendors_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "vendor_types"
            referencedColumns: ["id"]
          },
        ]
      }
      virtual_candles: {
        Row: {
          candle_type: string | null
          city: string | null
          country: string | null
          duration_days: number | null
          email: string | null
          entity_id: string
          entity_type: string
          expires_at: string | null
          id: string
          is_lit: boolean | null
          lit_at: string | null
          message: string | null
          name: string | null
          notable_figure_id: string | null
          obituary_id: string | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          candle_type?: string | null
          city?: string | null
          country?: string | null
          duration_days?: number | null
          email?: string | null
          entity_id: string
          entity_type: string
          expires_at?: string | null
          id?: string
          is_lit?: boolean | null
          lit_at?: string | null
          message?: string | null
          name?: string | null
          notable_figure_id?: string | null
          obituary_id?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          candle_type?: string | null
          city?: string | null
          country?: string | null
          duration_days?: number | null
          email?: string | null
          entity_id?: string
          entity_type?: string
          expires_at?: string | null
          id?: string
          is_lit?: boolean | null
          lit_at?: string | null
          message?: string | null
          name?: string | null
          notable_figure_id?: string | null
          obituary_id?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "virtual_candles_notable_figure_id_fkey"
            columns: ["notable_figure_id"]
            isOneToOne: false
            referencedRelation: "notable_figures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "virtual_candles_obituary_id_fkey"
            columns: ["obituary_id"]
            isOneToOne: false
            referencedRelation: "obituaries"
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
      is_admin: { Args: never; Returns: boolean }
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
