const items = Array.from({ length: 8 }, () => "SUBUP");

export function LogoTicker() {
  return (
    <div className="border-border overflow-hidden border-y bg-white py-8">
      <div className="flex w-max animate-[subup-marquee_28s_linear_infinite] items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center">
            {items.map((word, index) => (
              <div key={`${copy}-${index}`} className="flex items-center">
                <span className="text-primary/5 px-12 text-5xl font-extrabold tracking-[-0.06em] italic uppercase sm:text-[60px]">
                  {word}
                </span>
                <span className="bg-cyan size-3 rounded-full opacity-30" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
