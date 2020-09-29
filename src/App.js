import React, { Component } from 'react';
import Palette from './Palette';
import PaletteList from './PaletteList'
import seedColors from './seedColors';
import {generatePalette} from './Colorhelper';
import {Route, Switch} from 'react-router-dom';
import SingleColor from './SingleColor';
import NewPaletteForm from './NewPaletteForm'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      palette: seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  findPalette(id){
    return this.state.palette.find(function(palette){
      return palette.id === id
    })
  };

  savePalette(newPalette){
    this.setState({
      palette: [...seedColors, newPalette]
    })
  };

  render(){
  return (
    <Switch>
      <Route exact path='/palette/new' 
      render = {(routeProps) => <NewPaletteForm savePalette={this.savePalette} {...routeProps}/>}
      />
      <Route exact path='/palette/:paletteId/:colorId'
      render={(routeProps) => <SingleColor
      colorId = {routeProps.match.params.colorId} 
      palette = {generatePalette(this.findPalette(routeProps.match.params.paletteId))}/>}/>
      <Route exact path='/' 
      render={(routeProps) => <PaletteList palettes={this.state.palette} {...routeProps}/>}/>
      <Route exact path='/palette/:id' 
      render={(routeProps) => <Palette palette = {generatePalette(this.findPalette(routeProps.match.params.id))}/>}/>
    </Switch>

  );
  }
}

export default App;
