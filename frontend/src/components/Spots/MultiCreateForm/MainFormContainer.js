import React from 'react';
import { useSelector } from 'react-redux';
import MainForm from './MainForm';

export default function MainFormContainer() {
    const geokey = useSelector((state) => state.maps.geokey);
    const sessionUser = useSelector(state => state.session.user);

  return (
      <MainForm apiKey={geokey} sessionUser={sessionUser}/>
  )
}
