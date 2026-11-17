import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { BorgoMark } from "~/components/borgo-mark/borgo-mark";

export const SiteFooter = component$(() => (
  <footer class="site-footer">
    <div class="shell footer-invitation">
      <p class="eyebrow">L’ULTIMA PAROLA? IL DOLCE.</p>
      <p class="footer-title">
        Si sta bene,
        <br />
        in buona compagnia.
      </p>
      <Link class="button button-cream" href="/menu/">
        Un altro giro nel menu <span aria-hidden="true">↗</span>
      </Link>
      <BorgoMark />
    </div>
    <div class="shell footer-bottom">
      <Link class="footer-brand" href="/">
        Osteria del Borgo
      </Link>
      <nav aria-label="Navigazione a piè di pagina">
        <Link href="/storia/">La nostra storia</Link>
        <Link href="/galleria/">L’ambiente</Link>
        <Link href="/contatti/">Contatti e demo</Link>
      </nav>
      <p>
        © {new Date().getUTCFullYear()} · Progetto demo di portfolio.
        <br />
        Attività fittizia. Nessuna prenotazione reale.
      </p>
    </div>
  </footer>
));
