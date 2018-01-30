export interface TwitterCardMeta {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  description?: string;
  image?: string;
}
