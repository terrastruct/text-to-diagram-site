.POSIX:

.PHONY: all
all: fmt build
ifndef CI
all: gen
endif

.PHONY: fmt
fmt: node_modules
	prefix "$@" ./ci/sub/bin/fmt.sh
.PHONY: gen
gen:
	prefix "$@" ./ci/render.sh
.PHONY: build
build: node_modules
	prefix "$@" yarn build
ifndef CI
build: gen
endif
.PHONY: node_modules
node_modules:
	prefix "$@" yarn $${CI:+--immutable} $${CI:+--immutable-cache}
