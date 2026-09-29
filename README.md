# Portfolio website

## Tech stack

- Nuxt 4
- Vue 3 Composition API
- Nuxt UI 4
- Tailwind 4 (CSS-first theme in `app/assets/css/main.css`)
- TypeScript
- Prettier (& prettier-plugin-tailwindcss) enforced
- ESLint enforced
- Firebase hosting

## Third party libraries

- emailjs for the contact form
- Google reCAPTCHA
- Nuxt SEO
- Nuxt Security

## Lighthouse report

![Lighthouse report](./docs/lighthouse-report.png)

## Design

### Colors

| Role       | HEX     | Tailwind    |
| ---------- | ------- | ----------- |
| Primary    | #f4c61f | frite-400   |
| Light text | #f5f5f5 | neutral-100 |
| Lines      | #262626 | neutral-800 |
| Surface    | #0d0d0d | surface     |
| Background | #0a0a0a | neutral-950 |

### Content

Page content (projects, experiences, stack, testimonials…) lives in `app/data/`.
The testimonials section stays hidden until `app/data/testimonials.ts` has entries.

## Credits

Here are some pieces of code and websites I used as inspiration

### Flying fries background

I used [this code](https://codepen.io/sarazond/pen/LYGbwj) as inspiration for the animated hero background. I rewrote it in Vue + Tailwind instead of Sass and Compass
