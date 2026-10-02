## Evals

`evals/` bewaakt dit skill. Draai vanuit de skill-map:

```bash
node evals/run.mjs                  # alle suites
node evals/run.mjs --suite static   # alleen snelle, deterministische checks
```

Exit 0 = geen FAIL. **Draai na elke wijziging aan scripts/templates** en voor
elke release. Nieuwe cases ontstaan uit echte misses: voeg de kleinste case
toe die de miss de volgende keer had gevangen. Zie evals/cases.mjs.
