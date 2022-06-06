import React from 'react';

import CoPresentIcon from '@mui/icons-material/CoPresent';
import {List, Paper, Stack, Button} from '@mui/material';

class GameModeMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        players: {},
    };

    this.getAllPlayers = this.getAllPlayers.bind(this);

    this.getAllPlayers();
  }

  getAllPlayers = async () => {
    const res = await fetch('http://YOUR_URL_HERE:9001/getplayers', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(response => {
        this.setState({
            players: response,
        });
    })
    .catch(err => {
        console.log(err);
    });

    console.log('got players');
  }

  render() {
    return (
      <div>
        <h1>Welcome to D&D 3.5 Combat Assistant!</h1>
        <h3>Current players:</h3>
          <Paper style={{maxHeight: 200, maxWidth: 400, overflow: 'auto', 'backgroundColor':'lightgrey'}}>
              {Object.entries(this.state.players).map((player) => (
                  constrctPlayerList(player[0], player[1])
              ))}
          </Paper>
          <Stack spacing={10}>
            <div className="main-menu-button-group">
              <h3>Enter the game:</h3>
                <Stack spacing={2}>
                  <Button color="secondary" onClick={handleClickSingleplayer} variant="contained" endIcon={<CoPresentIcon />}>
                    Play as a Dungeon Master
                  </Button>
                  {/* <Button color="secondary" onClick={handleClickMultiplayer} variant="contained" endIcon={<PeopleAltIcon />}>
                    PC
                  </Button> */}
                </Stack>
            </div>
          </Stack>
      </div>
    );
  }
}

export default GameModeMenu;

function constrctPlayerList(name, isDM) {
  let listStr = name;
  if (isDM == "yes") {
      listStr = name + "    (DM)";
  }
  return <List key = {name}>
          {listStr}
      </List>
}

function handleClickMultiplayer() {
  var userName = prompt('Please enter a unique username:');
  // <TextField id='standard-basic' label='Please enter a unique username:' variant='standard' onChange={ this.handleChange } />
  if (userName != null  && userName != '') {
      apiAddPlayer(userName, 'no', 2); // 2 sends to the Multiplayer aka PC menu
      
  }
}

function handleClickSingleplayer() {
  var userName = prompt('Please enter a unique username:');
  if (userName != null && userName != '') {
    apiAddPlayer(userName, 'yes', 1); // 1 sends to the Singleplayer aka DM menu
  }
}

async function apiAddPlayer(username, isDm, playerNumber) {
  const res = await fetch('http://YOUR_URL_HERE:9001/addplayer', {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      isDM: isDm,
    })
  })
  .then((response) => {
    if(response.status === 400){
      console.log('Player', username, 'already exists');
    } else if (response.status === 200) {
      console.log('Adding player', username, isDm);
      if (playerNumber == 1) {
        window.open(window.location.href+'SinglePlayerMenu?user=' + username, '_self', 'noopener,noreferrer'); // _self for same
      } else if (playerNumber == 2) {
        window.open(window.location.href+'MultiPlayerMenu?user=' + username, '_self', 'noopener,noreferrer'); // _blank for new tab
      }
    }
  })
  .catch(err => {
    console.log(err);
  });
}

// next steps: test connecting across connections -> PORT FORWARDING!
