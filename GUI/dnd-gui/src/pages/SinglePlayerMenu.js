import React from 'react';
import { Accessibility, ChildCare, RemoveCircleOutline, PersonAdd, PriorityHigh, AccessTime, SaveAlt, Downloading, PersonRemove, Edit, Upload, Clear, GroupAdd, GroupRemove, PeopleOutline } from '@mui/icons-material';
import {List, Paper, Stack, Button} from '@mui/material';
import {returnCharacterCreatePopup, returnCharacterEditPopup} from '../components/EditCharacterPopups.js';
import {createGroup, loadGroup, deleteGroup, getGroups} from '../components/Groups.js';
import {enterPcInitiativesPopup, quickRollInitiative} from '../components/InitiativePopups.js';

class SinglePlayerMenu extends React.Component {

    constructor(props) {
        super(props);
   
        const queryParams = new URLSearchParams(window.location.search);
        const user = queryParams.get('user');
        console.log('got user: ' + user);

        this.state = {
            currentPlayer: user,
            characters: {},
            charactersNotInMap: {},
            PCs: {},
            currentCharacterName: "",
            currentCharacterBeingEdited: "",
            modal1Open: false,
            modal2Open: false,
            modal3Open: false,
            modal4Open: false,
            modal5Open: false,
            modal6Open: false,
            modal7Open: false,
            modal8Open: false,
            modal9Open: false,
            modal10Open: false,
            modal11Open: false,
            modal12Open: false,
            modal13Open: false,
            modal14Open: false,
            gameSaves: {},
            characterSaves: {},
            width: window.innerWidth,
            height: window.innerHeight,
        };

        this.loadCharacterSaves.bind(this);
        this.loadCharacterSaves();

        this.loadGameSaves.bind(this);
        this.loadGameSaves();

        this.getAllCharacters.bind(this);
        this.getAllCharacters();

        getGroups();

        this.getCharacterForEdit.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ 
            width: window.innerWidth,
            height: window.innerHeight
        });
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

        const res2 = await fetch('http://YOUR_URL_HERE:9001/playermenu/getcharacters/false', {
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


        console.log('got characters:', this.state.characters);
        console.log('got characters (not in map):', this.state.charactersNotInMap);
    }

    getCharacterForEdit = async () => {
        // populate PCs in map, then open the initiative popup!
        console.log('getting ' + this.state.currentCharacterName + ' (to edit) ...')

        try {
            const response = await fetch('http://YOUR_URL_HERE:9001/playermenu/getcharacter/' + this.state.currentCharacterName, {
                method: 'GET'
            })
            var char = await response.json();

            setTimeout(() => {  
                this.setState({
                    currentCharacterBeingEdited: char,
                    modal10Open: true,
                });
            }, 300);
            
        }
        catch(err) {
            console.log(err);
        }
        
    }

    loadCharacterSaves = () => {
        const res = fetch('http://YOUR_URL_HERE:9001/playermenu/getcharactersaves', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(response => {
            console.log('Character saves: ' + response );
            this.setState({
                characterSaves: response,
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    loadGameSaves = () => {
        const res = fetch('http://YOUR_URL_HERE:9001/playermenu/getgamesaves', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(response => {
            console.log('Game saves: ' + response );
            this.setState({
                gameSaves: response,
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    saveGameState = () => {
        var gameName = prompt('Existing game saves:\n{' + this.state.gameSaves + '}\n\nSave game as:');
        if (gameName != null && gameName != '') {
            apiSaveGameState(gameName);
        }
    }

    playAsCharacter = () => {
        window.open('/GamePlayMenu?user=' + this.state.currentPlayer + '&isDM=yes', '_self', 'noopener,noreferrer'); // _self for same
    }

    getPcsForInitiative = () => {
        // populate PCs in map, then open the initiative popup!

        const res = fetch('http://YOUR_URL_HERE:9001/playermenu/getpcs', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(response => {
            console.log("got PCs: ", response);
            if (response.length == 0) {
                quickRollInitiative();
            } else {
                this.setState({
                    PCs: response,
                    modal11Open: true,
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {

        const width  = this.state.width;
        const height  = this.state.height;
        const isMobile = width <= 500 || height <= 500;

        if (isMobile) {
            return(
                <div style={{border: '20px solid transparent'}}>
                    <div style={{flex: 1, width: '80%', height: '100%', resizeMode: 'contain',}}>
                        <h1>Mobile Character Menu</h1>
                    </div>
                </div>
            );
        } else {
            return (
                <div>

                    {/* Popups: */}

                    {/* <div style={{resizeMode: 'center',}}> */}

                    <div className="modal1" style={{display: this.state.modal1Open ? 'block' : 'none', "position": "absolute", "top":"1%", "left": "25%", "zIndex": "1", resizeMode: 'center'}}>
                        <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                            {this.state.modal1Open ? 
                                returnCharacterCreatePopup()
                            : 'Modal1'}
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal1Open: false,})}>[close]</Button>
                        </div>
                    </div>
                    <div className="modal2" style={{display: this.state.modal2Open ? 'block' : 'none', "position": "absolute", "zIndex": "1", "left": "38%", "top":"15%", resizeMode: 'center'}}>
                        <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey', borderRadius: '5px'}}>
                            {this.state.modal2Open ? 
                                <Paper style={{maxHeight: 800, maxWidth: 800, overflow: 'auto', 'backgroundColor':'white', border: '10px solid white', borderRadius: '5px'}}>
                                    <p>Choose Character to edit: </p>
                                    <div style={{"alignItems":"center", "justifyContent":"center",  "display": "flex", "flexDirection": "row", border: '20px solid white', borderRadius: '5px'}}>
                                        {Object.entries(this.state.characters).map((character) => (
                                            <div key={character}>
                                                <Button color="deeppurp" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => {
                                                    this.setState({
                                                        currentCharacterName: character[1],
                                                    });
                                                    setTimeout(() => {  
                                                        // need to get CurrentCharacter to edit
                                                        this.getCharacterForEdit()
                                                        this.setState({
                                                            modal2Open: false,
                                                        });
                                                    }, 100);
                                                    
                                                }}>
                                                    {character[1]}
                                                </Button>&nbsp;&nbsp;
                                            </div>
                                        ))}
                                        {Object.entries(this.state.charactersNotInMap).map((character) => (
                                            <div key={character}>
                                                <Button color="deeppurp" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => {
                                                    this.setState({
                                                        currentCharacterName: character[1],
                                                    });
                                                    setTimeout(() => {  
                                                        // need to get CurrentCharacter to edit
                                                        this.getCharacterForEdit()
                                                        this.setState({
                                                            modal2Open: false,
                                                        });
                                                    }, 200);
                                                }}>
                                                    {character[1]}
                                                </Button>&nbsp;&nbsp;
                                            </div>
                                        ))}
                                    </div>
                                </Paper>
                            : 'Modal2'}
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal2Open: false,})}>[close]</Button>
                        </div>
                    </div>
                    <div className="modal3" style={{display: this.state.modal3Open ? 'block' : 'none', "position": "absolute", "zIndex": "1", "left": "38%", "top":"15%", resizeMode: 'center'}}>
                        <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                            {this.state.modal3Open ? 
                                <Paper style={{maxHeight: 800, maxWidth: 800, overflow: 'auto', 'backgroundColor':'white', border: '10px solid white', borderRadius: '5px'}}>
                                    <p>Choose Character to duplicate: </p>
                                    <div style={{"alignItems":"center", "justifyContent":"center",  "display": "flex", "flexDirection": "row", border: '20px solid white', borderRadius: '5px'}}>
                                        {Object.entries(this.state.characters).map((character) => (
                                            <div key={character}>
                                                <Button color="deeppurp" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => apiDuplicateCharacter(character[1])}>
                                                    {character[1]}
                                                </Button>&nbsp;&nbsp;
                                            </div>
                                        ))}
                                        {Object.entries(this.state.charactersNotInMap).map((character) => (
                                            <div key={character}>
                                                <Button color="deeppurp" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => apiDuplicateCharacter(character[1])}>
                                                    {character[1]}
                                                </Button>&nbsp;&nbsp;
                                            </div>
                                        ))}
                                    </div>
                                </Paper>
                            : 'Modal3'}
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal3Open: false,})}>[close]</Button>
                        </div>
                    </div>
                    <div className="modal4" style={{display: this.state.modal4Open ? 'block' : 'none', "position": "absolute", "zIndex": "1", "left": "38%", "top":"15%", resizeMode: 'center'}}>
                        <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                            {this.state.modal4Open ?
                                <Paper style={{maxHeight: 800, maxWidth: 800, overflow: 'auto', 'backgroundColor':'white', border: '10px solid white', borderRadius: '5px'}}>
                                    <p>Choose Character to remove: </p>
                                    <div style={{"alignItems":"center", "justifyContent":"center",  "display": "flex", "flexDirection": "row", border: '20px solid white', borderRadius: '5px'}}>
                                        {Object.entries(this.state.characters).map((character) => (
                                            <div key={character}>
                                                <Button color="eighth" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => apiRemoveCharacter(character[1])}>
                                                    {character[1]}
                                                </Button>&nbsp;&nbsp;
                                            </div>
                                        ))}
                                        {Object.entries(this.state.charactersNotInMap).map((character) => (
                                            <div key={character}>
                                                <Button color="eighth" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => apiRemoveCharacter(character[1])}>
                                                    {character[1]}
                                                </Button>&nbsp;&nbsp;
                                            </div>
                                        ))}
                                    </div>
                                </Paper>
                            : 'Modal4'}
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal4Open: false,})}>[close]</Button>
                        </div>
                    </div>
                    <div className="modal9" style={{display: this.state.modal9Open ? 'block' : 'none', "position": "absolute", "zIndex": "1", "left": "38%", "top":"15%", resizeMode: 'center'}}>
                        <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                            {this.state.modal9Open ? 
                                <Paper style={{maxHeight: 800, maxWidth: 800, overflow: 'auto', 'backgroundColor':'white', border: '10px solid white', borderRadius: '5px'}}>
                                    <p>Existing character saves:</p>
                                    <div style={{"alignItems":"center", "justifyContent":"center",  "display": "flex", "flexDirection": "row"}}>
                                        {Object.entries(this.state.characterSaves).map((character) => (
                                            <div key={character} style={{fontSize: '10px', border:'1px solid grey', borderRadius: '5px', padding: '5px'}}>
                                                {character[1]}
                                            </div>
                                        ))}
                                    </div>
                                    <p>Choose a Character to save:</p>
                                    <div style={{"alignItems":"center", "justifyContent":"center",  "display": "flex", "flexDirection": "row", border: '20px solid white', borderRadius: '5px'}}>
                                        {Object.entries(this.state.characters).map((character) => (
                                            <div key={character}>
                                                <Button color="deeppurp" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => apiSaveCharacter(character[1])}>
                                                    {character[1]}
                                                </Button>&nbsp;&nbsp;
                                            </div>
                                        ))}
                                        {Object.entries(this.state.charactersNotInMap).map((character) => (
                                            <div key={character}>
                                                <Button color="deeppurp" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => apiSaveCharacter(character[1])}>
                                                    {character[1]}
                                                </Button>&nbsp;&nbsp;
                                            </div>
                                        ))}
                                    </div>
                                </Paper>
                            : 'Modal9'}
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal9Open: false,})}>[close]</Button>
                        </div>
                    </div>
                    <div className="modal5" style={{display: this.state.modal5Open ? 'block' : 'none', "position": "absolute", "zIndex": "1", "left": "38%", "top":"15%", resizeMode: 'center'}}>
                        <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                            {this.state.modal5Open ? 
                                <Paper style={{maxHeight: 800, maxWidth: 800, overflow: 'auto', 'backgroundColor':'white', border: '10px solid white', borderRadius: '5px'}}>
                                    <p>Choose a Character save to load: </p>
                                    <div style={{"alignItems":"center", "justifyContent":"center",  "display": "flex", "flexDirection": "row", border: '20px solid white', borderRadius: '5px'}}>
                                        {Object.entries(this.state.characterSaves).map((character) => (
                                            <div key={character}>
                                                <Button color="deeppurp" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => apiLoadCharacterSave(character[1])}>
                                                    {character[1]}
                                                </Button>&nbsp;&nbsp;
                                            </div>
                                        ))}
                                    </div>
                                </Paper>
                            : 'Modal5'}
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal5Open: false,})}>[close]</Button>
                        </div>
                    </div>
                    <div className="modal6" style={{display: this.state.modal6Open ? 'block' : 'none', "position": "absolute", "zIndex": "1", "left": "38%", "top":"15%", resizeMode: 'center'}}>
                        <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                            {this.state.modal6Open ? 
                                <Paper style={{maxHeight: 800, maxWidth: 800, overflow: 'auto', 'backgroundColor':'white', border: '10px solid white', borderRadius: '5px'}}>
                                    <p>Choose a Character save to delete: </p>
                                    <div style={{"alignItems":"center", "justifyContent":"center",  "display": "flex", "flexDirection": "row", border: '20px solid white', borderRadius: '5px'}}>
                                        {Object.entries(this.state.characterSaves).map((character) => (
                                            <div key={character}>
                                                <Button color="eighth" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => apiDeleteCharacterSave(character[1])}>
                                                    {character[1]}
                                                </Button>&nbsp;&nbsp;
                                            </div>
                                        ))}
                                    </div>
                                </Paper>
                            : 'Modal6'}
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal6Open: false,})}>[close]</Button>
                        </div>
                    </div>
                    <div className="modal7" style={{display: this.state.modal7Open ? 'block' : 'none', "position": "absolute", "zIndex": "1", "left": "38%", "top":"15%", resizeMode: 'center'}}>
                        <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                            {this.state.modal7Open ? 
                                <Paper style={{maxHeight: 800, maxWidth: 800, overflow: 'auto', 'backgroundColor':'white', border: '10px solid white', borderRadius: '5px'}}>
                                    <p>Choose a game to load: </p>
                                    <div style={{"alignItems":"center", "justifyContent":"center",  "display": "flex", "flexDirection": "row", border: '20px solid white', borderRadius: '5px'}}>
                                        {Object.entries(this.state.gameSaves).map((game) => (
                                            <div key={game}>
                                                <Button color="deeppurp" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => apiLoadGameState(game[1])}>
                                                    {game[1]}
                                                </Button>&nbsp;&nbsp;
                                            </div>
                                        ))}
                                    </div>
                                </Paper>
                            : 'Modal7'}
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal7Open: false,})}>[close]</Button>
                        </div>
                    </div>
                    <div className="modal8" style={{display: this.state.modal8Open ? 'block' : 'none', "position": "absolute", "zIndex": "1", "left": "38%", "top":"15%", resizeMode: 'center'}}>
                        <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                            {this.state.modal8Open ?
                                <Paper style={{maxHeight: 800, maxWidth: 800, overflow: 'auto', 'backgroundColor':'white', border: '10px solid white', borderRadius: '5px'}}>
                                    <p>Choose a game to delete: </p>
                                    <div style={{"alignItems":"center", "justifyContent":"center",  "display": "flex", "flexDirection": "row", border: '20px solid white', borderRadius: '5px'}}>
                                        {Object.entries(this.state.gameSaves).map((game) => (
                                            <div key={game}>
                                                <Button color="eighth" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => deleteGameState(game[1])}>
                                                    {game[1]}
                                                </Button>&nbsp;&nbsp;
                                            </div>
                                        ))}
                                    </div>
                                </Paper>
                            : 'Modal8'}
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal8Open: false,})}>[close]</Button>
                        </div>
                    </div>
                    <div className="modal10" style={{display: this.state.modal10Open ? 'block' : 'none', "position": "absolute", "top":"1%", "left": "25%", "zIndex": "1", resizeMode: 'center'}}>
                        <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                            {this.state.modal10Open ? 
                                returnCharacterEditPopup(this.state.currentCharacterBeingEdited)
                            : 'Modal10'}
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal10Open: false,})}>[close]</Button>
                        </div>
                    </div>
                    <div className="modal11" style={{display: this.state.modal11Open ? 'block' : 'none', "position": "absolute", "zIndex": "1", "left": "28%", "top":"15%", resizeMode: 'center'}}>
                        <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                            {this.state.modal11Open ?
                                enterPcInitiativesPopup(this.state.PCs)
                            : 'Modal11'}
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal11Open: false,})}>[close]</Button>
                        </div>
                    </div>
                    <div className="modal12" style={{display: this.state.modal12Open ? 'block' : 'none', "position": "absolute", "left": "38%", "top":"15%", "zIndex": "1", resizeMode: 'center'}}>
                        <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                            {this.state.modal12Open ? 
                                createGroup(this.state.characters, this.state.charactersNotInMap)
                            : 'Modal12'}
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal12Open: false,})}>[close]</Button>
                        </div>
                    </div>
                    <div className="modal13" style={{display: this.state.modal13Open ? 'block' : 'none', "position": "absolute", "left": "38%", "top":"15%", "zIndex": "1", resizeMode: 'center'}}>
                        <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                            {this.state.modal13Open ? 
                                loadGroup()
                            : 'Modal13'}
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal13Open: false,})}>[close]</Button>
                        </div>
                    </div>
                    <div className="modal14" style={{display: this.state.modal14Open ? 'block' : 'none', "position": "absolute", "left": "38%", "top":"15%", "zIndex": "1", resizeMode: 'center'}}>
                        <div style={{"position": "fixed", "backgroundColor": "lightgrey", border: '5px solid lightgrey',borderRadius: '5px'}}>
                            {this.state.modal14Open ? 
                                deleteGroup()
                            : 'Modal14'}
                            <Button style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => this.setState({modal14Open: false,})}>[close]</Button>
                        </div>
                    </div>

                    {/* </div> */}

                    {/* Actual buttons below: */}

                    <div style={{resizeMode: 'center',}}>
                        <h1>Dungeon Master Character Menu</h1>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 40 }}>
                            <div>
                                <h3>Current characters (in the map):</h3>
                                <Paper style={{maxHeight: 200, maxWidth: 500, overflow: 'auto', 'backgroundColor':'lightgrey'}}>
                                    {Object.entries(this.state.characters).map((character) => (
                                        <List key = {character}>
                                            <Button  style={{"color":"black",  textTransform: "none", fontSize: "10px"}} onClick={() => removeFromMapV2(character[1])}>
                                                <div style={{"color":"black",  textTransform: "none", fontSize: "12px", fontWeight: 'bold'}}>{character[1]}</div>
                                                &nbsp;&nbsp;&nbsp;&nbsp; {"(remove ->)"}
                                            </Button>
                                        </List>
                                    ))}
                                </Paper>
                            </div>
                            <div>
                                <h3>Characters not in the map:</h3>
                                <Paper style={{maxHeight: 200, maxWidth: 500, overflow: 'auto', 'backgroundColor':'lightgrey'}}>
                                    {Object.entries(this.state.charactersNotInMap).map((character) => (
                                        <List key = {character}>
                                            <Button  style={{"color":"black",  textTransform: "none", fontSize: "10px"}} onClick={() => moveToMapV2(character[1])}>
                                                {"(<- move to map)"}&nbsp;&nbsp;&nbsp;&nbsp; 
                                                <div style={{"color":"black",  textTransform: "none", fontSize: "12px", fontWeight: 'bold'}}>{character[1]}</div>
                                            </Button>
                                        </List>
                                    ))}
                                </Paper>
                            </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 40 }}> {/* change to repeat(5, 1fr) */}
                            <div>
                                <h2>Character options:</h2>
                                <Stack spacing={2}>
                                    <Button color="secondary" style={{textTransform: "none", fontSize: "12px"}} onClick={() => this.setState({modal1Open: true,})} variant="contained" endIcon={<ChildCare />}>
                                        Create a character
                                    </Button>
                                    <Button color="secondary" style={{textTransform: "none", fontSize: "12px"}} onClick={() => this.setState({modal3Open: true,})} variant="contained" endIcon={<PersonAdd />}>
                                        Duplicate a character
                                    </Button>
                                    <Button color="editblue" style={{textTransform: "none", fontSize: "12px"}} onClick={() => this.setState({modal2Open: true,})} variant="contained" endIcon={<Edit />}>
                                        Edit a character
                                    </Button>
                                    <Button color="deletered" style={{textTransform: "none", fontSize: "12px", color:'black'}} onClick={() => this.setState({modal4Open: true,})} variant="outlined" endIcon={<PersonRemove />}>
                                        Remove a character
                                    </Button>
                                </Stack>
                            </div>
                            <div>
                                <h2>Character save options:</h2>
                                <Stack spacing={5}>
                                    <Button color="secondary" style={{textTransform: "none", fontSize: "12px"}} onClick={() => this.setState({modal9Open: true,})} variant="contained" endIcon={<SaveAlt />}>
                                        Create a character save
                                    </Button>
                                    <Button color="editblue" style={{textTransform: "none", fontSize: "12px"}} onClick={() => this.setState({modal5Open: true,})} variant="contained" endIcon={<Upload />}>
                                        Load a character save
                                    </Button>
                                    <Button color="deletered" style={{textTransform: "none", fontSize: "12px", color:'black'}} onClick={() => this.setState({modal6Open: true,})} variant="outlined" endIcon={<Clear />}>
                                        Delete a character save
                                    </Button>
                                </Stack>
                            </div>
                            <div>
                                <h2>Character group options:</h2>
                                <Stack spacing={5}>
                                    <Button color="secondary" style={{textTransform: "none", fontSize: "12px"}} onClick={() => this.setState({modal12Open: true,})} variant="contained" endIcon={<GroupAdd />}>
                                        Create a group
                                    </Button>
                                    <Button color="editblue" style={{textTransform: "none", fontSize: "12px"}} onClick={() => this.setState({modal13Open: true,})} variant="contained" endIcon={<PeopleOutline />}>
                                        Load a group
                                    </Button>
                                    <Button color="deletered" style={{textTransform: "none", fontSize: "12px", color:'black'}} onClick={() => this.setState({modal14Open: true,})} variant="outlined" endIcon={<GroupRemove />}>
                                        Delete a group
                                    </Button>
                                </Stack>
                            </div>
                            {/* <div>
                                <h2>Thing options:</h2>
                                <Stack spacing={3}>
                                    <Button color="primary" onClick={createThing} variant="contained" endIcon={<AddBox />}>
                                        Create a thing
                                    </Button>
                                    <Button color="primary" onClick={dupeThing} variant="contained" endIcon={<FileCopy />}>
                                        Duplicate a thing
                                    </Button>
                                    <Button color="primary" onClick={deleteThing} variant="contained" endIcon={<EditNotifications />}>
                                        Edit a thing
                                    </Button>
                                    <Button color="primary" onClick={deleteThing} variant="contained" endIcon={<DeleteForever />}>
                                        Delete a thing
                                    </Button>
                                    
                                </Stack>
                            </div> */}
                            <div>
                                <h2>Game save options:</h2>
                                <Stack spacing={5}>
                                    <Button color="secondary" style={{textTransform: "none", fontSize: "12px"}} onClick={this.saveGameState.bind(this)} variant="contained" endIcon={<SaveAlt />}>
                                        Save game state
                                    </Button>
                                    <Button color="editblue" style={{textTransform: "none", fontSize: "12px"}} onClick={() => this.setState({modal7Open: true,})} variant="contained" endIcon={<Downloading />}>
                                        Load game state
                                    </Button>
                                    <Button color="deletered" style={{textTransform: "none", fontSize: "12px", color:'black'}} onClick={() => this.setState({modal8Open: true,})} variant="outlined" endIcon={<RemoveCircleOutline />}>
                                        Delete game state
                                    </Button>
                                </Stack>
                            </div>
                        </div>
                        <div>
                            <Stack spacing={1}>
                                <p></p>
                                <Button color="dmblue" style={{textTransform: "none", color:'white'}} onClick={openDMOptions} variant="contained" endIcon={<AccessTime />}>
                                    Dungeon Master options
                                </Button>
                                <Button color="primary" style={{color:"black"}} onClick={this.getPcsForInitiative.bind(this)} variant="contained" endIcon={<PriorityHigh />}>
                                    Roll initiative
                                </Button>
                                <Button color="enterblue" onClick={this.playAsCharacter.bind(this)} variant="contained" endIcon={<Accessibility />}>
                                    Enter Game
                                </Button>
                            </Stack>
        
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default SinglePlayerMenu;

