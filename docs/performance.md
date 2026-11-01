# Practical 8 — lazy loading metrics

Captured from `npm run build` in `Student_Management_system`.

## After route-based code splitting

Vite produced a small main bundle plus lazy chunks:

- `index-Ddl5S-wz.js` 261.89 kB (main)
- `Students-CJu2uIOr.js` 4.04 kB (loaded on `/students`)
- `Contact-CjIfueuU.js` 0.91 kB (loaded on `/contact`)
- `Resources-CBveVOk5.js` 1.50 kB (loaded on `/resources`)
- `Login-BWzJXl_2.js` 1.23 kB
- `Home-Dmf4PiY_.js` 1.59 kB
- `NotFound-Bkzu_yhX.js` 0.32 kB

Students, Contact, and Resources are not downloaded until those routes are visited. Wrap `Routes` in `Suspense` (`App.jsx`) and throttle Network to Slow 3G to see `Loading page...`.
