import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const SiteFooter = component$(() => (
  <footer class="site-footer">
    <div class="shell grid gap-8 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
      <div>
        <p class="footer-brand">
          Osteria <i>del</i> Borgo
        </p>
        <p>Le cose buone hanno bisogno di tempo.</p>
      </div>
      <div>
        <p class="eyebrow">Un piccolo giro</p>
        <div class="footer-links">
          <Link href="/storia/">La nostra storia ↗</Link>
          <Link href="/menu/">Il menu ↗</Link>
          <Link href="/galleria/">L’ambiente ↗</Link>
        </div>
      </div>
      <div>
        <p class="eyebrow">Prima di accomodarti</p>
        <p>Un’osteria immaginaria, un progetto concreto.</p>
        <Link class="text-link" href="/contatti/">
          Informazioni sulla demo ↗
        </Link>
      </div>
    </div>
    <div class="shell footer-bottom">
      <span>
        © {new Date().getUTCFullYear()} Osteria del Borgo · Case study di
        portfolio
      </span>
      <span>Attività fittizia. Nessuna prenotazione reale.</span>
    </div>
  </footer>
));
