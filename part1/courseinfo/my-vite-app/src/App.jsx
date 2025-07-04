const Header = (props) => {
return (
  <p>
    {props.course}
  </p>
)
}

const Content = (props) => {
  
    return (
      <p> This is part {props.part}. It contains {props.exercise} exercises</p>   
    )
}


const Total = (props) => {

  const sum = props.exercises.reduce((accum, curr) => accum + curr, 0)

  return (
    <>
      <p>
        the total amount of exercises is {sum}
      </p>
    </>
  )

}





const App = () =>  {
  const course =  {
    name: 'Half Stack application development', 
     parts:  [
      {
        name: 'Fundamentals of React', 
        exercises: 10, 
      }, 
      {
        name: 'Using props to pass data', 
        exercises: 7
      }, 
      {
        name: 'State of a component', 
        exercises: 14
      }
  
    ]  

  }

  
  

  return (  
    <div>
    <Header course = {course.name} />
    <Content part = {course.parts[0].name} exercise = {course.parts[0].exercises}/>
    <Content part =  {course.parts[1].name} exercise = {course.parts[1].exercises}/>
    <Content part =  {course.parts[2].name} exercise = {course.parts[2].exercises}/>
    <Total exercises = {[course.parts[0].exercises, course.parts[1].exercises, course.parts[2].exercises] }/>
    </div>
  )

}

export default App 