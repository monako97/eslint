import MagicString from 'magic-string';

function esmShim() {
  const ESMShimImports = `
  import cjsUrl from 'node:url';
  import cjsPath from 'node:path';
  import cjsModule from 'node:module';
  `;
  const ESMShimDeclarations = {
    __filename: 'const __filename = cjsUrl.fileURLToPath(import.meta.url);',
    __dirname: 'const __dirname = cjsPath.dirname(__filename);',
    require: 'const require = cjsModule.createRequire(import.meta.url);',
  };

  const ESMShimEnd = '// -- End Shims --\n';
  const CJSyntaxRegex = /__filename|__dirname|require\(|require\.resolve\(/;

  return {
    name: 'esm-shim-custom',
    renderChunk(/** @type {string} */ code, _chunk, opts) {
      if (opts.format === 'es') {
        if (code.includes(ESMShimImports) || !CJSyntaxRegex.test(code)) {
          return null;
        }

        let endIndexOfLastImport = -1;

        // Find the last import statement and its ending index
        for (const match of code.matchAll(/^import\s.*';$/gm)) {
          if (match.length === 0 || typeof match.index !== 'number') {
            continue;
          }

          endIndexOfLastImport = match.index + match[0].length;
        }

        // Check for existing declarations
        const hasFilename = /const\s+__filename\s*=/.test(code);
        const hasDirname = /const\s+__dirname\s*=/.test(code);
        const hasRequire = /const\s+require\s*=/.test(code);

        // Build custom shim based on what's needed
        let customShim = ESMShimImports;

        if (!hasFilename) {
          customShim += `${ESMShimDeclarations.__filename}\n`;
        }

        if (!hasDirname) {
          customShim += `${ESMShimDeclarations.__dirname}\n`;
        }

        if (!hasRequire) {
          customShim += `${ESMShimDeclarations.require}\n`;
        }

        customShim += ESMShimEnd;

        const s = new MagicString(code);

        s.appendRight(endIndexOfLastImport, customShim);

        const sourceMap = s.generateMap({
          includeContent: true,
        });

        /** @type {string[] | undefined} */
        let sourcesContent;

        if (Array.isArray(sourceMap.sourcesContent)) {
          sourcesContent = [];
          for (let i = 0; i < sourceMap.sourcesContent.length; i++) {
            const content = sourceMap.sourcesContent[i];

            if (typeof content === 'string') {
              sourcesContent.push(content);
            }
          }
        }

        return {
          code: s.toString(),
          map: {
            ...sourceMap,
            sourcesContent,
          },
        };
      }
      return null;
    },
  };
}

export default esmShim;
