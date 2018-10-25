# CurrencyRates
A simple Reactjs app that tracks the rates of USD, MXN, and ILS over the week of October 17-23. The Chart can be dragged around the screen, and resized.

## Usage:

Download the repository, and install Node and NPM on your CLI. First run `npm install` in the local directory.

To use the fixer.io API to get the exchange rate data, go to (https://fixer.io/) and get a free API key.
Then change the key on line 13 of chart.js to the proper key. This is normally done through a .env file, but I'm leaving it this way for ease of use.

To run the program, cd into the directory in your CLI and run `npm start`. If your browser doesn't automatically open, open the browser and go to (http://localhost:3000/).


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
