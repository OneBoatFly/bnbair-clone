import React from 'react';
import { useSelector } from 'react-redux';
import MainForm from './MainForm';

export default function MainFormContainer() {
    const key = useSelector((state) => state.maps.key);
    const sessionUser = useSelector(state => state.session.user);

  return (
      <MainForm apiKey={key} sessionUser={sessionUser}/>
  )
}
