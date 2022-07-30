module.exports = {
  'src/**/*.ts': [
    'yarn lint',
    'prettier --write',
    'git add',
  ],
};
