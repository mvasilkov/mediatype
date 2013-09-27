jshint = node_modules/.bin/jshint
mocha = node_modules/.bin/mocha
node = node
npm = npm

all: jshint mocha

node_modules: package.json
	@ $(npm) install

jshint: node_modules
	@ $(jshint) {build,mediatype}.js {package,reg}.json

mocha: node_modules
	@ $(mocha) -R spec

build:
	@ $(node) build.js reg_files/*.txt > reg.json
