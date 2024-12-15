import { useEffect } from "react";
import { useState } from "react"
import classes from './styles.module.css'
import TodoItem from "./Components/todo-item";
import TodoDetails from "./Components/todo-details";
import { Skeleton } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(false)
  const [todoList, setTodoList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null)
  const [todoDetails, setTodoDEtails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false)
  async function fetchListofTodos() {
    try {
      const apiResponse = await fetch('https://dummyjson.com/todos')
      const result = await apiResponse.json();
      if (result?.todos && result?.todos?.length > 0) {
        setTodoList(result?.todos)
        setLoading(false)
        setErrorMsg('')
        console.log(result)
      } else {
        setTodoList([])
        setLoading(false)
        setErrorMsg('')
      }
    } catch (e) {
      setErrorMsg('some issue')
      console.log(e)
    }
  }

  async function fetchDetailsOfCurrentTodo(getCurrentTodoId) {
    console.log(getCurrentTodoId)
    try {
      const apiResponse = await fetch(`https://dummyjson.com/todos/${getCurrentTodoId}`)
      const details = await apiResponse.json();
      console.log(details)
      if (details) {
        setTodoDEtails(details);
        setOpenDialog(true)
      } else {
        setTodoDEtails(null);
        setOpenDialog(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchListofTodos()
  }, [])
  if (loading) return <Skeleton variant="rectangulat" width={650} height={650} />

  return (
    <div className={classes.mainWraper}>
      <h1 className={classes.headerTitle}>todo app using material UI</h1>
      <div className={classes.todoListWraper}>
        {
          todoList && todoList.length > 0 ?
            todoList.map(todoItem => <TodoItem
              fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo}
              todo={todoItem} />) : null
        }
      </div>
      <TodoDetails
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        todoDetails={todoDetails}
        setTodoDEtails={setTodoDEtails}
      />
    </div>
  )
}

export default App
