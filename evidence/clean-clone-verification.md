# Clean clone verification

This record verifies that the submitted repository can be cloned into an empty
temporary directory, installed, checked, tested, and built without relying on
files from the local development checkout.

| Field | Result |
| --- | --- |
| Date | September 5, 2026 |
| Repository | `https://github.com/manueldezman/empay-docs` |
| Tested commit | `923c5f6c55e082e5be93eeec35834d1d66791a85` |
| Clone location | Isolated directory under `/tmp` |
| Overall result | Passed |

## Commands and results

| Step | Command | Result |
| --- | --- | --- |
| Clone | `git clone https://github.com/manueldezman/empay-docs.git` | Passed |
| Toolchain install | `npm ci --ignore-scripts --prefix .github/thally-tooling` | Passed; 200 packages installed |
| Root install | `npm ci` | Passed; 1,069 packages installed |
| Documentation check | `.github/thally-tooling/node_modules/.bin/thally check --ci .` | Passed; 0 errors, 4 warnings |
| Tests | `npm test` | Passed; 68 test files and 351 tests |
| Production build | `npm run build` | Passed; 152 pages generated |

## Notes

- The four Thally warnings identify API reference MDX files that are not
  direct navigation entries. The OpenAPI-generated reference remains reachable
  through the API reference experience, and the check exits with zero errors.
- Dependency installation reported one moderate vulnerability and several
  deprecation warnings. They did not prevent installation, checks, tests, or
  the production build.
- Next.js reported its deprecated middleware convention. The production build
  still completed successfully and generated all expected routes.

