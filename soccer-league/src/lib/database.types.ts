export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    first_name: string | null
                    last_name: string | null
                    role: 'admin' | 'coach' | 'player' | 'parent'
                    created_at: string
                }
                Insert: {
                    id: string
                    first_name?: string | null
                    last_name?: string | null
                    role?: 'admin' | 'coach' | 'player' | 'parent'
                    created_at?: string
                }
                Update: {
                    id?: string
                    first_name?: string | null
                    last_name?: string | null
                    role?: 'admin' | 'coach' | 'player' | 'parent'
                    created_at?: string
                }
            }
            leagues: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    admin_id: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    description?: string | null
                    admin_id?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string | null
                    admin_id?: string | null
                    created_at?: string
                }
            }
            seasons: {
                Row: {
                    id: string
                    league_id: string
                    name: string
                    status: 'upcoming' | 'active' | 'archived'
                    start_date: string | null
                    end_date: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    league_id: string
                    name: string
                    status?: 'upcoming' | 'active' | 'archived'
                    start_date?: string | null
                    end_date?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    league_id?: string
                    name?: string
                    status?: 'upcoming' | 'active' | 'archived'
                    start_date?: string | null
                    end_date?: string | null
                    created_at?: string
                }
            }
            divisions: {
                Row: {
                    id: string
                    season_id: string
                    name: string
                    age_group: string | null
                    track_standings: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    season_id: string
                    name: string
                    age_group?: string | null
                    track_standings?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    season_id?: string
                    name?: string
                    age_group?: string | null
                    track_standings?: boolean
                    created_at?: string
                }
            }
            teams: {
                Row: {
                    id: string
                    division_id: string
                    name: string
                    coach_id: string | null
                    color_primary: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    division_id: string
                    name: string
                    coach_id?: string | null
                    color_primary?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    division_id?: string
                    name?: string
                    coach_id?: string | null
                    color_primary?: string | null
                    created_at?: string
                }
            }
            games: {
                Row: {
                    id: string
                    division_id: string
                    home_team_id: string
                    away_team_id: string
                    start_time: string
                    location: string
                    home_score: number | null
                    away_score: number | null
                    status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
                    created_at: string
                }
                Insert: {
                    id?: string
                    division_id: string
                    home_team_id: string
                    away_team_id: string
                    start_time: string
                    location: string
                    home_score?: number | null
                    away_score?: number | null
                    status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
                    created_at?: string
                }
                Update: {
                    id?: string
                    division_id?: string
                    home_team_id?: string
                    away_team_id?: string
                    start_time?: string
                    location?: string
                    home_score?: number | null
                    away_score?: number | null
                    status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
                    created_at?: string
                }
            }
        }
    }
}
