import Header from './components/Header'
import AddTodo from './components/AddTodo'
import ViewTodo from './components/ViewTodo'
import Footer from './components/Footer'

import { useState,useEffect } from 'react'

function App() {
  
  var [todo,setTodo] = useState([{}])
  console.log(todo);
  useEffect(() => {
    // Update the document title using the browser API
    fetch('http://127.0.0.1:8000/todos/')
    .then((response) => response.json())
    .then((todos) => {
      setTodo(todos)
    });
  },[]);
  
  function addTodo(title,desc){
    const id = Math.max(...todo.map(item => item.id)) + 1;
    const newTodo ={
      id:id,
      title:title,
      description:desc,
      completed:false,
      is_active:true,
    }
    setTodo([newTodo,...todo])

    const url = 'http://localhost:8000/todos/';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));

  }
  return ( 
    <div className='container'>
      <Header/>
      <AddTodo addTodo={addTodo} setTodo={setTodo}/>
      <ViewTodo todos={todo} setTodo={setTodo}/>
      <Footer/>
    </div>
   );
}

export default App;