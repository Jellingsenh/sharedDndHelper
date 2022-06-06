import React from 'react';
import { FaceRetouchingNatural, HeartBroken, ModeEdit } from '@mui/icons-material';

import {List, Paper, Button, TextField} from '@mui/material';
import {editAllInitiativesPopup} from '../components/InitiativePopups.js';
import {returnCharacterEditPopup, returnCharacterViewPopup} from '../components/EditCharacterPopups.js';

class GamePlayMenu extends React.Component {

    constructor(props) {
        super(props);

        const queryParams = new URLSearchParams(window.location.search);
        const user = queryParams.get('user');
        const dm = queryParams.get('isDM');
        const currChar = queryParams.get('currentCharacter');
        console.log('got user: ' + user + ', DM: ' + dm + ', current character: ' + currChar);
   
        this.state = {
            currentPlayer: user,
            dm: dm,
            currentCharacter: currChar,
            characters: {},
            // charactersNotInMap: {},
            currentTurn: "",
            nextTurn: "",
            initiativeOrder: {},
            modal1Open: false,
            modal2Open: false,
            modal3Open: false,
            modal4Open: false,
            currentHealthBeingEdited: "",
            currentHealthBeingEditedName: "",
            currentCharacterBeingEdited: {},
            currentCharacterBeingEditedName: "",
        };

        this.getAllCharacters.bind(this);
        this.getAllCharacters();

        this.getInitiative.bind(this);
        this.getInitiative();

        this.getCharacterForView.bind(this)
    }

    getAllCharacters = async () => {
        const res = await fetch('http://YOUR_URL_HERE:9001/playermenu/getcharacters/true', {
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

        // const res2 = await fetch('http://YOUR_URL_HERE:9001/playermenu/getcharacters/false', {
        //     method: 'GET',
        // })
        // .then(response => response.json())
        // .then(response => {
        //     this.setState({
        //         charactersNotInMap: response,
        //     });
        // })
        // .catch(err => {
        //     console.log(err);
        // });


        console.log('got characters In the map):', this.state.characters);
        // console.log('got characters (not in map):', this.state.charactersNotInMap);
    }

    getInitiative = async () => {
        const res = await fetch('http://YOUR_URL_HERE:9001/playermenu/getinitiative', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                initiativeOrder: response,
            });
        })
        .catch(err => {
            console.log(err);
        });

