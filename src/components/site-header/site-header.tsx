import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { navigation } from "~/content/site";
import { BorgoMark } from "~/components/borgo-mark/borgo-mark";

export const SiteHeader = component$(() => {
  const location = useLocation();
  return (
    <header class="site-header">
      <div class="shell header-inner">
        <Link href="/" class="brand" aria-label="Osteria del Borgo — homepage">
          <BorgoMark />
          <span>
            Osteria <small>del Borgo</small>
          </span>
        </Link>
        <nav class="desktop-nav" aria-label="Navigazione principale">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                location.url.pathname === item.href ? "page" : "false"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link class="header-note" href="/menu/">
          Cosa bolle in pentola? <span aria-hidden="true">↗</span>
        </Link>
        <details class="mobile-menu">
          <summary>
            Esplora <span aria-hidden="true">☰</span>
          </summary>
          <nav aria-label="Navigazione mobile">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={
                  location.url.pathname === item.href ? "page" : undefined
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
});
