import { useState, useEffect } from 'react'
import axios from 'axios';
import viteLogo from '/vite.svg'
import './App.css'
import loading from './assets/loading.gif'

const TOTAL_PLANTS = 10;

function App() {
  const [state, setState] = useState(5);
  const [data, setData] = useState(
    <div className="box">
      <p className="begin">Click a button or search for a plant!</p>
    </div>);
  let plantCardsAll = [];
  let randIds = [];
  let plantCardsRand = [];
  let pageAll = 0;

  useEffect(() => {
    console.log(`state: ${state}`);
    //console.log(allPlants());
    if (state == 0) { // all plants
      allPlants().then(() => {
        setData(
        <div className="plants">
          {plantCardsAll}
        </div>);
      }); 
    } else if (state == 1) { // plants by region
      setData(
        <div className='box'>
          <img className="map" src="https://www.pixelstalk.net/wp-content/uploads/2016/06/HD-Wallpapers-World-Map-Images-Download.jpg"></img>
        </div>);
    } else if (state == 2) { // favorites
      setData(<p>This doesn't do anything yet. Not sure if I'll be able to complete it.</p>);
    } else if (state == 3) { // random
      randPlant()
        .then(() => {
          setData(
          <div className="plants">
            {plantCardsRand}
          </div>)
        })
    } else if (state == 4) { // search

    } else if (state == -1) {
      setData(
        <div className="box">
          <p className="error">Oops! API thing is probably out of usages. Rip.</p>
        </div>);
    }
  }, [state]);
  function setLoading() { setData(<div className="box">
    <img src={loading} width="200px" height="200px"></img>
  </div>)}
  function generatePlantCard(name, img, species, cycle, watering) {
    return (          
      <div className="plant">
        <h1>{name}</h1>
        <img src={img}></img>
        <h3>{species}</h3>
        <hr/>
        <ul>
          <li>♻️: {cycle}</li>
          <li>🌊: {watering}</li>
        </ul>
      </div>
    );
  }
  function generatePlantsFromSearch(json) {
    let cards = [];
    for (const ob of json) {
      cards.push(generatePlantCard(
        ob.common_name, 
        (ob.default_image == null) ? ("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F005%2F337%2F799%2Foriginal%2Ficon-image-not-found-free-vector.jpg&f=1&nofb=1&ipt=36eaad571bfa0acf07e3a3af59d449f7b9ab1cdd9cec517a9f2611bc570d3ffc&ipo=images") : (ob.default_image.original_url), 
        ob.scientific_name[0], 
        ob.cycle,
        ob.watering));
    }
    return cards;
  }

  /*function setState(s) { state = s; }*/
  function allPlants() {
    if (plantCardsAll.length == 0) setLoading();
    pageAll += 1;
    return axios.get(`https://perenual.com/api/species-list?key=sk-BlXS6705c00e092f67181&page=${pageAll}`)
      .then ((response) => {
        let plantData = [];
        for (const temp_response of response.data.data)
          plantData.push(temp_response);
        const temp_plant_cards = generatePlantsFromSearch(plantData);
        for (const temp_plant_card of temp_plant_cards)
          plantCardsAll.push(temp_plant_card);
        //return plantCards;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setState(-1);
        //plantCards;
      });
  }

  function randPlant() {
    if (plantCardsAll.length == 0) setLoading();
    let rand_id;
    while (randIds.includes((rand_id = Math.floor(Math.random() * TOTAL_PLANTS)+1)));
    randIds.push(rand_id);
    return axios.get(`https://perenual.com/api/species/details/${rand_id}?key=sk-BlXS6705c00e092f67181`)
      .then ((response) => {
        let plantData = [];
        plantData.push(response.data);
        const temp_plant_cards = generatePlantsFromSearch(plantData);
        for (const temp_plant_card of temp_plant_cards)
          plantCardsRand.push(temp_plant_card);
        //return plantCards;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setState(-1);
        //return [];
      });
  }

  
/* <pre>{JSON.stringify(plantData, null, 2)}</pre> */
  return (
    <>
    <div className="main">
        <div className="menubar">
          <div className="opt all_plants" onClick={() => setState(0)}>All Plants</div>
          <div className="opt plants_by_region" onClick={() => setState(1)}>Plants by Region</div>
          <input className="search" type="text"/>
          <div className="opt favorites" onClick={() => setState(2)}>Favorites </div>
          <div className="opt random" onClick={() => setState(3)}>Random</div>
        </div>
        {data}
    </div>
    </>
  )
}

export default App
