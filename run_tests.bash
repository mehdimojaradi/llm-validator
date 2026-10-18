#!/bin/bash
# run_tests.sh

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
npx promptfoo eval --output "evals/report_$TIMESTAMP.html"