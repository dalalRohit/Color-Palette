import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from './DraggableColorList'
import {arrayMove} from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';
import ColorPicker from './ColorPicker';
import seedColors from './seedColors'
import styles from './styles/NewPaletteFormStyles';

class NewPaletteForm extends Component {
  static defaultProps ={
    maxColors : 20
  }
  constructor(props){
    super(props);
    this.state = {
      open: true,
      colors: seedColors[0].colors
    }
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColors = this.addRandomColors.bind(this)
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor(newColor){
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ''
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit(newPalette){
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g,'-') 
    newPalette.colors = this.state.colors
    this.props.savePalette(newPalette);
    this.props.history.push('/')
  }

  removeColor(colorName){
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  clearColors(){
    this.setState({colors: []})
  }

  addRandomColors(){
    const allColors = this.props.palette.map(p => p.colors).flat()
    var rand = Math.floor(Math.random() * allColors.length)
    const newRandomColor = allColors[rand]
    this.setState({
      colors: [...this.state.colors, newRandomColor]
    })
  }

  render() {
    const { classes, maxColors, palette } = this.props;
    const { open, colors } = this.state;
    const isPaletteFull = colors.length >= maxColors
    

    return (
      <div className={classes.root}>
        <PaletteFormNav 
        open={open} 
        palette={palette} 
        handleSubmit={this.handleSubmit} 
        handleDrawerOpen={this.handleDrawerOpen}/>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
          <Typography variant='h4' gutterBottom>Make your own Palette</Typography>
          <div className={classes.buttons}>
            <Button 
            variant='contained'
            color='secondary' 
            onClick={this.clearColors}
            className={classes.button}>
              Clear Palette
            </Button>
            <Button 
            variant='contained' 
            color='primary' 
            onClick={this.addRandomColors}
            disabled={isPaletteFull}
            className={classes.button}>
              Random Color
            </Button>
          </div>
          <ColorPicker isPaletteFull={isPaletteFull} addNewColor={this.addNewColor} colors={colors}/>
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList 
          colors={colors} 
          removeColor={this.removeColor} 
          axis='xy'
          onSortEnd={this.onSortEnd}
          distance={20}/>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);