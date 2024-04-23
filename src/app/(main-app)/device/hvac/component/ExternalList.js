"use client";
import React, { useEffect, useState ,useRef} from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { WiCloud } from "react-icons/wi";
import {
    getExternalList
  } from "@/utils/api";

export default function ExternalList({FloorId}) {
    const [externalList, setExteranlList] = useState([]);
    useEffect(() => {
        if (FloorId != 0) {
            GetExternalList(FloorId);
        }
      }, [FloorId]);
    
    const GetExternalList = async (floorId) => {
        console.log(floorId)
        const result = await getExternalList(floorId);
        setExteranlList(result.data);
      };
  return (
    externalList.map((item) => {
        return <Card sx={{ display: 'flex', }}>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography component="div" variant="h5">
        <WiCloud size="2.5em"/>

        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {item.value}
        </Typography>
      </CardContent>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Mac Miller
        </Typography>
      </CardContent>
    </Box>
  </Card>
       
    })
    
  )
}
