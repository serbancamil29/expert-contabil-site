# Expert Contabil Neculai Liviu - Site v2

Site static Vite pentru prezentarea serviciilor contabile.

## Ce conține v2

- Date firmă integrate:
  - Expert Contabil Neculai Liviu
  - Cod fiscal: 25368513
  - Adresă: Iași, Aleea Basota nr. 6
- Secțiuni: Despre, Servicii, Abonamente, Informări, Documente utile, Legislație, Cariere, FAQ, Contact.
- Editor demo pentru informări și ofertă de angajare.

## Important despre editor

Editorul inclus este doar pentru test pe site static. El salvează datele în `localStorage`, adică în browserul persoanei care editează. Pentru ca informările să fie vizibile tuturor vizitatorilor, trebuie adăugat backend cu autentificare și bază de date.

Variante reale pentru v3:

1. Render Web Service + PostgreSQL + admin login.
2. Supabase/Firebase pentru conținut editabil.
3. Headless CMS, de exemplu Sanity/Strapi/Directus.

## Deploy pe Render

Build Command:

```bash
npm install && npm run build
```

Publish Directory:

```bash
dist
```

Nu sunt necesare variabile de mediu pentru această versiune.
