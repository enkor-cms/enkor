import { GetSpotResponseSuccess } from '@/features/spots';
import { Database } from '@/lib/db_types';

export type Event = Database['public']['Tables']['events']['Row'];
export type EventInsert = Database['public']['Tables']['events']['Insert'];

export type EventParticipation =
  Database['public']['Tables']['events_participations']['Row'];
export type EventParticipationInsert =
  Database['public']['Tables']['events_participations']['Insert'];

export type EventInvitation =
  Database['public']['Tables']['events_invitations']['Row'];
export type EventInvitationInsert =
  Database['public']['Tables']['events_invitations']['Insert'];

export type TEventCreateModalProps = {
  spot?: GetSpotResponseSuccess;
  spotId: Event['spot_id'];
  creatorId: Event['creator_id'];
  onClose?: () => void;
  onConfirm?: (event: Event) => void;
};

export type TEventInsert = Database['public']['Tables']['events']['Insert'];
