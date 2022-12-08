.POSIX:

.PHONY: all
all: fmt build

.PHONY: fmt
fmt: node_modules
	prefix "$@" ./ci/sub/bin/fmt.sh
.PHONY: build
build: node_modules
	prefix "$@" yarn build
.PHONY: node_modules
node_modules:
	prefix "$@" yarn $${CI:+--immutable} $${CI:+--immutable-cache}
