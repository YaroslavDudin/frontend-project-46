install:
	npm ci

gendiff:
	node/gendiff.js

publish:
	npm publish --dry-run

install-deps:
	npm ci --legacy-peer-deps

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8


run:
	node gendiff ./__fixtures__/filepath1.json ./__fixtures__/filepath2.json

test:
	npm test 

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix


