import React from 'react';
import { Add, SaveAs} from '@mui/icons-material';
import {Paper, Stack, Button, TextField, FormControlLabel, Checkbox, getFormGroupUtilityClass} from '@mui/material';

var groups = {};

export function getGroups() {
    const res = fetch('http://192.168.1.65:9001/playermenu/getgroupsaves', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(response => {
        // console.log('Groups: ' + response );
        groups = response;
    })
    .catch(err => {
        console.log(err);
    });
}

export function createGroup(characterList, characterNotInMapList) {
    console.log('Groups: ' + groups );
    var groupName = prompt('Existing groups:\n{' + groups + '}\n\nNew group name:');
    if (groupName != null && groupName != '') {
        return (
            <Paper style={{overflow: 'auto', 'backgroundColor':'white', border: '10px solid white', borderRadius: '5px'}}>
                <p>Create group {groupName}: </p>
                <div style={{"display": "flex", "flexDirection": "row", border: '20px solid white', borderRadius: '5px'}}>
                    {Object.entries(characterList).map((character) => (
                        <div key={character}>
                            <FormControlLabel control={<Checkbox color="sixth" defaultChecked={false} onChange={(e) => addCharToGroup(e, character[1], groupName)}/>} label={character[1]} />
                        </div>
                    ))}
                    {Object.entries(characterNotInMapList).map((character) => (
                        <div key={character}>
                            <FormControlLabel control={<Checkbox color="sixth" defaultChecked={false} onChange={(e) => addCharToGroup(e, character[1], groupName)}/>} label={character[1]} />
                        </div>
                    ))}
                </div>
                <Button color="deeppurp" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => apiCreateGroup(groupName)}>
                        Save Group
                </Button>
            </Paper>
        );
    } else {
        // refresh page
        window.location.reload(false);
    }
}

export function loadGroup() {
    return (
        <Paper style={{overflow: 'auto', 'backgroundColor':'white', border: '10px solid white', borderRadius: '5px'}}>
            <p>Choose group to load: </p>
            <div style={{"display": "flex", "flexDirection": "row", border: '20px solid white', borderRadius: '5px'}}>
                {Object.entries(groups).map((group) => (
                    <div key={group}>
                        <Button color="deeppurp" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => apiLoadGroup(group[1])}>
                            {group[1]}
                        </Button>&nbsp;&nbsp;
                    </div>
                ))}
            </div>
        </Paper>
    );
}

export function deleteGroup() {
    return (
        <Paper style={{overflow: 'auto', 'backgroundColor':'white', border: '10px solid white', borderRadius: '5px'}}>
            <p>Choose group to delete: </p>
            <div style={{"display": "flex", "flexDirection": "row", border: '20px solid white', borderRadius: '5px'}}>
                {Object.entries(groups).map((group) => (
                    <div key={group}>
                        <Button color="deeppurp" variant="outlined" style={{"color":"black", textTransform: "none", fontSize: "10px"}} onClick={() => apiDeleteGroup(group[1])}>
                            {group[1]}
                        </Button>&nbsp;&nbsp;
                    </div>
                ))}
            </div>
        </Paper>
    );
}

// builder functions:

var tempCharGroup = [];

function addCharToGroup(e, charName) {
    var inGroup = e.target.checked
    if (inGroup) {
        // add if not already there
        tempCharGroup.map(char => {
            // console.log('tempChar:', char)
            if (char == charName) {
                return;
            }
        });
        tempCharGroup.push(charName);
    } else {
        //remove if in group
        tempCharGroup.map(char => {
            if (char == charName) {
                tempCharGroup = tempCharGroup.filter(function(person) { 
                    return person !== charName
                });
            }
        })
    }
    console.log('tempCharGroup size: ' + tempCharGroup.length);
}

// API calls:

async function apiCreateGroup(groupName) {

    var groupBody = '{ \"groupName\": \"'+groupName+'\"';
    var count = 1;
    tempCharGroup.map(char => {
        groupBody += ', \"character'+count+'\":\"'+char+'\"';
        count ++;
    });
    groupBody += ' }';
    console.log('groupBody:', groupBody);

    const res = await fetch('http://192.168.1.65:9001/playermenu/savegroup', {
        method: 'POST',
        body: groupBody
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Group', groupName, 'failed to save');
        } else if (response.status === 200) {
            // refresh page
            window.location.reload(false);
            console.log('Group', groupName, 'saved');
        }
    })
    .catch(err => {
        console.log(err);
    });

    
}

async function apiLoadGroup(groupName) {
    const res = await fetch('http://192.168.1.65:9001/playermenu/loadgroup', {
        method: 'POST',
        body: groupName
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Group', groupName, 'failed to load');
        } else if (response.status === 200) {
            // refresh page
            window.location.reload(false);
            console.log('Group', groupName, 'loaded');
        }
    })
    .catch(err => {
        console.log(err);
    });
}

function apiDeleteGroup(groupName) {
    var proceed = window.confirm("Are you sure you want to proceed? This will delete the group " + groupName);
    if (proceed) {
        apiDeleteGroupAsync(groupName)
    }
}

async function apiDeleteGroupAsync(groupName) {
    const res = await fetch('http://192.168.1.65:9001/playermenu/deletegroup', {
        method: 'POST',
        body: groupName
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Group', groupName, 'failed to delete');
        } else if (response.status === 200) {
            // refresh page
            window.location.reload(false);
            console.log('Group', groupName, 'deleted');
        }
    })
    .catch(err => {
        console.log(err);
    });
}