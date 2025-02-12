import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import BookTable from '../../components/BookTable/BookTable';

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      {/* <FoodDisplay category={category}/> */}
      {/* <AppDownload/> */}
      <BookTable />
    </div>
  );
}

export default Home;
