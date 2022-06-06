import React from 'react';
import { Accessibility, Map, Directions, ChildCare, RemoveCircleOutline, PersonAdd, PriorityHigh, AddBox, FileCopy, DeleteForever, AddLocationAlt, LocationOff, AccessTime, SaveAlt, Downloading, PersonRemove } from '@mui/icons-material';
import {List, Paper, Stack, Button} from '@mui/material';


class MultiPlayerMenu extends React.Component {

    constructor(props) {
        super(props);
   
        const queryParams = new URLSearchParams(window.location.search);
        const user = queryParams.get('user');
        console.log('got user: ' + user);

        this.state = {
            currentPlayer: user,
            characters: {},
            charactersNotInMap: {}
        };

        this.getAllCharacters = this.getAllCharacters.bind(this);

        this.getAllCharacters();
    }

    getAllCharacters = async () => {
        const res = await fetch('http://192.168.1.65:9001/playermenu/getcharacters/true', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                characters: response,
            });
        })
        .catch(err => {
            console.log(err);
        });

        const res2 = await fetch('http://192.168.1.65:9001/playermenu/getcharacters/false', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                charactersNotInMap: response,
            });
        })
        .catch(err => {
            console.log(err);
        });

        console.log('got characters:');
        console.log(this.state.characters);
        console.log(this.state.charactersNotInMap);
    }

    playAsCharacter = () => {
        var charName = prompt('Please choose a character to play as:');// make safe~~~
        if (charName != null && charName != '') {
            window.open('/GamePlayMenu?user=' + this.state.currentPlayer + '&isDM=no&currentCharacter=' + charName, '_self', 'noopener,noreferrer');
        }
    }

    render() {

        return (
            <div>
                <h1>Character Menu</h1>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 40 }}>
                    <div>
                        <Stack spacing={2}>
                            <h3>Current characters (in the map):</h3>
                            <Paper style={{maxHeight: 200, maxWidth: 400, overflow: 'auto', 'backgroundColor':'lightgrey'}}>
                                {Object.entries(this.state.characters).map((character) => (
                                    <List key = {character} >
                                        {character[1]}
                                    </List>
                                ))}
                            </Paper>
                        </Stack>
                    </div>
                    <div>
                        <Stack spacing={2}>
                            <h3>Characters not in the map:</h3>
                            <Paper style={{maxHeight: 200, maxWidth: 400, overflow: 'auto', 'backgroundColor':'lightgrey'}}>
                            {Object.entries(this.state.charactersNotInMap).map((character) => (
                                    <List key = {character} >
                                    {character[1]}
                                </List>
                                ))}
                            </Paper>
                        </Stack>
                    </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 40 }}>
                    <div>
                        <h2></h2>
                        <Button color="secondary" onClick={addCharacter} variant="contained" endIcon={<ChildCare />}>
                            Add a character
                        </Button>
                    </div>
                    <div>
                        <h2></h2>
                        <Button color="primary" onClick={createThing} variant="contained" endIcon={<AddBox />}>
                            Create a thing
                        </Button>
                    </div>
                </div>
                <div>
                    <h2></h2>
                    <Button color="secondary" onClick={this.playAsCharacter.bind(this)} variant="contained" endIcon={<Accessibility />}>
                        Play as a character / enter the map
                    </Button>
                </div>
            </div>
        );
    }
}

export default MultiPlayerMenu;
  
function addCharacter() {
    var charName = prompt('Please enter a character name:');
    if (charName != null && charName != '') {
        apiAddCharacter(charName);
    }
}

function createThing() {

}

async function apiAddCharacter(charName) {
    const res = await fetch('http://192.168.1.65:9001/playermenu/addcharacter', {
        method: 'POST',
        body: JSON.stringify({
            "characterName":charName,
            "maxHealth":"10",
            "currentHealth":"9",
            "initiative":"1",
            "armorClass":"10",
            "touch":"10",
            "flatFooted":"10",
            "race":"frog",
            "size":"s",
        })
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Character', charName, 'already exists');
        } else if (response.status === 200) {
            console.log('Adding character', charName);
            // refresh page
            window.location.reload(false);
        }
    })
    .catch(err => {
        console.log(err);
    });
}
