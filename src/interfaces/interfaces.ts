export interface SearchParams {
  startIndex?: number;
  query: string;
  orderBy?: string;
  category?: string;
  maxResults?: number;
  download?: 'epub';
  filter?: 'partial' | 'full' | 'free-ebooks' | 'paid-ebooks' | 'ebooks';
  langRestrict?: string;
  printType?: 'all' | 'books' | 'magazines';
  projection?: 'full' | 'lite';
}

export interface BookCardProps {
  title: string;
  image: string;
  category: string;
  authors: string[];
}
