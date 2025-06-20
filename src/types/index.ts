// Tavus API types
export interface IConversation {
  conversation_id: string;
  conversation_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Settings types
export interface Settings {
  persona?: string;
  greeting?: string;
  context?: string;
  name?: string;
}