function moveToMapV2(charName) {
    if (charName != null && charName != '') {

        // var mapLoc = prompt('Enter map h.e.x. coordinates (ex: \"h:1,e:0,x:-1\", Enter nothing for 0,0,0):');
        // if (mapLoc == null || mapLoc == '') {
        var mapLoc = "h0e0x0"
        // } // Add map coordinates when map is made

        apiMoveCharacterToMap(charName, mapLoc);
    }
}

function removeFromMapV2(charName) {
    if (charName != null && charName != '') {
        apiRemoveCharacterFromMap(charName);
    }
}

// function createThing() {

// }

// function dupeThing() {

// }

// function deleteThing() {

// }

// function moveThing() {

// }

// function moveThingFromMap() {

// }

function openDMOptions() {
    window.open('/DungeonMasterOptions', '_self', 'noopener,noreferrer'); // _self for same
}

async function apiDuplicateCharacter(charName) {
    const res = await fetch('http://YOUR_URL_HERE:9001/playermenu/duplicatecharacter', {
        method: 'POST',
        body: JSON.stringify({
            "characterName": charName
        })
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Character', charName, 'does not exist', response);
        } else if (response.status === 200) {
            // refresh page
            window.location.reload(false);
            console.log('Duplicated character', charName);
        }
    })
    .catch(err => {
        console.log(err);
    });
}

