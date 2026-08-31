export function SkipLink() {
  return (
    <a
      href="#main"
      className="bg-card text-foreground sr-only rounded-lg px-3 py-2 font-bold focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
    >
      Skip to content
    </a>
  );
}
