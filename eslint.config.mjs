import react from '@moneko/eslint/react';

export default [
  ...react,
  {
    rules: {
      'react/react-in-jsx-scope': 0,
    },
  },
];
