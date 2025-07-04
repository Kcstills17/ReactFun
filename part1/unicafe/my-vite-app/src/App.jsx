import { useState } from 'react'



const Average =  ({good, neutral, bad}) => {
  return (
    ((good - bad) / (good + neutral + bad)) >= 0 ? 
      ((good - bad) / (good + neutral + bad)).toFixed(1) : 
      'no feedback yet'
  )
}


const  Positive = ({good, neutral, bad}) => {
  return (
    (good / (good + bad + neutral) * 100) >= 0 ? 
      String((good / (good + bad + neutral) * 100).toFixed(1)) + '%' : 
      'no feedback yet'
  )
}


const TypeRow = ({row, value}) => {
  return (
    <tr>
      <td> {row}</td>
      <td> {value}</td>
    </tr>
  )
}


const Button = (props) => {
  return (
     <button  onClick = {props.onClick}> 
     {props.text}</button> 
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <TypeRow row="good" value={good} />
          <TypeRow row="neutral" value={neutral} />
          <TypeRow row="bad" value={bad} />
          <TypeRow row="average" value={<Average good={good} neutral={neutral} bad={bad} />} />
          <TypeRow row="positive" value={<Positive good={good} neutral={neutral} bad={bad} />} />
        </tbody>
      </table>
    </div>
  );
};

  

  const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
  
    return (
      <div>
        <h1>Give feedback</h1>
        <Button onClick={() => setGood(good + 1)} text="good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" />
        
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    );
  };


export default App
