import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  roots: [
    '<rootDir>/src'
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^react$': 'preact/compat',
    '^react-dom/test-utils$': 'preact/test-utils',
    '^react-dom$': 'preact/compat',
    '^react/jsx-runtime$': 'preact/jsx-runtime',
    '^/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1'
  },
  setupFiles: [
    './jest.setup.ts'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '^.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!('
    + 'react-markdown'
    + '|vfile(-.*)*'
    + '|unist(-.*)*'
    + '|unified'
    + '|bail'
    + '|trough'
    + '|remark(-.*)*'
    + '|mdast(-.*)*'
    + '|micromark(-.*)*'
    + '|parse-entities'
    + '|character-entities'
    + '|property-information'
    + '|space-separated-tokens'
    + '|comma-separated-tokens'
    + '|babylonjs-hook'
    + '|decode-named-character-reference'
    + '|hast-util-whitespace'
    + '|react-syntax-highlighter'
    + '|is-plain-obj'
    + ')/)'
  ]
};

export default config;
