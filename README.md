# Website firmă contabilitate

Template static pentru o companie de contabilitate. Include secțiuni pentru:

- Despre companie
- Servicii
- Abonamente
- Proces de lucru
- Întrebări frecvente
- Contact

## Rulare locală

```bash
npm install
npm run dev
```

Deschide URL-ul afișat în terminal, de obicei `http://localhost:5173`.

## Build pentru producție

```bash
npm run build
```

Fișierele finale vor fi generate în folderul `dist`.

## Deploy pe Render

1. Pune proiectul într-un repository GitHub/GitLab/Bitbucket.
2. În Render: New > Static Site.
3. Conectează repository-ul.
4. Setări recomandate:
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
5. După deploy, Render va genera un URL de test de forma `nume-site.onrender.com`.

## Ce trebuie modificat

În `index.html`:

- Numele companiei: `ContaPlus Expert`
- Telefon: `+40 700 111 222`
- Email: `office@contaplus.ro`
- Oraș / adresă
- Texte despre companie
- Prețuri abonamente

În `src/main.js`:

- Schimbă emailul din linkul `mailto:office@contaplus.ro`.

## Observație formular contact

Formularul actual deschide clientul de email al utilizatorului. Pentru trimitere automată fără client de email, trebuie adăugat fie un backend, fie un serviciu extern pentru formulare.
