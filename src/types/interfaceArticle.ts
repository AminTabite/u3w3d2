// Non è necessario definire un'interfaccia "article" che contiene tutte le altre.
// Ogni export interface è già un'entità a sé stante.

export interface Root {
  count: number;
  next: string;
  previous: string | null; // L'API potrebbe restituire null per 'previous'
  results: Article[]; // Ho rinominato Result in Article per chiarezza,
  // e per essere coerente con il nome del tuo componente.
}

export interface Article {
  id: number;
  title: string;
  authors: Author[];
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: Launch[];
  events: Event[];
}

export interface Author {
  name: string;
  socials: Socials;
}

export interface Socials {
  x: string;
  youtube: string;
  instagram: string;
  linkedin: string;
  mastodon: string;
  bluesky: string;
}

export interface Launch {
  launch_id: string;
  provider: string;
}

export interface Event {
  event_id: number;
  provider: string;
}
