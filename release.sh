#!/bin/bash
rm -rf build
yarn build
yarn firebase deploy