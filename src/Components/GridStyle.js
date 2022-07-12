import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import Button from '@mui/material/Button';
import FilterOption from './FilterOption';
import PictureDaD from './PictureDaD';
import axiosServer from '../Utils/server-config';
import LocalStroageConfig from '../Utils/LocalStroageConfig';
import { useDrop } from "react-dnd";

export default function GridStyle(val) {
  const animeData = val.data;
  const filter = val.FilterOptions;
  const [dragAndDrop, setDragAndDrop] = useState([]);
  const [animeFinalVal, setAnimeFinalVal] = useState([]);
  const [finalResult, setFinalResult] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: item => DragAndDrops(item.id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const DragAndDrops = (id) => {
    axiosServer.get('anime').then(res => {
      const animeValue = res.data.data;
      const pictureList = animeValue && animeValue.filter(data => data.mal_id === id);
      setDragAndDrop(dragAndDrop => [...dragAndDrop, pictureList[0]])
      setFinalResult(pre => [...pre, pictureList[0]])
    })
  }

  useEffect(() => {
    if (finalResult.length >= 1) {
      LocalStroageConfig('animeList', JSON.stringify(finalResult), 'set');
    }
    const result = JSON.parse(LocalStroageConfig("animeList",'','get'))
    setAnimeFinalVal(result);
  }, [dragAndDrop]);

  return (
    <>
      <FilterOption FilterOptions={filter} />
      <Grid container spacing={2} sx={{ margin: '2px 0 0 -9px' }}>
        {(!_.isNil(animeData) && !_.isEmpty(animeData)) ?
          animeData && animeData.map((anime) => (
            <PictureDaD
              id={anime.mal_id}
              url={anime.url}
              title={anime.title}
              rating={anime.rating}
              day={anime.broadcast.day}
              duration={anime.duration}
              image_url={anime.images.jpg.image_url}
            />
          )) : <Typography sx={{ marginTop: '15%', marginLeft: '45%' }} variant="h6">
            No Data Found
          </Typography>}
      </Grid>
      {(!_.isNil(animeData) && !_.isEmpty(animeData)) ?
        <>
        <CssBaseline />
        <Container fixed>
        <Box >
        <Card sx={{minHeight:300 ,margin:10,borderRadius:5,boxShadow:'-webkit-box-shadow: 0px 0px 6px 1px rgba(0,0,0,0.57);-moz-box-shadow: 0px 0px 6px 1px rgba(0,0,0,0.57);box-shadow: 0px 0px 6px 1px rgba(0,0,0,0.57);'}} ref={drop}>
          <Button
            href="#"
            sx={{float:'right',margin:'10px 10px'}}
            variant="contained"
            onClick={() => {
              window.location.reload(false)
              LocalStroageConfig("animeList")
            }}
          >
            Clear Watch List
          </Button>
          <Typography sx={{ marginTop: '15%', marginLeft: '45%' }} variant="h6">
            Drag & Drop
          </Typography>
          <Grid container spacing={2} sx={{ margin: '2px 0 0 -9px' }}>
          {animeFinalVal &&
            animeFinalVal.map(data => {
              return (
                <>
                  <PictureDaD
                    id={data.mal_id}
                    url={data.url}
                    title={data.title}
                    rating={data.rating}
                    day={data.broadcast.day}
                    duration={data.duration}
                    image_url={data.images.jpg.image_url}
                  />
                </>
              )
            })}
            </Grid>
            </Card>
        </Box> </Container> </> : ''}
    </>
  )
}
