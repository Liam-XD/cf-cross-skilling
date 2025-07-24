# QE Automation Cross Skilling Project!

> An adventure into showcasing git skills, JS/ TS skills and foundational understanding on automation best practices.

## Table of Contents

- [Motivation](#Motivation)
- [Requirements](#Requirements)
- [Usage](#Usage)
- [Contribution](#Contribution)
- [Future improvements](#Future Improvements)

## Motivation

As part of the Quality Engineering cross-skilling plan, we have been tasked with upskilling into the Automation capability.
To achieve this and to showcase skills, I've chosen the following site that will allow me to write, UI smoke tests, functional tests and API tests.
https://automationintesting.online/

This repo uses Playwright to test this website that contains both working functionality and known bugs. This will allow for the demonstration of my testing strategy, including how failed tests are handled and reported.

## Requirements

This repo is currently known to work with the following minimum requirements
Node v18.20.2
Npm 10.5.0
Playwright@1.53.2

Using the command line interpreter 'Bash' you can check the versions of each as follows:
Node: node -v
Npm: npm -v
Playwright: npm list playwright

### Installation

1. Clone the repository
   git clone https://github.com/Liam-XD/cf-cross-skilling.git
2. Navigate to the project directory:
   cd <your-project-directory>
3. Install the dependencies mentioned above

## Usage

Currently there are tests written for the following areas...
Smoke tests for:

- Hero section
- Check availability section
- Navigation bar functionality

All tests can be run with the following command:
npx playwright test

### Expected failures

Tests which we expect to fail, due to identified broken functionality on the website, have been marked with test.fail()
This will ensure the test is actually failing and therefore return it as 'passed'.
More info: https://playwright.dev/docs/api/class-test#test-fail

### Skipped tests

Tests where the functionality is not yet implemented on the website have been marked with test.skip()
This will ensure Playwright does not run the script and instead returns is as 'skipped' in the reporting.
More info: https://playwright.dev/docs/api/class-test#test-skip

## Contribution

Contributions and feedback are welcome, although I expect this to be a solo project!
As such, I've added branch protection.
Commits must therefore be made on a non-protected branch (basically not on main) and submitted via a pull request.
As code owner I can then review and include in the main branch upon approval.

## Future Improvements

This is only the beginning for the repository.
While some smoke tests have been written, not all areas have been covered.
I would also like to write tests for...

- Room booking
- Admin login
- API calls

_Watch this space!_
