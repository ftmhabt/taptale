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
    isSelected?<div style={{ height: '100vh' }}><ReactReader 
    url="src\assets\Mieko Kawakami_ Sam Bett and David Boyd - Breasts and Eggs (2020, Europa Editions) - libgen.li.epub"
  /></div>:
    <div  className='max-w-[1000px] mx-auto my-0 px-[5rem]'>
      <Search setBooks={setBooks} />
      <BookHolder books={books} setIsSelected={setIsSelected}/>
    </div>
  )
}

export default App
