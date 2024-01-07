import sys
import json

pkg_json = json.loads(sys.stdin.read())


def select(dict_, keys):
    return {k: dict_[k] for k in keys}


new_pkg_json = {
    "name": "test",
    "version": "0.0.0",
    "main": "index.js",
    "type": "module",
    "scripts": pkg_json["scripts"],
    "keywords": [],
    "author": "Me",
    "license": "ISC",
    "devDependencies": select(pkg_json["devDependencies"], ["mocha"]),
    "description": "Test",
}

print(json.dumps(new_pkg_json))
