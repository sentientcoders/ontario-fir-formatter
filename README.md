# ontario-fir-formatter

A zero-dependency TypeScript utility for parsing and decoding Ontario Financial Information Return (FIR) Schedule, Line, and Column (SLC) codes.

## Overview
This open-source micro-utility was extracted from the data engineering pipeline powering [TaxWatchdog.ca](https://taxwatchdog.ca). It provides safe string parsing, validation, and category decoding for municipal financial datasets.

## Why no NPM package?
Because this utility is frequently used in heavily restricted or serverless ETL environments (such as Cloudflare Workers and D1), it is designed as a single-file, zero-dependency drop-in rather than a published NPM package. 

## Installation
Simply download `ontario-fir-formatter.ts` and drop it directly into your project's utility folder.

## License
MIT License. Maintained by [Sentient Coders](https://sentientcoders.com).