async function apiRemoveCharacter(charName) {
    const res = await fetch('http://YOUR_URL_HERE:9001/playermenu/removecharacter', {
        method: 'POST',
        body: charName
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Character', charName, 'does not exist', response);
        } else if (response.status === 200) {
            // refresh page
            window.location.reload(false);
            console.log('Removed character', charName);
        }
    })
    .catch(err => {
        console.log(err);
    });
}

// map calls:

async function apiMoveCharacterToMap(charName, mapLoc) {
    console.log("map lcation = " + mapLoc)

    const res = await fetch('http://YOUR_URL_HERE:9001/playermenu/movetomap', {
        method: 'POST',
        body: charName
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Character', charName, 'is not not in the map');
        } else if (response.status === 200) {
            console.log('Moving character', charName, 'to the map');
            // refresh page
            window.location.reload(false);
        }
    })
    .catch(err => {
        console.log(err);
    });
}

// save data calls:

async function apiRemoveCharacterFromMap(charName) {
    const res = await fetch('http://YOUR_URL_HERE:9001/playermenu/removefrommap', {
        method: 'POST',
        body: charName
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Character', charName, 'is not in the map');
        } else if (response.status === 200) {
            console.log('Moving character', charName, 'out of the map');
            // refresh page
            window.location.reload(false);
        }
    })
    .catch(err => {
        console.log(err);
    });
}

