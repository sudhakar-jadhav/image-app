import React, {useState , useEffect} from 'react'
import './App.css';
import Hero from './components/Hero'

const App = () => {
  const API_KEY = '23594923-23c355c02b301645d3f8ba416';

  const [images,setImages] =  useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [inputVal, setInputVal] = useState('')

  const handleSearch = e => {
    e.preventDefault();
    setSearch(inputVal);
    setInputVal('');
  }

  const newImages = (direction) => {
    if(direction === 'next'){
      setCurrentPage(prevCurrent => prevCurrent + 1)
    } else if(direction === 'previous' && currentPage!== 1) {
      setCurrentPage(prevCurrent => prevCurrent - 1)
    }
  }

  useEffect(() => {
  window.scroll(0,0)

    fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${search}&image_type=photo&per_page=9&page=${currentPage}&pretty=true`
    )
    .then(res => res.json())
    .then(data => setImages(data.hits))
  }, [search, currentPage])

  return <div className='App'>
    <Hero inputVal={inputVal} setInputVal={setInputVal} images={images} newImages={newImages}
    handleSearch={handleSearch}
    />
  </div>
  
}

export default App;
