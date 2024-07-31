import React from 'react'
import { RootState } from '../store';
import { useSelector } from 'react-redux';

function TableImageRender({light,dark}:{light?:string,dark?:string}) {
    const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <img src={theme=="light"?light:dark}/>
  )
}

export default TableImageRender