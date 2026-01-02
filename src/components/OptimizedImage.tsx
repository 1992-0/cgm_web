import imageManifest from '@/data/imageManifest.json';

type ManifestEntry = {
  original: {
    src: string;
    width: number;
    height: number;
  };
  webp: {
    srcSet: string;
  };
  jpeg: {
    srcSet: string;
  };
  fallback: {
    src: string;
  };
};

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'sync' | 'auto';
};

export function OptimizedImage({
  src,
  alt,
  className,
  sizes = '100vw',
  loading = 'lazy',
  decoding = 'async'
}: Props) {
  const entry = (imageManifest as Record<string, ManifestEntry | undefined>)[src];

  if (!entry) {
    return <img src={encodeURI(src)} alt={alt} className={className} loading={loading} decoding={decoding} />;
  }

  return (
    <picture>
      <source type="image/webp" srcSet={entry.webp.srcSet} sizes={sizes} />
      <source type="image/jpeg" srcSet={entry.jpeg.srcSet} sizes={sizes} />
      <img
        src={entry.fallback.src}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        width={entry.original.width}
        height={entry.original.height}
      />
    </picture>
  );
}

