exports = {
    moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node', 'vue'],
    transform: {
      '^.+\\.js$': 'babel-jest',
      '.*\\.(vue)$': 'vue-jest',
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.tsx?$': 'ts-jest',
    },
    extensionsToTreatAsEsm: ['.js'], 
    transformIgnorePatterns: ['/node_modules/(?!(lodash)/)'], 
  };