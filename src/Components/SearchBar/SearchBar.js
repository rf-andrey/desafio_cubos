import React from 'react';
import classes from './SearchBar.module.css'

const searchBar = props => (
  <input
    className={classes.SearchBar}
    type="text"
    placeholder="Busque um filme..."
    onKeyDown={props.keyDown}
    onChange={props.changed}
    value={props.value} />
);

export default searchBar;