async function apiSaveCharacter(charName) {
    const res = await fetch('http://YOUR_URL_HERE:9001/playermenu/savecharacter', {
        method: 'POST',
        body: charName
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Character', charName, 'failed to save');
        } else if (response.status === 200) {
            // refresh page
            window.location.reload(false);
            console.log('Character', charName, 'saved');
        }
    })
    .catch(err => {
        console.log(err);
    });
}

async function apiLoadCharacterSave(charName) {
    const res = await fetch('http://YOUR_URL_HERE:9001/playermenu/loadcharacter', {
        method: 'POST',
        body: charName
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Character', charName, 'failed to load');
        } else if (response.status === 200) {
            // refresh page
            window.location.reload(false);
            console.log('Character', charName, 'loaded');
        }
    })
    .catch(err => {
        console.log(err);
    });
}

function apiDeleteCharacterSave(charName) {
    var proceed = window.confirm("Are you sure you want to proceed? This will delete the character save " + charName);
    if (proceed) {
        apiDeleteCharacterSaveAsync(charName);
    }
}


async function apiDeleteCharacterSaveAsync(charName) {
    const res = await fetch('http://YOUR_URL_HERE:9001/playermenu/deletecharacter', {
        method: 'POST',
        body: charName
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Character save', charName, 'failed to delete');
        } else if (response.status === 200) {
            // refresh page
            window.location.reload(false);
            console.log('Character save', charName, 'deleted');
        }
    })
    .catch(err => {
        console.log(err);
    });
}

