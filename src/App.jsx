import { useState } from 'react'
import Search from './components/search';
import BookHolder from './components/bookHolder';
import { ReactReader } from 'react-reader'

function App() {
  const [books,setBooks]=useState([]);
  const [isSelected,setIsSelected]=useState(false);

  return (
    isSelected?<ReactReader/>:
    <div  className='max-w-[1000px] mx-auto my-0 px-[5rem]'>
      <Search />
      <BookHolder />
    </div>
  )
}

export default App
