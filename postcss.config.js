module.exports = {
  plugins: {
    // Order of import is very important here.
    'postcss-import': {},
    'postcss-simple-vars': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
