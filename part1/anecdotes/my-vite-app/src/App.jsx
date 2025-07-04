//Expand the following application by adding a button that can be clicked to display a random anecdote from the field of software engineering:

import { useState } from 'react'


const RandomAnecdote = ({ anecdote, select, setSelect, selectVote, increment}) => {
  const getRandomIndex = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * anecdote.length);
    } while (randomIndex === select); // Avoid repeating the same anecdote
    return randomIndex;
  };

  return (
    <div>
      <p>{anecdote[select]} {selectVote}</p> 
      <button onClick={increment}>Vote</button>
      <button onClick={() => setSelect(getRandomIndex())}>Next Anecdote</button>
    </div>
  );
};


const SelectedVoteCount = ({voteTally, anecdote,  select}) => {
  const selectedAnecdote = anecdote[select]
  return (
    <div>
      has {voteTally[selectedAnecdote] || 0} votes
    </div>
  )
} 


const HighestVote = ({voteTally}) => {
  const entries = Object.entries(voteTally); 
  if (entries.length === 0) return <p>No votes yet</p>;

const result = entries.reduce(
  (max, curr) => (curr[1] > max[1] ? curr : max),
  entries[0]
);

  return (
    <div>
      <h1> <b>Anecdote with most votes </b> </h1>
      <p>{result[0]} Has {result[1]} votes</p>

  

    </div>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const anecdoteVotes = {}
  anecdotes.forEach((text) => {
  anecdoteVotes[text] = 0
  });
  const [voteTally, setVoteTally] = useState(anecdoteVotes);
   
  const [selected, setSelected] = useState(0)


const handleVote = () => {
  const selectedAnecdote = anecdotes[selected];
  setVoteTally((prev) => ({
    ...prev,
    [selectedAnecdote]: prev[selectedAnecdote] + 1,
  }));
  console.log(`Voted for: ${selectedAnecdote}`);
};

  return (
    <div>
      <h1><b>Anecdote of the day! </b></h1>
      <RandomAnecdote
        anecdote={anecdotes}
        select={selected}
        setSelect={setSelected}
        selectVote={
          <SelectedVoteCount
            voteTally={voteTally}
            anecdote={anecdotes}
            select={selected}
          />
        }
        increment={handleVote}
      />
      <HighestVote voteTally={voteTally} />
    </div>
  );
};

export default App