install:
		npm ci

run:
		bin/nodejs-package.js 10

install-deps:
		npm ci

test:
		NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
		NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

lint:
		npx eslint .

lint-fix:
		npx eslint . --fix

publish:
		npm publish --dry run

.PHONY: test
