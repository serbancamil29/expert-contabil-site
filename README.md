# Expert Contabil Site - v3

Site static pentru Expert Contabil Neculai Liviu.

## Date integrate

- Expert Contabil Neculai Liviu
- Cod fiscal: 25368513
- Adresa: Iași, Aleea Basota nr. 6

## Ce conține

- pagină de prezentare
- servicii și abonamente
- secțiune de informări pentru clienți
- editor demo pentru informări și joburi
- cariere / oferte de angajare
- linkuri utile către instituții și legislație
- contact

## Deploy pe Render

Service type: Static Site

Build Command:

```bash
npm run build
```

Publish Directory:

```bash
dist
```

Nu este nevoie de Environment Variables.

## Observație importantă despre editor

Editorul inclus este demo și salvează în localStorage, adică doar în browserul celui care editează.
Pentru ca informările să fie vizibile pentru toți vizitatorii, trebuie adăugat backend sau un CMS, de exemplu Supabase, Firebase, Strapi sau Render Web Service + bază de date.

## Versiune tehnică

- Vite: ^8.1.2
- Node: 22.22.0, setat prin `.node-version`
- Nu conține package-lock generat local, pentru ca Render să instaleze pachetele direct din npm registry public.
