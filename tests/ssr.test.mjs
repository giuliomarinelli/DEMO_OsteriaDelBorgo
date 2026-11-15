import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const base = new URL(process.env.SSR_BASE_URL || "http://127.0.0.1:8797");
assert.ok(
  ["127.0.0.1", "localhost", "[::1]"].includes(base.hostname),
  "I test sono riservati al runtime locale",
);
const routes = [
  ["/", "Il gusto di", "sentirsi", "a casa."],
  ["/storia/", "Le cose buone, quelle semplici."],
  ["/menu/", "La stagione detta la ricetta."],
  ["/galleria/", "C’è tempo per un altro boccone."],
  ["/contatti/", "Un posto a tavola. Per immaginare."],
];
const pages = new Map();
const visibleHtml = (html) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

for (const [route, ...words] of routes) {
  test(`SSR diretto: ${route} contiene contenuto, metadati e layout`, async () => {
    const response = await fetch(new URL(route, base), {
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") || "", /text\/html/);
    const html = visibleHtml(await response.text());
    pages.set(route, html);
    assert.match(html, /<html\b[^>]*lang="it"/);
    assert.ok(
      /<title\b[^>]*>[^<]*Osteria del Borgo[^<]*<\/title>/.test(html),
      "Titolo SSR Osteria del Borgo",
    );
    assert.match(
      html,
      /<meta\b[^>]*name="description"[^>]*content="[^"]{30,}"/,
    );
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
    assert.equal(headings.length, 1);
    for (const word of words) assert.ok(headings[0][1].includes(word));
    assert.match(html, /<main\b[^>]*id="contenuto"/);
    assert.match(html, /<header\b/);
    assert.match(html, /<footer\b/);
    assert.match(html, /Progetto demo/);
    assert.doesNotMatch(html, /<form\b|type="submit"/);
    for (const [path] of routes)
      assert.ok(html.includes(`href="${path}"`), `Navigazione verso ${path}`);
    const canonical = html.match(
      /<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/,
    );
    if (process.env.EXPECTED_CANONICAL_ORIGIN) {
      assert.equal(
        canonical?.[1],
        new URL(route, process.env.EXPECTED_CANONICAL_ORIGIN).href,
      );
    } else {
      assert.equal(
        canonical,
        null,
        "Nessun dominio canonico inventato in build non configurata",
      );
    }
  });
}

test("Tutti i collegamenti interni e gli asset HTML rispondono", async () => {
  assert.equal(pages.size, routes.length);
  const paths = new Set();
  for (const html of pages.values()) {
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g))
      paths.add(match[1]);
  }
  for (const path of paths) {
    const response = await fetch(new URL(path, base), {
      signal: AbortSignal.timeout(10000),
    });
    assert.equal(response.status, 200, path);
    await response.arrayBuffer();
  }
});

test("Rotta inesistente: vero stato 404 e pagina utile", async () => {
  const response = await fetch(new URL("/pagina-inesistente/", base));
  assert.equal(response.status, 404);
  const html = visibleHtml(await response.text());
  assert.match(html, /Questa pagina non è a tavola/);
  assert.match(html, /name="robots" content="noindex"/);
});

test("Artefatti Pages presenti, nessun documento pubblico prerenderizzato", async () => {
  const worker = await readFile(
    new URL("../dist/_worker.js", import.meta.url),
    "utf8",
  );
  assert.ok(worker.includes("fetch"));
  const config = JSON.parse(
    await readFile(new URL("../dist/_routes.json", import.meta.url), "utf8"),
  );
  assert.ok(config.include.includes("/*"));
  for (const [route] of routes) {
    await assert.rejects(
      readFile(new URL(`../dist${route}index.html`, import.meta.url)),
      { code: "ENOENT" },
    );
  }
});
