# Chong Han — academic website

This is the editable Jekyll source for the GitHub Pages project site at
https://aurorach814.github.io/chonghan/. It uses the official Bootstrap-based
[al-folio v0.16.3](https://github.com/alshedivat/al-folio/tree/b5ecd1a6bd3f94474a87710c76fd81cf9f0e0fa2)
academic theme. See `THIRD-PARTY.md` for the imported theme components and license.

## Edit

- `_pages/about.md`: biography and profile photograph.
- `_pages/publications.md`: publications page.
- `_bibliography/papers.bib`: publication records shared between both pages.
  Set `selected = {true}` to include a paper on the About page.
  The primary BibTeX `author` field uses normal `and`-separated names in credit
  order; `display_author` optionally gives a shorter author line.
- `abstract` and `summary` are independently collapsible. `html` links to a
  published paper; `overview` (a filename in `assets/pdf/`) links specifically
  to a project overview. `review_status` replaces the venue/year line when
  a manuscript has no published venue.
- Set `venue_label` to the conference or journal name to show at the top of
  the left column. The left column remains aligned and unfilled below the
  label for entries that have no thumbnail.
- Put paper figures in `assets/img/publication_preview/`. Set `preview` to
  the filename, `preview_width` and `preview_height` to the image dimensions,
  `preview_alt` to a description, and `preview_source` to the paper or figure
  URL. For an attached overview PDF, use the existing `overview` field.

The S³ thumbnail is Figure 2 from the [ICML paper](https://proceedings.mlr.press/v306/zhang26el.html).
The pilot-study thumbnail is Figure 1 from the [EMBC paper](https://arxiv.org/abs/2605.03352).
Both thumbnails link to their original figures.
- `assets/css/profile.css`: site-specific refinements on top of al-folio.

## Build and preview

Install Ruby 3.3 and Bundler. From this directory:

```sh
bundle install
bash bin/build
bundle exec jekyll serve
```

Open `http://127.0.0.1:4000/chonghan/`. `_site/` is the generated website.
Changing repositories? Update `url` and `baseurl` in `_config.yml` before building.

## GitHub Pages

To keep branch-based hosting, build from the editable source and place its
generated output at the configured Pages root. You do not need to change
repository settings for this mode.

```sh
bash bin/export-static /absolute/path/to/empty-output
```

The export includes `.nojekyll`, because GitHub Pages should serve the
already-built HTML and not run its restricted Jekyll build a second time.
Commit only the intended static output to the publishing location. In a repo
containing both this source (in `site-src/`) and static pages at the root,
retain the source directory when refreshing the static files.

Alternatively, if the repository owner chooses **Settings → Pages → GitHub
Actions**, install `workflow-examples/pages.yml` at
`.github/workflows/al-folio-pages.yml`. That optional workflow expects the
editable source in `site-src/`; it builds with Bundler, then deploys the
generated artifact. Merely opening or building this source never publishes it.
