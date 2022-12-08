.POSIX:

.PHONY: all
all: fmt build

.PHONY: fmt
fmt:
	prefix "$@" ./ci/sub/bin/fmt.sh
.PHONY: build
build:
	prefix "$@" yarn build
.PHONY: node_modules
node_modules:
	prefix "$@" yarn $${CI:+--immutable} $${CI:+--immutable-cache}
