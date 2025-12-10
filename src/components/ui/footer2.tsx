interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    src: "/Lonvia-Logo.svg",
    alt: "Lonvia Health",
    title: "Lonvia",
    url: "/",
  },
  tagline = "Live longer, live well.",
  menuItems = [
    {
      title: "Services",
      links: [
        { text: "Lonvia Labs", url: "/lonvia-labs" },
        { text: "Urology", url: "/urology" },
        { text: "Orthopedics", url: "/orthopedics" },
        { text: "Oncology", url: "/oncology" },
        { text: "Surgery", url: "/surgery" },
        { text: "Internal Medicine", url: "/internal-medicine" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About Us", url: "/about" },
        { text: "Our Team", url: "/#team" },
        { text: "Partners", url: "/partners" },
        { text: "Contact", url: "/about/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Help Center", url: "#" },
        { text: "Book Appointment", url: "#" },
        { text: "Lab Results", url: "#" },
      ],
    },
    {
      title: "Connect",
      links: [
        { text: "LinkedIn", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "Twitter", url: "#" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} Lonvia Health. All rights reserved.`,
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
    { text: "Imprint", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className="py-16 md:py-24 bg-primary-900 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-3 lg:justify-start">
                <a href={logo.url} className="flex items-center gap-3">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    className="h-10 brightness-0 invert"
                  />
                  <span className="text-xl font-semibold text-white">{logo.title}</span>
                </a>
              </div>
              <p className="mt-4 font-bold text-primary-200">{tagline}</p>
              <p className="mt-4 text-sm text-primary-300 max-w-xs">
                Connecting you with world-class medical professionals for personalized healthcare solutions across Europe.
              </p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-white">{section.title}</h3>
                <ul className="space-y-3 text-primary-300">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-white transition-colors duration-200"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-col justify-between gap-4 border-t border-primary-700 pt-8 text-sm font-medium text-primary-400 md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex flex-wrap gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-white transition-colors duration-200">
                  <a href={link.url} className="underline underline-offset-2">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };

