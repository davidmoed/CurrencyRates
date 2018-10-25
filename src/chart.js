import React, { Component } from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

//set global variables for the API calls
let totalAPICalls = 0;
let allJsonData = [];
let allJsonDates = [];

//Set your API key here
const API_KEY = "114c133129102e25d2871f2f792e813e";


//pass the date wanted, and the scope from within componentDidMount to make multiple api
//calls and update the state each time to reflect the total number of calls and the data
function getAPIData (date, scope) {

   //get the dates to use in the final data (triple to allow for 3 currencies per call)
   allJsonDates.push(date, date, date);

   //call the API and get the result as json
   fetch("http://data.fixer.io/api/" + date + "?access_key=" + API_KEY + "&symbols=USD,MXN,ILS").then(result => {
     return result.json();
  }).then(jsonResult => {

     //save the rates from each currency compared to USD and
     //increment the total number of calls and save the data in the outer state.
     allJsonData[totalAPICalls] = jsonResult.rates;
     totalAPICalls++;

     //console.log("inside API call " + totalAPICalls);
     scope.setState({
        numAPICalls: totalAPICalls,
        currencyData: allJsonData
     });
  });
}


class AChart extends Component {

   constructor(props) {
      super(props);
      this.state = {
         currencyData: [],
         numAPICalls: 0
      }
   }

   //do the API calls as soon as the component mounts
   componentDidMount() {

      const currentScope = this;
      //fetch the currencies as they compare to EUR for 7 dates
      getAPIData('2018-10-17', currentScope);
      getAPIData('2018-10-18', currentScope);
      getAPIData('2018-10-19', currentScope);
      getAPIData('2018-10-20', currentScope);
      getAPIData('2018-10-21', currentScope);
      getAPIData('2018-10-22', currentScope);
      getAPIData('2018-10-23', currentScope);

   }

   render() {

      //get the number of calls to ensure the data is only parsed
      //after all the API calls are finished
      let numAPICalls = this.state.numAPICalls;
      let currency = [];

      if (numAPICalls < 7) {
         return <div><h4>Loading...</h4></div>
      } else {
         //get the full API data after the API calls complete
         currency = this.state.currencyData;
         // console.log(currency);

         //condense the data from an array of objects into an array of single values
         let allDataPoints = [];
         currency.forEach(function(oneDay) {
            Object.keys(oneDay).map( function(rate) {
               allDataPoints.push(oneDay[rate]);
            })
         });

         //console.log(allDataPoints);

         //split up the data points into their respective currency - date pairs
         let usdRates = {};
         let mxnRates = {};
         let ilsRates = {};

         //combine the rates into data that can be used in the Chart
         //usd objects [{date: rate}]
         for (let i = 0; i < allDataPoints.length; i += 3) {
            let aDate = allJsonDates[i];
            let rate = allDataPoints[i];
            usdRates[aDate] = rate;
         }
         //mxn objects [{date: rate}]
         for (let i = 1; i < allDataPoints.length; i += 3) {
            let aDate = allJsonDates[i];
            let rate = allDataPoints[i];
            mxnRates[aDate] = rate;
         }
         //ils objects [{date: rate}]
         for (let i = 2; i < allDataPoints.length; i += 3) {
            let aDate = allJsonDates[i];
            let rate = allDataPoints[i];
            ilsRates[aDate] = rate;
         }

         //chart data
         const data = [
            {
               name: 'USD',
               data: usdRates
            },
            {
               name: 'MXN',
               data: mxnRates
            },
            {
               name: 'ILS',
               data: ilsRates
            }
         ];



         return(
            <div className="chart-section">
               <LineChart data={data} min="0" max="30" width="100%" height="100%" colors={["#3aafb9", "#e9ff70", "#e23d40"]}/>
            </div>
         );
      }

   };
}

export default AChart;
