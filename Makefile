install: install-deps
		npx simple-git-hooks

run:
		bin/nodejs-package.js 10

install-deps:
		npm ci

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watchAll

test-coverage:
		npm test -- --coverage --coverageProvider=v8

lint:
		npx eslint .

lint-fix:
		npx eslint . --fix

publish:
		npm publish

.PHONY: test
