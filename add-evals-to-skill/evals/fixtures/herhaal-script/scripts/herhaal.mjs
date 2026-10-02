/** herhaal <tekst> [n] — voorbeeldscript van de herhaal-script fixture-skill. */
const tekst = process.argv[2];
const n = Number(process.argv[3] ?? 2);
if (!tekst) {
	console.error('Fout: tekst ontbreekt — gebruik: herhaal.mjs <tekst> [n]');
	process.exit(1);
}
if (!Number.isInteger(n) || n < 1 || n > 100) {
	console.error('Fout: n moet een geheel getal tussen 1 en 100 zijn');
	process.exit(1);
}
for (let i = 0; i < n; i++) console.log(tekst);