async function apiSaveGameState(gameName) {
    const res = await fetch('http://YOUR_URL_HERE:9001/playermenu/savegame', {
        method: 'POST',
        body: gameName
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Game', gameName, 'failed to save');
        } else if (response.status === 200) {
            // refresh page
            window.location.reload(false);
            console.log('Game', gameName, 'saved');
        }
    })
    .catch(err => {
        console.log(err);
    });
}

async function apiLoadGameState(gameName) {
    const res = await fetch('http://YOUR_URL_HERE:9001/playermenu/loadgame', {
        method: 'POST',
        body: gameName
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Game', gameName, 'failed to load');
        } else if (response.status === 200) {
            // refresh page
            window.location.reload(false);
            console.log('Game', gameName, 'loaded');
        }
    })
    .catch(err => {
        console.log(err);
    });
}

function deleteGameState(gameName) {
    var proceed = window.confirm("Are you sure you want to proceed? This will delete the game save " + gameName);
    if (proceed) {
        apiDeleteGameState(gameName);
    }
}

async function apiDeleteGameState(gameName) {
    const res = await fetch('http://YOUR_URL_HERE:9001/playermenu/deletegame', {
        method: 'POST',
        body: gameName
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Game', gameName, 'failed to delete');
        } else if (response.status === 200) {
            // refresh page
            window.location.reload(false);
            console.log('Game', gameName, 'deleted');
        }
    })
    .catch(err => {
        console.log(err);
    });
}
