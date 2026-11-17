import { component$ } from "@builder.io/qwik";

/** Original tomato engraving, decorative wherever the wordmark provides the name. */
export const BorgoMark = component$(() => (
  <svg class="tomato-mark" viewBox="0 0 120 110" fill="none" aria-hidden="true">
    <path
      d="M60 30C28 9 4 39 12 70c8 35 41 40 51 33 21 10 48-7 49-37 2-31-24-49-52-36Z"
      fill="currentColor"
    />
    <path
      d="m59 36-22-9 17-2-10-15 17 11 7-18 1 20 22-5-15 15 9 12-22-8-10 14Z"
      fill="var(--color-basil)"
      stroke="var(--color-cream)"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <path
      d="M31 47c-11 10-11 29-2 39m10-43c-6 9-7 18-6 24m60-17c9 13 7 28-1 39"
      stroke="var(--color-cream)"
      stroke-width="2.5"
      stroke-linecap="round"
    />
  </svg>
));
