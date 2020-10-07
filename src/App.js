import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import Goal from "./components/goal";

const base = new Airtable({ apiKey: "keyp68mJYzhOKTPu7"}).base('appysCggvuzHcvmQj');

function App() {

  // keep track of our state, init to blank array
  // Ask calvin about useState
  const [goals, setGoals] = useState([])
  const [updates, setUpdates] = useState([])

  // useEffect is a "hook"
  useEffect(() =>  {
    base("goals")
      .select({ view: "Grid view" })
      // pagination, "arrow function"
      .eachPage((records, fetchNextPage) => {
        setGoals(records)
        fetchNextPage();
      });
    base("updates")
      // default grid view
      .select({ view: "Grid view" })
      // pagination, "arrow function"
      .eachPage((records, fetchNextPage) => {
        setUpdates(records)
        fetchNextPage();
      });  
    
    
  }, [])

  // map through goals, pass to component
  // solved the following error with: 
  // https://stackoverflow.com/questions/53991538/reactjs-typeerror-cannot-read-property-0-of-undefined
  // TypeError: Cannot read property '0' of undefined
  return (
    <>
      
      <h1>My Goals</h1>
      {goals.map(goal => (
        <Goal  
          key={goal.id}
          goal={goal}
          updates={updates.filter(update => update.fields.goalid && update.fields.goalid[0] === goal.id)} 
        />
      ))}
    </>
  )
}

export default App;
