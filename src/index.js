import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

// Lifecycle of App component
// 1) JS file loaded by the browser
// 2) Instance of App comp. is created
// 3) App comp. 'constructor' func. gets called
// 4) State object is created and assigned to the 'this.state' prop.
// 5) We call geolocation service
// 6) React calls the components render method
// 7) App returns JSX, gets rendered to page as HTML

// 8) We get result of geolocation
// 9) We update our state obj. with a call to 'this.setState
// 10) React sees that we updated the state and rerenders component
// 11) Render method returns (updated) JSX
class App extends React.Component {
  // constructor(props) {
  //   super(props);

  //   // THIS IS THE ONLY TIME WE DO DIRECT ASSIGMENT TO this.state
  //   // this.state = { lat: null, errorMessage: '' };
  // }

  state = { lat: null, errorMessage: '' };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      // callback func. does not run when we call constructor func.
      position => {
        // We called setState() to update state object
        this.setState({ lat: position.coords.latitude });
      },
      err => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    } else if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    } else {
      return <Spinner message='Please accept location request' />
    }
  }

  // React says we have to define render method
  // Avoid conditionals in render method
  render() {
    return (
      <div className='border red'>
        {this.renderContent()}
      </div>
    )
  }
}

// class Clock extends React.Component {
//   state = { time: new Date().toLocaleTimeString() };
  
//   componentDidMount() {
//     setInterval(() => {
//       this.setState({ time: new Date().toLocaleTimeString() })
//     }, 1000)
//     console.log(this.state.time)
//   }
  
//   render() {
//     return (
//         <div className="time">
//             The time is: {this.state.time}
//         </div>
//     );
//   };
// }


ReactDOM.render(<App />, document.querySelector('#root'))