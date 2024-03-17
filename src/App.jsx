import { useState } from 'react'
import Search from './components/search';
import BookHolder from './components/bookHolder';

function App() {
  const [books,setBooks]=useState([]);

  return (
    <>
      <Search />
      <BookHolder />
    </>
  )
}

export default App
