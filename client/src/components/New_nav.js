import React, { Component } from 'react'


  import FloatingMenu from './src/FloatingMenu';
  import MainButton from './src/MainButton';
  import ChildButton from './src/ChildButton';
  import AddIcon from '@material-ui/icons/Add';
  import ClearIcon from '@material-ui/icons/Clear';
  import FavoriteIcon from '@material-ui/icons/Favorite';
   
export default class NewNav extends Component {
    state = {
        isOpen: false,
      }
  render() {

    return (
        
        <FloatingMenu
        slideSpeed={500}
        direction="up"
        spacing={8}
        isOpen={this.state.isOpen}
      >
        <MainButton
          iconResting={<AddIcon style={{ fontSize: 20 }} nativeColor="white" />}
          iconActive={<ClearIcon style={{ fontSize: 20 }} nativeColor="white" />}
          backgroundColor="black"
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          size={56}
        />
         <ChildButton
          icon={<FavoriteIcon style={{ fontSize: 20 }} nativeColor="black" />}
          backgroundColor="white"
          size={40}
          onClick={() => console.log('First button clicked')}
        />
        <ChildButton
          icon={<FavoriteIcon style={{ fontSize: 20 }} nativeColor="black" />}
          backgroundColor="white"
          size={40}
        />
        <ChildButton
          icon={<FavoriteIcon style={{ fontSize: 20 }} nativeColor="black" />}
          backgroundColor="white"
          size={40}
        />
      </FloatingMenu>
    )
  }
}