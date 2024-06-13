.DEFAULT_GOAL := build-run

install:
	npm ci

gendiff:
	node/gendiff.js

publish:
	npm publish --dry-run

run:
	node gendiff ./__fixtures__/filepath1.json ./__fixtures__/filepath2.json

test:
	npm test 

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test-coverage: test
	npm run coverage

setup:
	./gradlew wrapper --gradle-version 8.5

clean:
	./gradlew clean

build:
	./gradlew clean build

install:
	./gradlew clean install

run-dist:
	./build/install/java-package/bin/java-package

run:
	./gradlew run

test:
	./gradlew test

report:
	./gradlew jacocoTestReport

lint:
	./gradlew checkstyleMain

check-deps:
	./gradlew dependencyUpdates -Drevision=release


build-run: build run

.PHONY: build