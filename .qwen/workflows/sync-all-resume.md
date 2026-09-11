# Sync All Resume Data

Full synchronization of resume.md → React components + PDF generation.

## Steps

1. **Update experience component** — `node scripts/update-experience-component.js`
2. **Update skills data** — `node scripts/update-skills-component.js`
3. **Update hero content** — `node scripts/update-hero-content.js`
4. **Generate PDF** — `npm run resume:build`
5. **Type check** — `npm run type-check`

## Verification

- Check `src/components/about/about-section.tsx` for experience changes
- Check `src/app/page.tsx` for skills changes
- Check `src/components/hero/hero-section.tsx` for hero content
- Check `public/resume.pdf` was generated

## Usage

```
npm run workflow:sync-all
```

Or ask the agent: "Run the full resume sync workflow"
