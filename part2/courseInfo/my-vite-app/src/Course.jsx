const Header = (props) => {
    return (
        <>
        <h1>
      <p>
        {props.course}
      </p>
      </h1>
      </>
    )
    }
    
    const Content = (props) => {
      
        return (
            <>
          <p> 
          <i>{props.part} {props.exercise} </i>
          </p>   
          </>
        )
    }
    
    
    const Total = (props) => {
    
      const sum = props.exercises.reduce((accum, curr) => accum + curr, 0)
    
      return (
        <>
          <p>
           <b> the total amount of exercises is {sum} </b>
          </p>
        </>
      )
    
    }

    const Course = (prop) => {
        const {name, parts} = prop.course;
        return (  
            <div>
            <Header course = {name} />
          {parts.map((part, index) => (
            <Content key = {index} part={part.name} exercise={part.exercises} />
          ))}
            <Total exercises={parts.map(part => part.exercises)} />
            </div>
          )
    }
    
    
  export default  Course