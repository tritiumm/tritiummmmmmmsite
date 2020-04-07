import React, { useState, useEffect, useContext } from 'react';
import './index.styl';
export default function Atom(props: {}) {
  return(
    <section>
      <div className="center"></div> 
      <article className="ring1">
        <div></div>
      </article>
      <article className="ring2">
        <div></div>
      </article>
      <article className="ring3">
        <div></div>
      </article>
    </section>
  )
}
