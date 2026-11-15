import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const normalize = value => value.replace(/\s+/g, ' ').trim();
const categories = new Set(['obligation', 'penalty', 'attention']);
export function validFinding(finding, pages) {
  return finding && categories.has(finding.category) && Number.isInteger(finding.page)
    && finding.page >= 1 && finding.page <= pages.length && typeof finding.quote === 'string'
    && normalize(finding.quote).length > 0
    && normalize(pages[finding.page - 1]).includes(normalize(finding.quote));
}
export function evaluate(dataset, predictions) {
  if (predictions.datasetVersion !== dataset.version || !predictions.model || !predictions.promptVersion)
    throw new Error('Informe datasetVersion correto, model e promptVersion.');
  if (!Array.isArray(predictions.cases) || predictions.cases.length !== dataset.cases.length)
    throw new Error('Previsões devem cobrir todos os casos exatamente uma vez.');
  const byId = new Map(predictions.cases.map(item => [item.id, item]));
  if (byId.size !== dataset.cases.length) throw new Error('IDs duplicados.');
  let tp = 0, fp = 0, fn = 0, valid = 0, total = 0;
  for (const sample of dataset.cases) {
    const prediction = byId.get(sample.id);
    if (!prediction || !Array.isArray(prediction.findings)) throw new Error(`Caso inválido/ausente: ${sample.id}`);
    const matched = new Set();
    for (const finding of prediction.findings) {
      total++;
      const sourceValid = validFinding(finding, sample.pages);
      if (sourceValid) valid++;
      const index = sourceValid ? sample.expected.findIndex((expected, i) => !matched.has(i)
        && finding.category === expected.category && finding.page === expected.page
        && normalize(finding.quote) === normalize(expected.quote)) : -1;
      if (index >= 0) { tp++; matched.add(index); } else fp++;
    }
    fn += sample.expected.length - matched.size;
  }
  const precision = tp + fp ? tp / (tp + fp) : 0;
  const recall = tp + fn ? tp / (tp + fn) : 0;
  const sourceValidity = total ? valid / total : 0;
  return { datasetVersion: dataset.version, model: predictions.model, promptVersion: predictions.promptVersion,
    tp, fp, fn, findings: total, precision, recall, sourceValidity,
    passed: precision >= 0.9 && recall >= 0.8 && sourceValidity === 1 };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === fileURLToPath(new URL(`file:///${process.argv[1].replaceAll('\\', '/').replace(/^\//, '')}`))) {
  try {
    const args = process.argv.slice(2);
    if (args[0] !== '--predictions' || !args[1]) throw new Error('Uso: npm run eval -- --predictions caminho/previsoes.json. Sem previsões reais, não há taxa de acerto.');
    const dataset = JSON.parse(readFileSync(new URL('./cases.json', import.meta.url), 'utf8'));
    const result = evaluate(dataset, JSON.parse(readFileSync(args[1], 'utf8')));
    console.log(JSON.stringify(result, null, 2));
    if (!result.passed) process.exitCode = 1;
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
