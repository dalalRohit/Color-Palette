import React, { Component } from 'react';
import ColorBox from './ColorBox';
import 'rc-slider/assets/index.css';
import './Palette.css';
import Slider, { Range } from 'rc-slider';

class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {
            level:500
        }
        this.changeLevel = this.changeLevel.bind(this)
    }

    changeLevel(newLevel){
        this.setState({
            level: newLevel
        })
    }

    render() {
        const {level} = this.state;
        const {colors} = this.props.palette;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color.rgb} name={color.name}/>
        ))
        return (
            <div className='Palette'>
                <div className='slider'>
                    <Slider
                    defaultValue={level}
                    min={100}
                    max={900}
                    step={100}
                    onAfterChange={this.changeLevel}/>
                </div>
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default Palette;
