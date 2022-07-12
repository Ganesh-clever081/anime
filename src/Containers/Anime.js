import React, { useEffect, useState } from 'react';
import axiosServer from '../Utils/server-config';
import Navbar from '../Components/Navbar';
import GridStyle from '../Components/GridStyle';
import _ from 'lodash';


export default function Anime() {
  const [animeData, setAnimeData] = useState();

  useEffect(()=>{
    axiosServer.get('anime').then((data)=>{
      setAnimeData(data.data.data);
  });
  },[]);

  const HandleChange = (e) =>{
   const targetVal = e.target.value;
   axiosServer.get('anime').then((data)=>{
        const animeArr = data.data.data;
        const filterAnimeData = animeArr && animeArr.filter(data => ((data.title).toLowerCase().includes(targetVal.toLowerCase())));
        setAnimeData(filterAnimeData);
    });
  }
  const FilterOptions = (e)=>{
  const genres = e.target.innerHTML
  axiosServer.get('anime').then((data)=>{
        const animeArr = data.data.data;
        animeArr && animeArr.map((animeFilter)=>{
          const filterAnimeData = animeFilter.genres && animeFilter.genres.find(data => (data.name) == genres );
          if(!_.isNil(filterAnimeData) || !_.isEmpty(filterAnimeData)){
          const filterAnime = animeArr && animeArr.filter(data => data.mal_id == filterAnimeData.mal_id );
          setAnimeData(filterAnime);
          }
        })
    });
  }
  return (
    <>
    <Navbar HandleChange={HandleChange}/>
    <GridStyle data={(!_.isNil(animeData) ? animeData : '')} FilterOptions={FilterOptions} />
    </>
  )
}
