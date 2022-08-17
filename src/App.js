import "./App.css";
import React, { useState } from "react";

function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [lista, setLista] = useState([]);
  const [id, setId] = useState(null);

  function handleChange(e) {
    setInput1(e.currentTarget.value);
  }
  function handleChange2(e) {
    setInput2(e.currentTarget.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const todo = {
      id: new Date().getTime(),
      zadatak: input1,
      zavrsen: false,
    };
    setInput1("");
    setLista([todo, ...lista]);
  }

  function Izbrisi(id1) {
    const novaLista = lista.filter((todo) => todo.id !== id1);
    setLista(novaLista);
  }
  function Promijeni(id1) {
    const novaLista = [...lista].map((todo) => {
      if (todo.id === id1) {
        todo.zavrsen = !todo.zavrsen;
      }
      return todo;
    });
    setLista(novaLista);
  }

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => handleChange(e)}
          value={input1}
        ></input>
        <button type="submit" className="sumbmit">Submit</button>
      </form>

      {lista.map((todo) => (
        <div className="zadatak">
          <input className="custom-checkbox" type="checkbox" onChange={() => Promijeni(todo.id)}></input>
          {id === todo.id ? (
            <input
              type="text"
              onChange={(e) => handleChange2(e)}
              value={input2}
              className="zadatakTextI"
            ></input>
          ) : (
            <div key={todo.id} className="zadatakTextP">{todo.zadatak}</div>
          )}
          <button onClick={() => Izbrisi(todo.id)}>Izbrisi</button>

          {id === todo.id ? (
            <button
              onClick={() => {
                todo.zadatak = input2;
                setId(null);
              }}
            >
              Potvrdi
            </button>
          ) : (
            <button
              onClick={() => {
                setId(todo.id);
                setInput2(todo.zadatak);
              }}
            >
              Edit
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
