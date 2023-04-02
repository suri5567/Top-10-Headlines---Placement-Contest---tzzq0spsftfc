import "./styles.css";
import React, { useState, useEffect } from 'react'

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY="3f557f1cb0d0e94b86428498ddedcb0b";

  const changeFunction=(e)=>
  {
    setCategory(e.target.value);
  }

  useEffect(()=>
  {
    setLoading(true);
    fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${API_KEY}`)
      .then(res=>res.json())
      .then((res)=>{
        setNewsData(res.articles)
        console.log(res);
      })
      .then(()=>setLoading(false));
  },[category])

  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <select value={category} onChange={changeFunction}>
        <option value="general">General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading && <p className='loader'>Loading...</p>}
      {!loading && newsData && newsData.length > 0 && (
        <ol>
          {newsData.map((news, index) => (
            <li key={index}>
              <img className='news-img' src={news.image} alt=""/>
              <section className='new-title-content-author'>
                <h3 className='news-title'>{news.title}</h3>
                <section className='new-content-author'>
                  <p className='news-description'>{news.description}</p>
                  <p className='news-source'><strong>Source:</strong>{news.source.name}</p>
                </section>
              </section>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default App;
