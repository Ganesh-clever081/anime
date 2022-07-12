import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {option} from '../Utils/DummyData';
import Anime from '../Containers/Anime';

export default function FilterOption(filterVal) {
  const [ optionsData, setOptionsData ] = useState('');
  Anime(optionsData);
  return (
    <>
     <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={option}
      sx={{ width: 300,float:'right',marginTop:2,marginRight:1 }}
      onChange={e => filterVal.FilterOptions(e)}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
    </>
  )
}
