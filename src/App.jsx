import { useState } from 'react'
import Search from './components/search';
import BookHolder from './components/bookHolder';

function App() {
  const [books,setBooks]=useState([]);

  return (
    <div  className='max-w-[1000px] mx-auto my-0 px-[5rem]'>
      <Search />
      <BookHolder />
    </div>
  )
}

export default App
