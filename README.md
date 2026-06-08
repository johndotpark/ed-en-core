# Factory OS

Production tools for clothing brand owners. Generate manufacturer communication prompts, complete production checklists, and download tech-pack templates.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Local storage (no auth, no database)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/prompt-builder` | Generate manufacturer messages |
| `/templates` | Download tech pack templates |
| `/checklist` | 8-step production checklist |
| `/resources` | Guides and glossary |

## How to Add New Prompts

1. Open `lib/promptTemplates.ts`
2. Locate the `generatePrompt` function — it uses a `switch` on `productionStage`
3. Add a new `case` for your stage and return a template string using the form data fields
4. Add the new stage value to the `ProductionStage` type in `types/index.ts`
5. Add it to the `PRODUCTION_STAGES` array in `app/prompt-builder/page.tsx`

## How to Add New Templates

1. Add the template card data to `lib/templateData.ts` following the `TemplateCard` interface
2. Place your actual files in the corresponding `/public/templates/` subdirectory:
   - PDFs → `/public/templates/pdf/`
   - Illustrator files → `/public/templates/illustrator/`
   - Spreadsheets → `/public/templates/spreadsheets/`
3. Update the `pdfFile`, `illustratorFile`, and `spreadsheetFile` paths in `templateData.ts` to match your filenames
4. If adding a new product category, update the `ProductCategory` type in `types/index.ts`

## How to Replace Placeholder Template Files

The template download buttons currently point to placeholder paths. To replace them:

1. Drop your real files into the public template directories:
   ```
   /public/templates/pdf/tshirt-tech-pack.pdf
   /public/templates/illustrator/tshirt-tech-pack.ai
   /public/templates/spreadsheets/tshirt-spec-sheet.xlsx
   ```
2. File paths in `lib/templateData.ts` match the filenames — update if yours differ

## Local Storage Keys

| Key | Page | Contents |
|-----|------|----------|
| `factory-os-prompt-builder` | Prompt Builder | Form field values |
| `factory-os-checklist` | Production Checklist | Checkbox states (item ID to boolean) |

To clear saved state: open browser DevTools > Application > Local Storage > delete the keys.

## Deploy on Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Next.js — no build configuration needed
4. Click Deploy

No environment variables are required. The app runs entirely client-side with local storage.

## File Structure

```
app/
  layout.tsx          # Root layout with nav
  page.tsx            # Home page
  prompt-builder/
    page.tsx          # Prompt builder form
  templates/
    page.tsx          # Tech pack download cards
  checklist/
    page.tsx          # Production checklist
  resources/
    page.tsx          # Guides and glossary

components/
  ui/
    Nav.tsx                    # Site navigation
    FormSection.tsx            # Form section wrapper
    CheckboxGroup.tsx          # Multi-select checkbox grid
    GeneratedPromptPreview.tsx # Editable prompt output
    DownloadCard.tsx           # Template download card
    WorkflowStep.tsx           # Collapsible checklist step
    ProgressBar.tsx            # Progress indicator
    EmptyState.tsx             # Empty state placeholder
    ErrorMessage.tsx           # Form error display

lib/
  promptTemplates.ts  # Prompt generation logic
  checklistData.ts    # Checklist step and item data
  templateData.ts     # Template card data

types/
  index.ts            # Shared TypeScript types

public/
  templates/
    pdf/              # Tech pack PDFs
    illustrator/      # Illustrator source files
    spreadsheets/     # Spec sheet spreadsheets
```
