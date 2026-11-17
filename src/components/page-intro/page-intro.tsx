import { component$, Slot } from "@builder.io/qwik";

export const PageIntro = component$<{
  number: string;
  eyebrow: string;
  title: string;
}>(({ number, eyebrow, title }) => (
  <section class="shell page-intro">
    <div class="section-label">
      <span>{number}</span>
      <p class="eyebrow">{eyebrow}</p>
      <span class="section-line" />
    </div>
    <h1>{title}</h1>
    <div class="intro-copy">
      <Slot />
    </div>
  </section>
));
