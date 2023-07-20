import { useEffect, useState } from "react";
import "./App.css";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [
  { id: 1, text: "Learn React", completed: true },
  { id: 2, text: "Learn JavaScript", completed: true },
  { id: 3, text: "Learn Vue", completed: false },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(initialTodos));
  }, [todos]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    //Se realiza una copia de los Todos, por que el metodo splice muta los todos, lo cambia.
    const copyArray = [...todos];

    // con splice estamos eliminando un elemento del array y devolviendo ese elemento
    const [reorderedItem] = copyArray.splice(startIndex, 1);

    // con splice estamos insertando un elemento en el array
    copyArray.splice(endIndex, 0, reorderedItem);
    console.log(copyArray);

    setTodos(copyArray);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h1>Todo App</h1>
      <Droppable droppableId="todos">
        {(droppableProvider) => (
          <ul
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
          >
            {todos.map((todo, index) => (
              <Draggable key={todo.id} index={index} draggableId={`${todo.id}`}>
                {(draggableProvider) => (
                  <li
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.draggableProps}
                    {...draggableProvider.dragHandleProps}
                  >
                    {todo.text}
                  </li>
                )}
              </Draggable>
            ))}
            {droppableProvider.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
