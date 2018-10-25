import React, { Component } from 'react';
import './App.css';
import AChart from './chart';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import Resizable from 're-resizable';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-main">
        <div className="header">
           <p>Currency Tracker</p>
        </div>


        <Draggable
           defaultPosition={{x: 0, y: 0}}
           position={null}
           grid={[25, 25]}
           onStart={this.handleStart}
           onDrag={this.handleDrag}
           onStop={this.handleStop}
        >

           <div className="graph-container">
              <p>Currencies compared to the Euro over the last week</p>

              
              <Resizable
                 defaultSize={{
                   width:600,
                   height:150,
                 }}
                 minWidth={200}
                 lockAspectRatio={true}
               >
                  <AChart />
               </Resizable>

            </div>

         </Draggable>
            <div className="footer">
               <p>You can drag and resize the chart within the white border</p>
            </div>
        </header>
      </div>
    );
  }
}

export default App;
