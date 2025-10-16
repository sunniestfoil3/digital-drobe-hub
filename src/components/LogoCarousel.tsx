const LogoCarousel = () => {
  const brands = [
    'METAVERSE',
    'CRYPTO FASHION',
    'DIGITAL COUTURE',
    'VIRTUAL STYLE',
    'NFT WEAR',
    'CYBER MODE',
  ];

  return (
    <section className="py-12 border-y border-border overflow-hidden bg-card/30">
      <div className="relative">
        <div className="flex gap-12 animate-scroll">
          {/* First set */}
          {brands.map((brand, index) => (
            <div
              key={`brand-1-${index}`}
              className="flex-shrink-0 text-2xl font-heading font-semibold text-muted-foreground/40 whitespace-nowrap"
            >
              {brand}
            </div>
          ))}
          {/* Duplicate for infinite scroll */}
          {brands.map((brand, index) => (
            <div
              key={`brand-2-${index}`}
              className="flex-shrink-0 text-2xl font-heading font-semibold text-muted-foreground/40 whitespace-nowrap"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default LogoCarousel;
