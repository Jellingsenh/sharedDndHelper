import React from 'react';
import { SubdirectoryArrowRight } from '@mui/icons-material';
import {Paper, Stack, Button, TextField} from '@mui/material';

export function enterPcInitiativesPopup(pcList) {
    console.log('Calling roll initiative for PCs: ' + pcList)
    
    return (
        <Paper style={{overflow: 'auto', 'backgroundColor':'white'}}>
            <p style={{fontSize: "18px", fontWeight: "bold"}}>Enter inititaive totals:</p>
            <Stack spacing={2} style={{border: '20px solid white', borderRadius: '5px'}}>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    {Object.entries(pcList).map((character) => (
                        <div key={character[1]}> 
                            <TextField
                                onChange={(e) => setCharacterInitiative(e, character)}
                                required
                                id="outlined-required"
                                type="number"
                                label={character[1]}
                            />
                            &nbsp;&nbsp;
                        </div>
                    ))}
                </div>
                <Button color="primary" style={{textTransform: "none", fontSize: "12px", color:'black'}} onClick={() => constructPcInitNamesList(pcList.length)} variant="contained" endIcon={<SubdirectoryArrowRight />}>
                    Submit initiatives
                </Button>
            </Stack>
        </Paper>
    );
}

export function quickRollInitiative() {
    apiRollInitiative("{}");
}

export function editAllInitiativesPopup(charList) { // charList is a map with initiatives
    // console.log('initiative order: ' + charList)
    // Object.entries(charList).map((character) => (
    //     console.log(character[1].name)
    // ));

    return (
        <Paper style={{overflow: 'auto', 'backgroundColor':'white'}}>
            <p style={{fontSize: "18px", fontWeight: "bold"}}>Enter new initiatives:</p>
            <Stack spacing={2} style={{border: '20px solid white', borderRadius: '5px'}}>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    {Object.entries(charList).map((character) => (
                        <div key={character[1].name}> 
                            {prepopulateInitNamesMap(character[1].name, character[1].initTotal)}
                            <TextField
                                onChange={(e) => editCharacterInitiative(e, character[1].name)}
                                required
                                id="outlined-required"
                                type="number"
                                label={character[1].name}
                                defaultValue={character[1].initTotal}
                            />
                            &nbsp;&nbsp;
                        </div>
                    ))}
                </div>
                <Button color="primary" style={{textTransform: "none", fontSize: "12px", color:'black'}} onClick={() => constructAllInitNamesList(charList.length)} variant="contained" endIcon={<SubdirectoryArrowRight />}>
                    Submit initiatives
                </Button>
            </Stack>
        </Paper>
    );
}

// builder functions:

var initNamesMap = [] // ex: {"jim":"1", "pc":"2"}

function setCharacterInitiative(e, charName) {
    var tempCharacterName = charName[1]
    var tempCharacterInitiative = e.target.value
    // console.log(tempCharacterName + '\'s initiative: ' + tempCharacterInitiative)
    // now add to the list (only add the most recent version)
    initNamesMap.map(char => {
        if (char.name == tempCharacterName) {
            console.log('Updating ' + tempCharacterName + '\'s initiative')
            initNamesMap = initNamesMap.filter(function(person) { 
                return person.name !==  tempCharacterName
            })
        }
    })

    initNamesMap.push({name: tempCharacterName, initiative: tempCharacterInitiative})
    // console.log('initNamesMap size: ' + initNamesMap.length)
}

function prepopulateInitNamesMap(charName, init) {
    console.log('prepopulating initiative map for edit...', charName, init);
    initNamesMap.map(char => {
        if (char.name == charName) {
            initNamesMap = initNamesMap.filter(function(person) { 
                return person.name !==  charName
            })
        }
    })

    initNamesMap.push({name: charName, initiative: init})
}

function editCharacterInitiative(e, tempCharacterName) {
    var tempCharacterInitiative = e.target.value
    // console.log(tempCharacterName + '\'s initiative: ' + tempCharacterInitiative)
    // now add to the list (only add the most recent version)
    initNamesMap.map(char => {
        if (char.name == tempCharacterName) {
            console.log('Updating ' + tempCharacterName + '\'s initiative')
            initNamesMap = initNamesMap.filter(function(person) { 
                return person.name !==  tempCharacterName
            })
        }
    })

    initNamesMap.push({name: tempCharacterName, initiative: tempCharacterInitiative})
    // console.log('initNamesMap size: ' + initNamesMap.length)
}

// button presses:

function constructPcInitNamesList(charNumber) { // ex: {"jim":"1", "pc":"2"}
    if (initNamesMap.length < charNumber) {
        alert('error entering initiative, some required values are blank')
    } else {
        var pcInitNamesList = '{'
        initNamesMap.map(char => {
            pcInitNamesList += '\"' + char.name + '\":\"' + char.initiative + '\", '
        })
        pcInitNamesList = pcInitNamesList.substring(0, pcInitNamesList.length-2) + '}';
        console.log('pcInitNamesList: ' + pcInitNamesList)
        apiRollInitiative(pcInitNamesList)
    }
}

function constructAllInitNamesList() { // ex: {"jim":"1", "pc":"2"}
    var allInitNamesList = '{'
    initNamesMap.map(char => {
        allInitNamesList += '\"' + char.name + '\":\"' + char.initiative + '\", '
    })
    allInitNamesList = allInitNamesList.substring(0, allInitNamesList.length-2) + '}';
    console.log('allInitNamesList: ' + allInitNamesList)
    apiUpdateInitiative(allInitNamesList)
    
}



// API functions:

async function apiRollInitiative(initNameList) {
    if (initNameList.length ==0 ) {
        initNameList = "{}";
    }

    console.log("PC initiative list: ", initNameList);
    
    const res = fetch('http://192.168.1.65:9001/playermenu/rollinitiative', {
        method: 'POST',
        body: initNameList
    })
    .then(response => response.json())
    .then((response) => {
        if(response.status === 400){
            console.log('Error rolling initiative:', response.charName);
        } else {
            console.log('Initiative response:', response);
            apiSetUpTurns();
        }
    })
    .catch(err => {
        console.log(err);
    });

    // refresh page
    window.location.reload(false);
}

async function apiSetUpTurns() {
    const res = await fetch('http://192.168.1.65:9001/playermenu/setupturns', {
        method: 'GET',
    })
    .catch(err => {
        console.log(err);
    });
}

async function apiUpdateInitiative(initNamesList) {
    if (initNamesList.length ==0 ) {
        initNamesList = "{}";
    }

    console.log("character initiative list: ", initNamesList);
    
    const res = fetch('http://192.168.1.65:9001/playermenu/changeinitiative', {
        method: 'POST',
        body: initNamesList
    })
    .then(response => response.json())
    .then((response) => {
        if(response.status === 400){
            console.log('Error changing initiative:', response.charName);
        } else {
            console.log('Initiative response:', response);
        }
    })
    .catch(err => {
        console.log(err);
    });

    // refresh page
    window.location.reload(false);
}