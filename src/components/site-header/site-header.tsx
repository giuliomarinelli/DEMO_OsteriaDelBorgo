import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { navigation } from "~/content/site";

export const SiteHeader = component$(() => {
  const location = useLocation();
  return (
    <header class="site-header">
      <div class="shell flex flex-wrap items-center justify-between gap-5 py-6">
        <Link href="/" class="brand" aria-label="Osteria del Borgo — homepage">
          <span class="brand-mark" aria-hidden="true">
            ob<span>✳</span>
          </span>
          <span>
            Osteria <i>del</i> Borgo<small>CUCINA DI CASA, CON CALMA</small>
          </span>
        </Link>
        <nav class="desktop-nav" aria-label="Navigazione principale">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                location.url.pathname === item.href ? "page" : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
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
