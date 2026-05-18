// Renderiza en serie todos los destinatarios de data/secretarios.json.
// Uso: npm run render:all
import { loadSecretarios, renderSecretario } from './render-lib.mjs';

const secretarios = loadSecretarios();
console.log(`Renderizando ${secretarios.length} videos…`);

const results = [];
for (const record of secretarios) {
  try {
    const out = await renderSecretario(record);
    results.push({ slug: record.slug, ok: true, out });
  } catch (err) {
    console.error(`\nError renderizando ${record.slug}:`, err.message);
    results.push({ slug: record.slug, ok: false, error: err.message });
  }
}

console.log('\nResumen:');
for (const r of results) {
  console.log(`  ${r.ok ? '✓' : '✗'} ${r.slug}${r.ok ? '' : ` (${r.error})`}`);
}

const failed = results.filter((r) => !r.ok).length;
process.exit(failed > 0 ? 1 : 0);
