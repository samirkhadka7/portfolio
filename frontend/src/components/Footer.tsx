interface FooterProps {
  brand: string;
}

export function Footer({ brand }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-outline-variant/20 bg-surface-container-lowest py-8">
      <div className="mx-auto flex w-full max-w-container-max flex-col items-center justify-between gap-4 px-margin-mobile md:flex-row md:px-margin-desktop">
        <div className="font-headline-md text-headline-md font-bold text-primary">{brand}</div>
        <div className="font-body-md text-body-md text-on-surface-variant">
          © {year} {brand}. Built with precision.
        </div>
        <div className="flex gap-6">
          <a
            href="#"
            className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-secondary"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-secondary"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-secondary"
          >
            Open Source
          </a>
        </div>
      </div>
    </footer>
  );
}
