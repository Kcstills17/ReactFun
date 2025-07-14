import { useState, useEffect } from 'react'
import peopleService from './services/people'
import './index.css'

function capitalizeEachWord(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function formatPhoneNumber(phone) {
  const digits = phone.replace(/\D/g, '');
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const DisplayInfo = ({ people, handleDelete }) => {
  return (
    <>
      {people.map((obj, i) =>
        <div className="people" key={i}>
          {capitalizeEachWord(obj.name)}
          <span> {obj.number}</span>
          <button onClick={() => handleDelete(obj.id)}>delete</button>
        </div>
      )}
    </>
  );
};

const NameQuery = ({ people, query, handleDelete }) => {
  let selectedPeople = people.filter((obj) =>
    obj.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <DisplayInfo people={selectedPeople} handleDelete={handleDelete} />
    </div>
  );
};

const Notification = ({ message }) => {
  if (!message?.text) return null;

  return (
    <div className={message.className}>
      {message.text}
    </div>
  );
};

const ErrorNotification = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error">
    {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [personMessage, setPersonMessage] = useState({ text: null, className: '' });

  const [error, setError] = useState(null);

  useEffect(() => {
    peopleService.getAll().then(initialPeople => {
      setPersons(initialPeople);
    });
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleAddPerson = (e) => {
    e.preventDefault();

   


    // if (!phoneFormat(newNumber)) {
    //   alert('Please enter a valid phone number');
    //   return;
    // }

    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Replace the old number with a new one?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: formatPhoneNumber(newNumber) };

        peopleService.updateNumber(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p =>
              p.id !== existingPerson.id ? p : returnedPerson
            ));
            setNewName('');
            setNewNumber('');
            setPersonMessage({
              text: `${capitalizeEachWord(updatedPerson.name)} has successfully been updated in the list!`,
              className: 'updated-person'
            });
            setTimeout(() => setPersonMessage({ text: null, className: '' }), 5000);
          })
          .catch(error => {
            const msg = error.response?.data?.error || `Error updating ${newName}`;
            setError(msg);
            setTimeout(() => setError(null), 5000);
          });
      }
      return;
    }
    

    const newEntry = { name: newName, number: formatPhoneNumber(newNumber) };

    peopleService.create(newEntry)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson]);
        setNewName('');
        setNewNumber('');
        setPersonMessage({
          text: `${returnedPerson.name} has successfully been added to the list!`,
          className: 'added-person'
        });
        setTimeout(() => setPersonMessage({ text: null, className: '' }), 5000);
      })
      .catch(error => {
        console.log('ERROR caught in .catch:');
        console.log('Status:', error.response?.status);
        console.log('Error msg:', error.response?.data?.error);

        const msg =
          error.response?.data?.error ||
          'An unexpected error occurred while adding the person';
        setError(msg);
        setTimeout(() => setError(null), 5000);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Do you wish to delete this for good?')) {
      peopleService
        .deletePerson(id)
        .then(() => {
          setPersons(prev => prev.filter(person => person.id !== id));
  
          setPersonMessage({
            text: 'Person has successfully been removed from the list',
            className: 'remove-person'
          });
  
          setTimeout(() => {
            setPersonMessage({ text: null, className: '' });
          }, 5000);
        })
        .catch((error) => {
          setError(`The id ${id} cannot be located`);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <Notification message={personMessage} />
      <ErrorNotification message={error} />
      
      <h2>Phonebook</h2>

      <div>
        Search Name:
        <input value={searchQuery} onChange={handleSearchChange} />
      </div>

      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {searchQuery
        ? <NameQuery people={persons} query={searchQuery} handleDelete={handleDelete} />
        : <DisplayInfo people={persons} handleDelete={handleDelete} />
      }
    </div>
  );
};

export default App;


/* 


function studyTime(maxPeriods = 3) {
  let studyPeriod = 1;
  let breakPeriod = 1;

  console.log(`📘 Starting study period #${studyPeriod}`);

  const studyTimer = setInterval(() => {
    studyPeriod++;
    if (studyPeriod > maxPeriods) {
      clearInterval(studyTimer);
      console.log("🎉 You have finished your study sessions for the day!");
    } else {
      console.log(`📘 You are on study period #${studyPeriod}`);
    }
  }, 2 * 60 * 60 * 1000); // every 2 hours

  const breakTimer = setInterval(() => {
    breakPeriod++;
    if (breakPeriod > maxPeriods) {
      clearInterval(breakTimer);
    } else {
      console.log(`☕ You are on break period #${breakPeriod}`);
    }
  }, 20 * 60 * 1000); // every 20 minutes
}


*/

