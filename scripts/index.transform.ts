import { TargetOptions } from '@angular-builders/custom-webpack';
import { minify } from 'html-minifier';

export default (options: TargetOptions, indexHtml: string): string =>
  options.target === 'serve' || options.optimization === false
    ? indexHtml
    : minify(indexHtml, {
        caseSensitive: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        useShortDoctype: true,
      });
