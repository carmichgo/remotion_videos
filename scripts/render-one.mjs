// Renderiza un solo destinatario.
// Uso: npm run render:secretario -- --secretario=tamaulipas
//   o: node scripts/render-one.mjs --secretario=tamaulipas
import { loadSecretarios, renderSecretario } from './render-lib.mjs';

const arg = process.argv.find((a) => a.startsWith('--secretario='));
const slug = arg ? arg.split('=')[1] : process.argv[2];

if (!slug) {
  console.error(
    'Falta el slug. Uso: npm run render:secretario -- --secretario=<slug>',
  );
  process.exit(1);
}

const record = loadSecretarios().find((s) => s.slug === slug);
if (!record) {
  console.error(`No se encontró el destinatario con slug "${slug}".`);
  process.exit(1);
}

const out = await renderSecretario(record);
console.log(`Listo: ${out}`);
process.exit(0);
