### Hexlet tests and linter status:
[![Actions Status](https://github.com/KiraBelo/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/KiraBelo/frontend-project-46/actions)
[![Node.js CI](https://github.com/KiraBelo/frontend-project-46/actions/workflows/node.js.yml/badge.svg)](https://github.com/KiraBelo/frontend-project-46/actions/workflows/node.js.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/7c2c2b81fb70bf614391/maintainability)](https://codeclimate.com/github/KiraBelo/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7c2c2b81fb70bf614391/test_coverage)](https://codeclimate.com/github/KiraBelo/frontend-project-46/test_coverage)

 # Difference calculator
 
 Difference calculator is a program that perceives the difference between two data structures.

## Instructions for starting the program

1. Clone this project repository.
2. Run the "make install" command.
3. Use the command below to compare data.

## Requirements

- The Node.js version was used in this project '18.6.0'
- npm version '9.2.0'

## JSON
`gendiff __fixtures__/file1.json __fixtures__/file2.json`

[![asciicast](https://asciinema.org/a/qSW8CaUeHN1kN4ZwGhPV6RpJu.svg)](https://asciinema.org/a/qSW8CaUeHN1kN4ZwGhPV6RpJu)

## YAML, YML
`gendiff __fixtures__/file1.yml __fixtures__/file2.yml`

[![asciicast](https://asciinema.org/a/tOTgOgEoXZhYCY822almJEPcA.svg)](https://asciinema.org/a/tOTgOgEoXZhYCY822almJEPcA)

## Different output formats:
## plain
`gendiff -f plain __fixtures__/file1.yml __fixtures__/file2.yml`

[![asciicast](https://asciinema.org/a/O9UGB0e51JHO0SFpynSdOf7Ks.svg)](https://asciinema.org/a/O9UGB0e51JHO0SFpynSdOf7Ks)

## JSON

`gendiff -f json __fixtures__/file1.json __fixtures__/file2.yml`

[![asciicast](https://asciinema.org/a/3Yq11UY3MaxTdbCyQPW80GcOt.svg)](https://asciinema.org/a/3Yq11UY3MaxTdbCyQPW80GcOt)

## Stylish

`gendiff -f stylish __fixtures__/file1.json __fixtures__/file2.json`

[![asciicast](https://asciinema.org/a/Gf4Ol43fdSYNhFHGpvC3NJnTZ.svg)](https://asciinema.org/a/Gf4Ol43fdSYNhFHGpvC3NJnTZ)


