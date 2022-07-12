import React from 'react';
import {useDrag} from "react-dnd"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function PictureDaD({id, url, title, rating,day,duration,image_url}) {
      const [{isDragging}, drag] = useDrag(() => ({
        type: "image",
        item: {id: id},
        collect: monitor => ({
          isDragging: !!monitor.isDragging(),
        }),
      }))
    return (
        <>
        <Grid item xs={4} md={3} >
              <Card sx={{ maxWidth: 310 }} ref={drag}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={image_url}>
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  sx={{ textDecoration: 'none', color: ' black' ,fontWeight:700}}
                  title={title}
                  subheader={day}
                />
                <a href={url}>
                  <CardMedia
                    component="img"
                    height="194"
                    image={image_url}
                    alt="Paella dish"
                  />
                </a>
                <CardContent>
                  <Typography variant="body2">
                    Rating :{rating}
                  </Typography>
                  <Typography variant="body2">
                    Duration :{duration}
                  </Typography>
                </CardContent>
              </Card>
              </Grid>
        </>
      )
}
