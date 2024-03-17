import { useState } from 'react'
import Search from './components/search';
import BookHolder from './components/bookHolder';
import { ReactReader } from 'react-reader'

function App() {
  const [books,setBooks]=useState([
    {id:'1', title:'hello',url:"./assets"}
  ]);
  const [isSelected,setIsSelected]=useState(false);

  return (
    isSelected?<ReactReader setIsSelected={setIsSelected}/>:
    <div  className='max-w-[1000px] mx-auto my-0 px-[5rem]'>
      <Search setBooks={setBooks} />
      <BookHolder books={books}/>
    </div>
  )
}

export default App
