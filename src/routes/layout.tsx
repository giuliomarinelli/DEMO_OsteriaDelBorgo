import { component$, Slot } from "@builder.io/qwik";
import { SiteHeader } from "~/components/site-header/site-header";
import { SiteFooter } from "~/components/site-footer/site-footer";

export default component$(() => (
  <>
    <a class="skip-link" href="#contenuto">
      Vai al contenuto
    </a>
    <div class="demo-strip">
      UNA TRATTORIA INVENTATA. LA FAME, QUELLA VERA.{" "}
      <span>· Progetto demo</span>
    </div>
    <SiteHeader />
    <main id="contenuto" tabIndex={-1}>
      <Slot />
    </main>
    <SiteFooter />
  </>
));
