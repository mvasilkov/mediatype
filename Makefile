jshint = node_modules/.bin/jshint
mocha = node_modules/.bin/mocha
node = node
npm = npm

all: jshint mocha

node_modules: package.json
	@ $(npm) install

jshint: node_modules
	@ $(jshint) build.js

mocha: node_modules
	@ $(mocha) -R spec

build:
	@ $(node) build.js reg_files/*.types > reg.json