        console.log('got initiative order');
    }

    // getCharacterForView = async () => {
    //     // populate PCs in map, then open the initiative popup!
    //     console.log('getting ' + this.state.currentCharacterBeingEditedName + ' (to view) ...')

    //     try {
    //         const response = await fetch('http://YOUR_URL_HERE:9001/playermenu/getcharacter/' + this.state.currentCharacterBeingEditedName, {
    //             method: 'GET'
    //         })
    //         var char = await response.json();
    //         console.log('0character response: ' + char)
    //         setTimeout(() => { 
    //             console.log('character response: ' + char)
    //             this.setState({
    //                 currentCharacterBeingEdited: char,
    //             });
    //         }, 500);
            
    //     }
    //     catch(err) {
    //         console.log(err);
    //     }
        
    // }

    getCharacterForView = async () => {
        // populate PCs in map, then open the initiative popup!
        console.log('getting ' + this.state.currentCharacterBeingEditedName + ' (to edit) ...')

        try {
            const response = await fetch('http://YOUR_URL_HERE:9001/playermenu/getcharacter/' + this.state.currentCharacterBeingEditedName, {
                method: 'GET'
            })
            var char = await response.json();

            setTimeout(() => {  
                this.setState({
                    currentCharacterBeingEdited: char,
                    modal3Open: true,
                });
            }, 300);
            
        }
        catch(err) {
            console.log(err);
        }
        
    }

    render() {

        return (
            <div>
                {/* Popups: */}

                <div className="modal1" style={{display: this.state.modal1Open ? 'block' : 'none', "position": "absolute", "top":"50%", "left":"29%", "zIndex": "1", "backgroundColor": "blue"}}>
                    <div style={{"position": "fixed", "left":"38%", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                        {this.state.modal1Open ? 
                            <div style={{'backgroundColor':'white', border: '10px solid white', borderRadius: '5px'}}>
                                <div>
                                    <TextField
                                        onChange={getCharHealth}
                                        required
                                        id="outlined-required"
                                        type="number"
                                        label={this.state.currentHealthBeingEditedName + "\'s Health"}
                                        defaultValue={this.state.currentHealthBeingEdited}
                                    />
                                </div>
                                <p></p>
                                <div>
                                    <Button color="third" onClick={() => editCharacterHealth(this.state.currentHealthBeingEditedName)} variant="contained" endIcon={<HeartBroken />}>
                                        Update health
                                    </Button>
                                </div>
                            </div>
                        : 'Modal1'}
                        <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal1Open: false,})}>[close]</Button>
                    </div>
                </div>
                <div className="modal2" style={{display: this.state.modal2Open ? 'block' : 'none', "position": "absolute", "top":"40%", "left":"29%", "zIndex": "1", "backgroundColor": "blue"}}>
                    <div style={{"position": "fixed", "left":"28%", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                        {this.state.modal2Open ? 
                            editAllInitiativesPopup(this.state.initiativeOrder)
                        : 'Modal2'}
                        <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal2Open: false,})}>[close]</Button>
                    </div>
                </div>
                <div className="modal3" style={{display: this.state.modal3Open ? 'block' : 'none', "position": "absolute", "top":"8%", "left":"29%", "zIndex": "1", "backgroundColor": "blue"}}>
                    <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                        {this.state.modal3Open ? 
                            returnCharacterViewPopup(this.state.currentCharacterBeingEdited)
                        : 'Modal3'}
                        <div style={{"alignItems":"center", "justifyContent":"center", "display": "flex", "flexDirection": "row", border: '5px solid lightgrey',borderRadius: '5px'}}>
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal3Open: false, modal4Open: true,})} variant="contained" endIcon={<FaceRetouchingNatural />}>
                                Edit {this.state.currentCharacterBeingEditedName}
                            </Button>
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal3Open: false,})}>[close]</Button>
                        </div>
                    </div>
                </div>
                <div className="modal4" style={{display: this.state.modal4Open ? 'block' : 'none', "position": "absolute", "top":"8%", "left":"29%", "zIndex": "1", "backgroundColor": "blue"}}>
                    <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                        {this.state.modal4Open ? 
                            returnCharacterEditPopup(this.state.currentCharacterBeingEdited)
                        : 'Modal4'}
                        <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal4Open: false,})}>[close]</Button>
                    </div>
                </div>
                <h1>Gameplay Menu</h1>
                <h3>Initiative order:</h3>
                    <Paper style={{maxHeight: 600, maxWidth: 1700, overflow: 'auto', 'backgroundColor':'lightblue',  border: '40px solid lightblue', borderRadius: '10px'}}>
                        {Object.entries(this.state.initiativeOrder).map((character) => (
                            <List key = {character} >
                                <div style={{"alignItems":"center", "justifyContent":"center",  "display": "flex", "flexDirection": "row"}}>
                                    <p style={{"color":"black", textTransform: "uppercase", fontSize: "20px", fontWeight: "bold"}}>
                                        {character[1].name}&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p style={{"color":"black", textTransform: "none", fontSize: "16px"}}>
                                        {" (initiative = " + character[1].initTotal + "):"}&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <Button variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "14px"}} onClick={() => {
                                        this.setState({
                                            currentHealthBeingEditedName: character[1].name,
                                            currentHealthBeingEdited:  character[1].hp,
                                            modal1Open: true
                                        });
                                    }} endIcon={<ModeEdit />}>
                                        {"Health = " + character[1].hp}
                                    </Button>
                                    <p style={{"color":"black", textTransform: "none", fontSize: "16px"}}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;{"AC = " + character[1].ac}&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p style={{"color":"black", textTransform: "none", fontSize: "16px", border: '1px solid black', borderRadius: '5px'}}>
                                        &nbsp;{"Full Attack: " + character[1].attack}&nbsp;
                                    </p>
                                    <p style={{"color":"black", textTransform: "none", fontSize: "16px"}}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;{"Status: " + character[1].status}&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <Button variant="outlined" style={{"color":"black",  textTransform: "none"}} onClick={() => {
                                        this.setState({
                                            currentCharacterBeingEditedName: character[1].name,
                                        });
                                        setTimeout(() => {  
                                            // need to get CurrentCharacter to view
                                            this.getCharacterForView();
                                        }, 100);
                                    }}>
                                        {"(View " + character[1].name + ")"}
                                    </Button>
                                </div>
                            </List>
                        ))}
                    </Paper>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <Button variant="contained" color="fifth" style={{"color":"black",  textTransform: "none", fontSize: "16px"}} onClick={() => {
                        this.setState({
                            modal2Open: true
                        });
                    }}>
                        Edit Initiative Order
                    </Button>
            </div>
        );
    }

}

export default GamePlayMenu;

var tempCharHealth
function getCharHealth(e) {
    tempCharHealth = e.target.value
    console.log(tempCharHealth)
}

function editCharacterHealth(charName) {
    console.log('editing ' + charName + '\'s health: ' + tempCharHealth)
    apiEditCharacterHealth(charName, tempCharHealth)
}

// API functions:

async function apiEditCharacterHealth(charName, currentHealth) {
    
        const res = await fetch('http://YOUR_URL_HERE:9001/playermenu/editcharacterhealth', {
        method: 'POST',
        body: JSON.stringify({
            "characterName": charName,
            "currentHealth": currentHealth,
        })
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Character', charName, 'does not exist');
        } else if (response.status === 200) {
            console.log('Edited character', charName, '\'s health');
            // refresh page
            window.location.reload(false);
        }
    })
    .catch(err => {
        console.log(err);
    });
    
}