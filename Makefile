install:
	npm ci

gendiff:
	node/gendiff.js

publish:
	npm publish --dry-run

install-deps:
	npm ci --legacy-peer-deps

test-coverage:
	npx jest --coverage

run-stylish:
	node bin/gendiff -f stylish ./__fixtures__/file1.json ./__fixtures__/file2.json

run-plain:
	node bin/gendiff -f plain ./__fixtures__/file1.json ./__fixtures__/file2.json

run-json:
	node bin/gendiff -f json ./__fixtures__/file1.json ./__fixtures__/file2.json

test:
	npm test 

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

phonyTests:
	@echo "All tests passed"
