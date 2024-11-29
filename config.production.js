/*
|-------------------------------------------------------------------------------
| Production config                       https://maizzle.com/docs/environments
|-------------------------------------------------------------------------------
|
| This is the production configuration that Maizzle will use when you run the
| `npm run build` command. These settings will be merged on top of the base
| `config.js`, so you only need to add the options that are changing.
|
*/

/** @type {import('@maizzle/framework').Config} */
export default {
  build: {
    output: {
      // This path can be created with path.join as well.
      // Useful if this is a part of a bigger project and you want the built templates to be a few folders above.
      path: "build_production",
    },
  },
  css: {
    inline: true,
    purge: true,
    shorthand: true,
  },
  minify: true,
  prettify: true,
};
