module.exports = {
  preset: 'react-native',
  clearMocks: true,
  verbose: true,
  testRegex: '(\\.|/)(test|spec)\\.[jt]sx?$',
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/src/$1',
    '^@/(.*)': '<rootDir>/src/assets/icons/$1',
    '^@test-utils': '<rootDir>/tests/utils',
    '^@test-utils/(.*)': '<rootDir>/tests/utils/$1',
    '^@test-mocks/(.*)': '<rootDir>/tests/mocks/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/config/assets.ts',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: [],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/tests/config/index.ts'],
};
