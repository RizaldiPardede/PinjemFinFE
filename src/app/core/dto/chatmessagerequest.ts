export interface ChatMessage {
    senderNip: number;
    receiverNip: number;
    content: string;
    timestamp: Date;
  }