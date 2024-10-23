import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import loading from './assets/loading.gif'

const TOTAL_PLANTS = 10;
const TOKEN = import.meta.env.VITE_TOKEN;

let plantCardsAll = [];
let plantCardsSearch = [];
let randIds = [];
let plantCardsRand = [];
let pageAll = 0;
let pageSearch = 0;
let currentSearch = "";
let currentState = 0;
let deleteFlag = true;
let favorites = [];

function App() {
  const [data, setData] = useState(
    <div className="box">
      <p className="begin">Click a button or search for a plant!</p>
    </div>);
  const [info, setInfo] = useState(<></>);

  const handleChange = (state) => {
    console.log(`state: ${state}`);
    currentState = state;
    //console.log(allPlants());
    if (state == 0) { // all plants
      allPlants().then(() => {
        if (currentState == -1) handleChange(currentState);
        else setData(
        <div className="plants">
          {plantCardsAll}
        </div>);
      }); 
    } else if (state == 1) { // plants by region
      if (currentState == -1) handleChange(currentState);
      else setData(
        <div className='box'>
          <img className="map" src="https://www.pixelstalk.net/wp-content/uploads/2016/06/HD-Wallpapers-World-Map-Images-Download.jpg"></img>
        </div>);
    } else if (state == 2) { // favorites
      if (currentState == -1) handleChange(currentState);
      else {
        if (favorites.length == 0)
          setData(
            <div className="box">
              <p className="begin">Try right clicking a plant card to favorite it!</p>
            </div>);
        else 
          setData(
            <div className="plants">
              {favorites}
            </div>);
      }
    } else if (state == 3) { // random
      randPlant()
        .then(() => {
          if (currentState == -1) handleChange(currentState);
          else setData(
          <div className="plants">
            {plantCardsRand}
          </div>)
        })
    } else if (state == 4) { // search
      searchPlant()
        .then(() => {
          if (currentState == -1) handleChange(currentState);
          else setData(
            <div className="plants">
              {plantCardsSearch}
            </div>)
        })
    } else if (state == -1) {
      setData(
        <div className="box">
          <p className="error">Oops! API thing is probably out of usages. Rip.</p>
        </div>);
    } else if (state == -2) { // blank
      setData(<></>);
    }
  }

  function displayInfoCard(id, class_name) {
    const class_name_background = "info_card " + class_name.replace("plant ", "");
    setCardLoading();
    axios.get(`https://perenual.com/api/species/details/${id}?key=${TOKEN}`)
      .then ((response) => {
        const data = response.data;
        console.log(data);
        setInfo(
          <button className="main_info" onClick={() => resetInfo()}>
            <div className={class_name_background}>
              <h1 className="name">{data.common_name} -- {data.type}</h1>
              <h2 className="scientific_name"> {data.scientific_name[0]}</h2> 
              <div className="details">
                <img src={data.default_image.original_url}></img>
                <p>{data.description}</p>
              </div>
              <p className="care_level" >Care Level: <strong>{data.care_level}</strong> with a <strong>{data.growth_rate}</strong> growth rate</p>
              <p className="watering" >Cycle: <strong>{data.cycle}</strong> with a <strong>{data.watering}</strong> watering cycle .</p>
              <p className="dimensions" ><strong>{data.dimension}</strong></p>
              <p><strong>Poisonous to humans:</strong> {(data.poisonous_to_humans) ? ("✅") : ("❌")}</p>
              <p><strong>Medicinal:</strong> {(data.medicinal) ? ("✅") : ("❌")}</p>
              <p><strong>Poisonous to pets:</strong> {(data.poisonous_to_pets) ? ("✅") : ("❌")}</p>
              <p><strong>Cones?</strong> {(data.cones) ? ("✅") : ("❌")}</p>
              <p><strong>Fruits?</strong> {(data.fruits) ? ("✅") : ("❌")}</p>
              <p><strong>Flowers?</strong> {(data.flowers) ? ("✅") : ("❌")}</p>
              <p><strong>Leafs?</strong> {(data.leaf) ? ("✅") : ("❌")}</p>
              <p><strong>Indoor?</strong> {(data.indoor) ? ("✅") : ("❌")}</p>
              <p><strong>Tropical?</strong> {(data.tropical) ? ("✅") : ("❌")}</p>
            </div>
          </button>
        );    
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        handleChange(-1);
        //plantCards;
      });
    console.log();
  }

  function setLoading() { setData(<div className="box">
    <img src={loading} width="200px" height="200px"></img>
  </div>)}
  
  function setCardLoading() {
    setInfo(
    <div className="main_info">
      <img src={loading} width="200px" height="200px"></img>
    </div>)
  }

  function resetInfo() {
    setInfo(<></>);
  }

  function generatePlantCard(id, name, img, species, cycle, watering) {
    const class_name = `plant plant${Math.floor(Math.random()*5 + 1)}`;
    return (   
      <button className={class_name} id={id} onAuxClick={(event) => findFavorite(event.currentTarget.id)} onClick={(event) => displayInfoCard(event.currentTarget.id, event.currentTarget.className)}>
        <h1>{name}</h1>
        <img src={img}></img>
        <h3>{species}</h3>
        <hr/>
        <ul>
          <li>♻️: {cycle}</li>
          <li>🌊: {watering}</li>
        </ul>
      </button>
    );
  }

  function generatePlantsFromSearch(json) {
    let cards = [];
    for (const ob of json) {
      cards.push(generatePlantCard(
        ob.id,
        ob.common_name, 
        (ob.default_image == null) ? ("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F005%2F337%2F799%2Foriginal%2Ficon-image-not-found-free-vector.jpg&f=1&nofb=1&ipt=36eaad571bfa0acf07e3a3af59d449f7b9ab1cdd9cec517a9f2611bc570d3ffc&ipo=images") : (ob.default_image.original_url), 
        ob.scientific_name[0], 
        ob.cycle,
        ob.watering));
    }
    return cards;
  }

  function allPlants() {
    if (plantCardsAll.length == 0) setLoading();
    pageAll += 1;
    console.log(pageAll);
    return axios.get(`https://perenual.com/api/species-list?key=${TOKEN}&page=${pageAll}`)
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
        handleChange(-1);
        //plantCards;
      });
  }

  function randPlant() {
    if (plantCardsRand.length == 0) setLoading();
    let rand_id;
    while (randIds.includes((rand_id = Math.floor(Math.random() * TOTAL_PLANTS)+1)));
    randIds.push(rand_id);
    return axios.get(`https://perenual.com/api/species/details/${rand_id}?key=${TOKEN}`)
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
        handleChange(-1);
        //return [];
      });
  }

  function searchPlant() {
    pageSearch += 1;
    return axios.get(`https://perenual.com/api/species-list?key=${TOKEN}&q=${currentSearch}&page=${pageSearch}`)
      .then ((response) => {
        let plantData = [];
        for (const temp_response of response.data.data)
          plantData.push(temp_response);
        const temp_plant_cards = generatePlantsFromSearch(plantData);
        for (const temp_plant_card of temp_plant_cards)
          plantCardsSearch.push(temp_plant_card);
        console.log(plantCardsSearch);
        //return plantCards;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        handleChange(-1);
        //plantCards;
      });
  }
  
  async function findFavorite(id) {
    await axios.get(`https://perenual.com/api/species/details/${id}?key=${TOKEN}`)
      .then ((response) => {
        let plantData = [];
        for (const temp_response of response.data)
          plantData.push(temp_response);
        const temp_plant_cards = generatePlantsFromSearch(plantData);
        for (const temp_plant_card of temp_plant_cards) {
          if (!favorites.includes(temp_plant_card)) favorites.push(temp_plant_card);
        }
        //return plantCards;
      })
      .catch((error) => {
        console.error("could not find favorite of id: ", id, error);
        //handleChange(-1);
        //plantCards;
      });
  }

  function setSearch(search) {
    if (currentSearch != search) {
      plantCardsSearch = [];
      pageSearch = 0;
      currentSearch = search;
    } 
    console.log(currentSearch, pageSearch);
    handleChange(4);
  }
  document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
  const setFavorites = (id) => {
    if (favorites.includes(id)) favorites.splice(favorites.find(id), 1);
    else ;
    /*const status = favorites.includes(event.currentTarget.id);
    const style = `display: visible; left: ${event.clientX}; right: ${event.clientY};`
    return (
      <button className='favorite_box' style={style}>
        {(status) ? ("Favorite") : ("Unfavorite")}
      </button>
    )*/
  }

  document.addEventListener("keydown", (e) => {
    if (e.key == "Delete" && deleteFlag) {
      deleteFlag = false;
      if (currentState == 0) {
        plantCardsAll = [];
        pageAll = 0;
      } else if (currentState == 3) {
        plantCardsRand = [];
      } else if (currentState == 4) {
        plantCardsSearch = [];
        pageSearch = 0;
      }
      handleChange(-2);
    }
  });

  document.addEventListener("keyup", (e) => {
    if (e.key == "Delete") {
      if (!currentSearch) currentSearch = !currentSearch;
    }
  })
  
/* <pre>{JSON.stringify(plantData, null, 2)}</pre> */
  return (
  <>
    {info}
    <div className="main">
        <div className="menubar">
          <div className="opt all_plants" onClick={() => handleChange(0)}>All Plants</div>
          <input className="search" type="text" placeholder='Search...' onKeyDown={(event) => {(event.key == "Enter") ? (setSearch(event.currentTarget.value)) : ({})}}/>
          <div className="opt favorites" onClick={() =>handleChange(2)}>Favorites </div>
          <div className="opt random" onClick={() => handleChange(3)}>Random</div>
        </div>
        {data}
    </div>
  </>
  )
}

export default App
