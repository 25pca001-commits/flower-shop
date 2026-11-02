# Marigold Lane: Flower Shop (React + Vite)

A small flower shop app: browse 12 flowers, filter by type, search, add to a basket,
change quantities and place a demo order. The basket is saved in the browser.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

## Checks

```bash
npm run lint
npm test
npm run build
```

## CI

`.github/workflows/ci.yml` runs on every push and pull request to `main`:
install, lint, test, build. It does not deploy anything.
The built `dist` folder is saved as a downloadable artifact on each run.
