import React from 'react'
import { Link, useParams } from 'react-router-dom';

export default function CursosPageEstudiante({match}) {

    const { idCurso} = useParams();
  return (
    <div>CursosPageEstudiante</div>
  )
}
