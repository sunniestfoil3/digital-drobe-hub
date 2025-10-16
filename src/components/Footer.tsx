import { FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa';

const Footer = () => {
  const links = {
    marketplace: [
      { label: 'Explorar', href: '#explore' },
      { label: 'Coleções', href: '#collections' },
      { label: 'Novidades', href: '#new' },
    ],
    criadores: [
      { label: 'Cadastrar-se', href: '#register' },
      { label: 'Recursos', href: '#resources' },
      { label: 'Suporte', href: '#support' },
    ],
    comunidade: [
      { label: 'Discord', href: '#discord' },
      { label: 'Blog', href: '#blog' },
      { label: 'Eventos', href: '#events' },
    ],
  };

  const socialLinks = [
    { icon: FaTwitter, href: '#twitter', label: 'Twitter' },
    { icon: FaInstagram, href: '#instagram', label: 'Instagram' },
    { icon: FaDiscord, href: '#discord', label: 'Discord' },
  ];

  return (
    <footer id="community" className="border-t border-border bg-card/30 mt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">MetaDrobe</h3>
            <p className="text-muted-foreground font-body mb-6">
              O futuro da moda está aqui. Vista seu avatar com estilo.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Marketplace</h4>
            <ul className="space-y-2">
              {links.marketplace.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors font-body"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Criadores</h4>
            <ul className="space-y-2">
              {links.criadores.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors font-body"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Comunidade</h4>
            <ul className="space-y-2">
              {links.comunidade.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors font-body"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-muted-foreground font-body text-sm">
            © 2025 MetaDrobe. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
