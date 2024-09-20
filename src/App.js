import { useEffect, useState } from 'react';
import './App.css';
import JobPosting from './components/JobPosting';

const API_ENDPOINT = 'https://hacker-news.firebaseio.com/v0';
const ITEMS_PER_PAGE = 6;

const App = () => {
  const [items, setItems] = useState([]);
  const[itemIds, setItemIds] = useState([]);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchItems = async (currPage) => {
   setCurrentPage(currPage);
   setFetchingDetails(true);

   let itemsList = itemIds;
   if(itemsList.length < 1){
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
      itemsList = await response.json();
      setItemIds(itemsList);
      console.log(itemsList);
   };

   const itemIdsForPage = itemsList.slice(currPage * ITEMS_PER_PAGE, (currPage + 1) * ITEMS_PER_PAGE);
   const itemsForPage = await Promise.all(
    itemIdsForPage.map((itemId) =>  {
      return fetch(`${API_ENDPOINT}/item/${itemId}.json`).then((res) =>res.json());
    })
   )
   setItems([...items, ...itemsForPage]);
   setFetchingDetails(false);
  };

  useEffect(() => {
    if(currentPage === 0){
      fetchItems(currentPage);
    } 
  }, []);

  return (
    <div className="app">
      <h1 className='title'>Hacker New Job Board Using React</h1>
      {itemIds === null || items.length < 1 ? 
      (
        <p className='loading'>Loading...</p>
      ) : 
      (
        <div>
          <div className='items' role='list'>
            {items.map((item) => {
              return <JobPosting key={item.id} {...item} />
            })}
            
          </div>
          <button disabled={fetchingDetails} onClick={() => fetchItems(currentPage + 1)} className='load-more '>{fetchingDetails ? '...Loading' : 'Load More Jobs' }</button>
        </div>
      )}
    </div>
  );
}

export default App;
