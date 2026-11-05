import { siteConfig } from "@/lib/site";

type TickerItem = {
  id: string;
  label: string;
  value: string;
  href?: string;
  featured?: boolean;
  external?: boolean;
};

/**
 * A compact, accessible contact-information ticker placed between
 * the homepage hero and the test catalogue.
 */
export default function BrandInfoTicker() {
  const items: TickerItem[] = [
    {
      id: "brand",
      label: "LABORATORY",
      value: "ANMOL HEALTH CARE LAB",
      featured: true,
    },
    ...siteConfig.phones.map((phone, index) => ({
      id: `phone-${index}`,
      label: "CALL",
      value: phone.display,
      href: phone.href,
    })),
    {
      id: "email",
      label: "EMAIL",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      id: "location",
      label: "LOCATION",
      value: siteConfig.address,
      href: siteConfig.directionsUrl,
      external: true,
    },
  ];

  function renderItems(isDuplicate = false) {
    return (
      <div
        className="lab-info-ticker__group"
        aria-hidden={isDuplicate ? true : undefined}
      >
        {items.map((item) => (
          <div
            className={`lab-info-ticker__item${item.featured ? " is-featured" : ""}`}
            key={item.id}
          >
            <span className="lab-info-ticker__label">{item.label}</span>
            {item.href ? (
              <a
                className="lab-info-ticker__value"
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                tabIndex={isDuplicate ? -1 : undefined}
              >
                {item.value}
              </a>
            ) : (
              <span className="lab-info-ticker__value">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <section
      className="lab-info-ticker"
      aria-label="Anmol Health Care Lab contact information"
    >
      <div className="lab-info-ticker__viewport">
        <div className="lab-info-ticker__track">
          {renderItems()}
          {renderItems(true)}
        </div>
      </div>
    </section>
  );
}
