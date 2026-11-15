import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { evaluate, validFinding } from '../evals/evaluate.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const required = ['README.md', 'AGENTS.md', 'docs/produto/prd-v1.md', 'docs/produto/problema-solucao.md',
  'docs/produto/lean-canvas.md', 'docs/produto/ai-canvas.md', 'docs/produto/moscow.md',
  'docs/produto/discovery.md', 'docs/specs/historias.md', 'docs/diario/checkpoint-02.md',
  'docs/adr/0001-recorte-e-arquitetura.md', 'architecture/README.md', 'prototype/README.md',
  'src/README.md', 'docs/pitch/README.md', '.github/workflows/ci.yml'];
for (const name of required) assert.ok(existsSync(resolve(root, name)), `Artefato ausente: ${name}`);
function walk(folder) {
  return readdirSync(folder, { withFileTypes: true }).filter(item => !['.git', 'node_modules'].includes(item.name))
    .flatMap(item => item.isDirectory() ? walk(resolve(folder, item.name)) : [resolve(folder, item.name)]);
}
const files = walk(root);
for (const file of files.filter(file => extname(file) === '.md')) {
  const content = readFileSync(file, 'utf8');
  for (const match of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (target && !/^[a-z]+:/i.test(target)) assert.ok(existsSync(resolve(dirname(file), target)), `Link quebrado em ${file}: ${target}`);
  }
  assert.ok(!content.includes('\uFFFD'), `Codificação inválida: ${file}`);
}
const stories = readFileSync(resolve(root, 'docs/specs/historias.md'), 'utf8');
for (let i = 1; i <= 6; i++) assert.ok(stories.includes(`## US-0${i}`) && stories.includes(`AC-0${i}.`), `História/aceite ausente: ${i}`);
const dataset = JSON.parse(readFileSync(resolve(root, 'evals/cases.json'), 'utf8'));
assert.equal(dataset.synthetic, true);
assert.ok(dataset.cases.length >= 8);
assert.equal(new Set(dataset.cases.map(item => item.id)).size, dataset.cases.length);
for (const sample of dataset.cases) {
  assert.ok(sample.pages.length > 0);
  for (const finding of sample.expected) assert.ok(validFinding(finding, sample.pages), `Gabarito sem fonte: ${sample.id}`);
}
// Previsões artificiais verificam somente o avaliador; nunca são resultado de modelo.
const artificial = { datasetVersion: dataset.version, model: 'test-fixture', promptVersion: 'test-only',
  cases: dataset.cases.map(item => ({ id: item.id, findings: structuredClone(item.expected) })) };
assert.equal(evaluate(dataset, artificial).passed, true);
const bad = structuredClone(artificial);
bad.cases[0].findings[0].page = 99;
assert.equal(evaluate(dataset, bad).passed, false);
const duplicate = structuredClone(artificial);
duplicate.cases[0].findings.push(structuredClone(duplicate.cases[0].findings[0]));
assert.equal(evaluate(dataset, duplicate).fp, 1);
const omitted = structuredClone(artificial);
omitted.cases[0].findings = [];
assert.equal(evaluate(dataset, omitted).fn, 1);
const extra = structuredClone(artificial);
extra.cases.find(item => item.id === 'no-penalty').findings = [{ category: 'penalty', page: 1, quote: 'multa de 5%' }];
assert.equal(evaluate(dataset, extra).passed, false);
assert.throws(() => evaluate(dataset, { ...artificial, cases: artificial.cases.slice(1) }));
assert.ok(files.every(file => statSync(file).size > 0), 'Arquivo vazio');
console.log(`OK: ${required.length} artefatos obrigatórios, links Markdown, 6 histórias, ${dataset.cases.length} casos sintéticos e testes do avaliador. Nenhuma IA foi executada.`);
