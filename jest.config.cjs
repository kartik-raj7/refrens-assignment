// jest.config.js
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.scss$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
};
