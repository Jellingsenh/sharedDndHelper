import React from 'react';
import { Add, SaveAs} from '@mui/icons-material';
import {Paper, Stack, Button, TextField, FormControlLabel, Checkbox} from '@mui/material';

export function returnCharacterCreatePopup () {
    console.log('create character menu called')
    
    return (
        <Paper style={{maxHeight: 800, maxWidth: 800, overflow: 'auto', 'backgroundColor':'white'}}>
            <p style={{fontSize: "18px", fontWeight: "bold"}}>Add a character:</p>
            <Stack spacing={2} style={{border: '20px solid white', borderRadius: '5px'}}>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    <TextField color="secondary"
                        focused
                        onChange={addCharName}
                        required
                        id="outlined-required"
                        label="Name"
                    />&nbsp;&nbsp;
                    <TextField color="secondary"
                        focused
                        onChange={addCharRace}
                        required
                        id="outlined-required"
                        label="Race"
                    />&nbsp;&nbsp;
                    <TextField color="secondary"
                        focused
                        onChange={addCharSize}
                        required
                        id="outlined-required"
                        label="Size"
                    />&nbsp;&nbsp;
                    <TextField color="secondary"
                        onChange={addCharStatus}
                        label="Status"
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    <TextField color="ninth"
                        focused
                        onChange={addCharInit}
                        required
                        id="outlined-required"
                        type="number"
                        label="Initiative bonus"
                    />&nbsp;&nbsp;
                    <TextField color="ninth"
                        focused
                        onChange={addCharSpeed}
                        required
                        id="outlined-required"
                        type="number"
                        label="Speed"
                    />&nbsp;&nbsp;
                    <TextField color="third"
                        focused
                        onChange={addCharMaxHp}
                        required
                        id="outlined-required"
                        type="number"
                        label="Max Health"
                    />&nbsp;&nbsp;
                    <TextField color="third"
                        onChange={addCharCurrHp}
                        type="number"
                        label="Current Health"
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    <TextField color="fourth"
                        focused
                        onChange={addCharFort}
                        required
                        id="outlined-required"
                        type="number"
                        label="Fortitude save"
                    />&nbsp;&nbsp;
                    <TextField color="fourth"
                        focused
                        onChange={addCharRef}
                        required
                        id="outlined-required"
                        type="number"
                        label="Reflex save"
                    />&nbsp;&nbsp;
                    <TextField color="fourth"
                        focused
                        onChange={addCharWill}
                        required
                        id="outlined-required"
                        type="number"
                        label="Will save"
                    />&nbsp;&nbsp;
                    <TextField color="eighth"
                        focused
                        onChange={addCharGrapple}
                        required
                        id="outlined-required"
                        type="number"
                        label="Grapple"
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    <TextField color="seventh"
                        focused
                        onChange={addCharAc}
                        required
                        id="outlined-required"
                        type="number"
                        label="Armor class"
                    />&nbsp;&nbsp;
                    <TextField color="seventh"
                        focused
                        onChange={addCharTouch}
                        required
                        id="outlined-required"
                        type="number"
                        label="Touch armor"
                    />&nbsp;&nbsp;
                    <TextField color="seventh"
                        focused
                        onChange={addCharFf}
                        required
                        id="outlined-required"
                        type="number"
                        label="Flat-footed armor"
                    />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormControlLabel control={<Checkbox color="eighth" defaultChecked={false} onChange={addCharNPC}/>} label="NPC" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            
                <TextField fullWidth color="eighth"
                    focused
                    onChange={addCharAttacks}
                    required
                    id="outlined-required"
                    label="Full attack"
                />
                <TextField fullWidth color="sixth"
                    onChange={addCharSpells}
                    label="Spells list"
                />
                <TextField fullWidth color="sixth"
                    onChange={addCharFeats}
                    label="Feats list"
                />
                <TextField fullWidth color="sixth"
                    onChange={addCharSkills}
                    label="Skills list"
                />
                <TextField fullWidth color="sixth"
                    onChange={addCharMagic}
                    label="Magic items"
                />
                <TextField fullWidth color="sixth"
                    onChange={addCharLoot}
                    label="Loot"
                />
                <TextField fullWidth color="sixth"
                    onChange={addCharOther}
                    label="Other"
                />

                <Button color="primary" onClick={createEnterButton} variant="contained" endIcon={<Add />}>
                    Create character! 
                </Button>
            </Stack>
        </Paper>
    );
}

export function returnCharacterEditPopup (currentCharacterFull) {
    var charName = currentCharacterFull.charName
    console.log('Loaded character ' + charName + ' for editing:', currentCharacterFull);

    prepopupateValues(currentCharacterFull)

    return (
        <Paper style={{maxHeight: 800, maxWidth: 800, overflow: 'auto', 'backgroundColor':'white'}}>
            <p style={{fontSize: "18px", fontWeight: "bold"}}>Edit {charName}:</p>
            <Stack spacing={2} style={{border: '20px solid white', borderRadius: '5px'}}>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    <TextField color="secondary"
                        focused
                        id="outlined-required"
                        label="Name"
                        InputProps={{
                            readOnly: true,
                        }}
                        defaultValue={charName}
                    />&nbsp;&nbsp;
                    <TextField color="secondary"
                        focused
                        onChange={addCharRace}
                        required
                        id="outlined-required"
                        label="Race"
                        defaultValue={currentCharacterFull.race}
                    />&nbsp;&nbsp;
                    <TextField color="secondary"
                        focused
                        onChange={addCharSize}
                        required
                        id="outlined-required"
                        label="Size"
                        defaultValue={currentCharacterFull.size}
                    />&nbsp;&nbsp;
                    <TextField color="secondary"
                        focused
                        onChange={addCharStatus}
                        label="Status"
                        defaultValue={currentCharacterFull.statusString}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    <TextField color="ninth"
                        focused
                        onChange={addCharInit}
                        required
                        id="outlined-required"
                        type="number"
                        label="Initiative bonus"
                        defaultValue={currentCharacterFull.initiative}
                    />&nbsp;&nbsp;
                    <TextField color="ninth"
                        focused
                        onChange={addCharSpeed}
                        required
                        id="outlined-required"
                        type="number"
                        label="Speed"
                        defaultValue={currentCharacterFull.speed}
                    />&nbsp;&nbsp;
                    <TextField color="third"
                        focused
                        onChange={addCharMaxHp}
                        required
                        id="outlined-required"
                        type="number"
                        label="Max Health"
                        defaultValue={currentCharacterFull.health}
                    />&nbsp;&nbsp;
                    <TextField color="third"
                        focused
                        onChange={addCharCurrHp}
                        type="number"
                        label="Current Health"
                        defaultValue={currentCharacterFull.currentHealth}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    <TextField color="fourth"
                        focused
                        onChange={addCharFort}
                        required
                        id="outlined-required"
                        type="number"
                        defaultValue={currentCharacterFull.fortSave}
                        label="Fortitude save"
                    />&nbsp;&nbsp;
                    <TextField color="fourth"
                        focused
                        onChange={addCharRef}
                        required
                        id="outlined-required"
                        type="number"
                        label="Reflex save"
                        defaultValue={currentCharacterFull.refSave}
                    />&nbsp;&nbsp;
                    <TextField color="fourth"
                        focused
                        onChange={addCharWill}
                        required
                        id="outlined-required"
                        type="number"
                        label="Will save"
                        defaultValue={currentCharacterFull.willSave}
                    />&nbsp;&nbsp;
                    <TextField color="eighth"
                        focused
                        onChange={addCharGrapple}
                        required
                        id="outlined-required"
                        type="number"
                        label="Grapple"
                        defaultValue={currentCharacterFull.grapple}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    <TextField color="seventh"
                        focused
                        onChange={addCharAc}
                        required
                        id="outlined-required"
                        type="number"
                        label="Armor class"
                        defaultValue={currentCharacterFull.armorClass}
                    />&nbsp;&nbsp;
                    <TextField
                        onChange={addCharTouch}
                        required color="seventh"
                        focused
                        id="outlined-required"
                        type="number"
                        label="Touch armor"
                        defaultValue={currentCharacterFull.touchArmor}
                    />&nbsp;&nbsp;
                    <TextField color="seventh"
                        focused
                        onChange={addCharFf}
                        required
                        id="outlined-required"
                        type="number"
                        label="Flat-footed armor"
                        defaultValue={currentCharacterFull.flatFooted}
                    />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormControlLabel control={<Checkbox color="eighth" defaultChecked={stringToBoolean(currentCharacterFull.npc)} onChange={addCharNPC}/>} label="NPC" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            
                <TextField fullWidth color="eighth"
                    focused
                    onChange={addCharAttacks}
                    required
                    id="outlined-required"
                    label="Full attack"
                    defaultValue={currentCharacterFull.attacksString}
                />
                <TextField fullWidth color="sixth"
                    focused
                    onChange={addCharSpells}
                    label="Spells list"
                    defaultValue={currentCharacterFull.spellsString}
                />
                <TextField fullWidth color="sixth"
                    focused
                    onChange={addCharFeats}
                    label="Feats list"
                    defaultValue={currentCharacterFull.featsString}
                />
                <TextField fullWidth color="sixth"
                    focused
                    onChange={addCharSkills}
                    label="Skills list"
                    defaultValue={currentCharacterFull.skillsString}
                />
                <TextField fullWidth color="sixth"
                    focused
                    onChange={addCharMagic}
                    label="Magic items"
                    defaultValue={currentCharacterFull.magicItemsString}
                />
                <TextField fullWidth color="sixth"
                    focused
                    onChange={addCharLoot}
                    label="Loot"
                    defaultValue={currentCharacterFull.lootString}
                />
                <TextField fullWidth color="sixth"
                    focused
                    onChange={addCharOther}
                    label="Other"
                    defaultValue={currentCharacterFull.otherString}
                />

                <Button color="primary" onClick={editEnterButton} variant="contained" endIcon={<SaveAs />}>
                    Submit changes
                </Button>
            </Stack>
        </Paper>
    );
}

export function returnCharacterViewPopup(currentCharacterFull) {
    var charName = currentCharacterFull.charName
    console.log('Loaded character ' + charName + ' for viewing:', currentCharacterFull);

    prepopupateValues(currentCharacterFull)

    return (
        <Paper style={{maxHeight: 800, maxWidth: 800, overflow: 'auto', 'backgroundColor':'white'}}>
            <p style={{fontSize: "18px", fontWeight: "bold"}}>{charName}:</p>
            <Stack spacing={2} style={{border: '20px solid white', borderRadius: '5px'}}>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    <TextField color="secondary"
                        focused
                        id="outlined-required"
                        label="Name"
                        InputProps={{
                            readOnly: true,
                        }}
                        defaultValue={charName}
                    />&nbsp;&nbsp;
                    <TextField color="secondary"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                        id="outlined-required"
                        label="Race"
                        defaultValue={currentCharacterFull.race}
                    />&nbsp;&nbsp;
                    <TextField color="secondary"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                        id="outlined-required"
                        label="Size"
                        defaultValue={currentCharacterFull.size}
                    />&nbsp;&nbsp;
                    <TextField color="secondary"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                        label="Status"
                        defaultValue={currentCharacterFull.statusString}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    <TextField color="ninth"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                        id="outlined-required"
                        type="number"
                        label="Initiative bonus"
                        defaultValue={currentCharacterFull.initiative}
                    />&nbsp;&nbsp;
                    <TextField color="ninth"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                        id="outlined-required"
                        type="number"
                        label="Speed"
                        defaultValue={currentCharacterFull.speed}
                    />&nbsp;&nbsp;
                    <TextField color="third"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                        id="outlined-required"
                        type="number"
                        label="Max Health"
                        defaultValue={currentCharacterFull.health}
                    />&nbsp;&nbsp;
                    <TextField color="third"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                        type="number"
                        label="Current Health"
                        defaultValue={currentCharacterFull.currentHealth}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    <TextField color="fourth"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                        id="outlined-required"
                        type="number"
                        defaultValue={currentCharacterFull.fortSave}
                        label="Fortitude save"
                    />&nbsp;&nbsp;
                    <TextField color="fourth"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                        id="outlined-required"
                        type="number"
                        label="Reflex save"
                        defaultValue={currentCharacterFull.refSave}
                    />&nbsp;&nbsp;
                    <TextField color="fourth"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                        id="outlined-required"
                        type="number"
                        label="Will save"
                        defaultValue={currentCharacterFull.willSave}
                    />&nbsp;&nbsp;
                    <TextField color="eighth"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                        id="outlined-required"
                        type="number"
                        label="Grapple"
                        defaultValue={currentCharacterFull.grapple}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <div style={{"display": "flex", "flexDirection": "row"}}>
                    <TextField color="seventh"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                        id="outlined-required"
                        type="number"
                        label="Armor class"
                        defaultValue={currentCharacterFull.armorClass}
                    />&nbsp;&nbsp;
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        color="seventh"
                        focused
                        id="outlined-required"
                        type="number"
                        label="Touch armor"
                        defaultValue={currentCharacterFull.touchArmor}
                    />&nbsp;&nbsp;
                    <TextField color="seventh"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                        id="outlined-required"
                        type="number"
                        label="Flat-footed armor"
                        defaultValue={currentCharacterFull.flatFooted}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField color="eighth"
                        focused
                        InputProps={{
                            readOnly: true,
                        }}
                        id="outlined-required"
                        label="NPC"
                        defaultValue={currentCharacterFull.npc}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            
                <TextField fullWidth color="eighth"
                    focused
                    InputProps={{
                        readOnly: true,
                    }}
                    id="outlined-required"
                    label="Full attack"
                    defaultValue={currentCharacterFull.attacksString}
                />
                <TextField fullWidth color="sixth"
                    focused
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Spells list"
                    defaultValue={currentCharacterFull.spellsString}
                />
                <TextField fullWidth color="sixth"
                    focused
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Feats list"
                    defaultValue={currentCharacterFull.featsString}
                />
                <TextField fullWidth color="sixth"
                    focused
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Skills list"
                    defaultValue={currentCharacterFull.skillsString}
                />
                <TextField fullWidth color="sixth"
                    focused
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Magic items"
                    defaultValue={currentCharacterFull.magicItemsString}
                />
                <TextField fullWidth color="sixth"
                    focused
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Loot"
                    defaultValue={currentCharacterFull.lootString}
                />
                <TextField fullWidth color="sixth"
                    focused
                    InputProps={{
                        readOnly: true,
                    }}
                    label="Other"
                    defaultValue={currentCharacterFull.otherString}
                />
            </Stack>
        </Paper>
    );
}

// builder function & api calls:

var tempCharName
var tempCharRace
var tempCharSize
var tempCharNPC = false
var tempCharMaxHp
var tempCharCurrentHp
var tempCharInit
var tempCharAc
var tempCharTouch
var tempCharFf
var tempCharFort
var tempCharRef
var tempCharWill
var tempCharGrapple
var tempCharSpeed
var tempCharAttacks
var tempCharSpells
var tempCharSkills
var tempCharFeats
var tempCharStatus
var tempCharMagicItems
var tempCharLoot
var tempCharOther

function prepopupateValues(currentCharacterFull) {
    tempCharName = currentCharacterFull.charName
    tempCharRace = currentCharacterFull.race
    tempCharSize = currentCharacterFull.size
    tempCharNPC = stringToBoolean(currentCharacterFull.npc)
    tempCharMaxHp = currentCharacterFull.health.toString()
    tempCharCurrentHp = currentCharacterFull.currentHealth.toString()
    tempCharInit = currentCharacterFull.initiative.toString()
    tempCharAc = currentCharacterFull.armorClass.toString()
    tempCharTouch = currentCharacterFull.touchArmor.toString()
    tempCharFf = currentCharacterFull.flatFooted.toString()
    tempCharFort = currentCharacterFull.fortSave.toString()
    tempCharRef = currentCharacterFull.refSave.toString()
    tempCharWill = currentCharacterFull.willSave.toString()
    tempCharGrapple = currentCharacterFull.grapple.toString()
    tempCharSpeed = currentCharacterFull.speed.toString()
    tempCharAttacks = currentCharacterFull.attacksString
    tempCharSpells = currentCharacterFull.spellsString
    tempCharSkills = currentCharacterFull.skillsString
    tempCharFeats = currentCharacterFull.featsString
    tempCharStatus = currentCharacterFull.statusString
    tempCharMagicItems = currentCharacterFull.magicItemsString
    tempCharLoot = currentCharacterFull.lootString
    tempCharOther = currentCharacterFull.otherString
}

function stringToBoolean(string) {
    switch(string){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        default: return Boolean(string);
    }
}

function addCharName(e) {
    tempCharName = e.target.value
    console.log('Name: ' + tempCharName)
}

function addCharRace(e) {
    tempCharRace = e.target.value
}

function addCharSize(e) {
    tempCharSize = e.target.value
}

function addCharStatus(e) {
    tempCharStatus = e.target.value
}

function addCharNPC(e) {
    tempCharNPC = e.target.checked
    // console.log("NPC? " + tempCharNPC)
}

function addCharInit(e) {
    tempCharInit = e.target.value
}

function addCharSpeed(e) {
    tempCharSpeed = e.target.value
}

function addCharMaxHp(e) {
    tempCharMaxHp = e.target.value
}

function addCharCurrHp(e) {
    tempCharCurrentHp = e.target.value
}

function addCharFort(e) {
    tempCharFort = e.target.value
}

function addCharRef(e) {
    tempCharRef = e.target.value
}

function addCharWill(e) {
    tempCharWill = e.target.value
}

function addCharGrapple(e) {
    tempCharGrapple = e.target.value
}

function addCharAc(e) {
    tempCharAc = e.target.value
}

function addCharTouch(e) {
    tempCharTouch = e.target.value
}

function addCharFf(e) {
    tempCharFf = e.target.value
}

function addCharAttacks(e) {
    tempCharAttacks = e.target.value
}

function addCharSpells(e) {
    tempCharSpells = e.target.value
}

function addCharFeats(e) {
    tempCharFeats = e.target.value
}

function addCharSkills(e) {
    tempCharSkills = e.target.value
}

function addCharMagic(e) {
    tempCharMagicItems = e.target.value
}

function addCharLoot(e) {
    tempCharLoot = e.target.value
}

function addCharOther(e) {
    tempCharOther = e.target.value
}

function createEnterButton() {
    //create the character
    
    // null checks
    if (tempCharStatus == null) {
        tempCharStatus = "Normal"
        console.log('Defaulting status to Normal')
    }

    if (tempCharCurrentHp == null) {tempCharCurrentHp = ""}
    if (tempCharAttacks == null) {tempCharAttacks = ""}
    if (tempCharSpells == null) {tempCharSpells = ""}
    if (tempCharSkills == null) {tempCharSkills = ""}
    if (tempCharMagicItems == null) {tempCharMagicItems = ""}
    if (tempCharLoot == null) {tempCharLoot = ""}
    if (tempCharFeats == null) {tempCharFeats = ""}
    if (tempCharOther == null) {tempCharOther = ""}

    // null check on required inputs
    if (tempCharName == null || tempCharRace == null || tempCharSize == null || tempCharMaxHp == null || tempCharInit == null || tempCharAc == null || tempCharTouch == null 
        || tempCharFf == null || tempCharFort == null || tempCharRef == null || tempCharWill == null || tempCharGrapple == null || tempCharSpeed == null) {
        alert('error creating character, some required values are blank')
    } else {
        apiAddCharacter(tempCharName, tempCharRace, tempCharSize, tempCharMaxHp, tempCharCurrentHp, tempCharInit, tempCharAc, tempCharTouch, tempCharFf, tempCharFort, tempCharRef, tempCharWill, tempCharGrapple, 
            tempCharSpeed, tempCharAttacks, tempCharSpells, tempCharSkills, tempCharMagicItems, tempCharLoot, tempCharFeats, tempCharStatus, tempCharOther, tempCharNPC.toString())
    }
}

function editEnterButton() {
    //edit the character

    // null checks
    if (tempCharStatus == null) {
        tempCharStatus = "Normal"
        console.log('Defaulting status to Normal')
    }

    if (tempCharCurrentHp == null) {tempCharCurrentHp = ""}
    if (tempCharAttacks == null) {tempCharAttacks = ""}
    if (tempCharSpells == null) {tempCharSpells = ""}
    if (tempCharSkills == null) {tempCharSkills = ""}
    if (tempCharMagicItems == null) {tempCharMagicItems = ""}
    if (tempCharLoot == null) {tempCharLoot = ""}
    if (tempCharFeats == null) {tempCharFeats = ""}
    if (tempCharOther == null) {tempCharOther = ""}

    // null check on required inputs
    if (tempCharName == null || tempCharRace == null || tempCharSize == null || tempCharMaxHp == null || tempCharInit == null || tempCharAc == null || tempCharTouch == null 
        || tempCharFf == null || tempCharFort == null || tempCharRef == null || tempCharWill == null || tempCharGrapple == null || tempCharSpeed == null) {
        alert('error editing character, some required values are blank')
    } else {
        apiEditCharacter(tempCharName, tempCharRace, tempCharSize, tempCharMaxHp, tempCharCurrentHp, tempCharInit, tempCharAc, tempCharTouch, tempCharFf, tempCharFort, tempCharRef, tempCharWill, tempCharGrapple, 
            tempCharSpeed, tempCharAttacks, tempCharSpells, tempCharSkills, tempCharMagicItems, tempCharLoot, tempCharFeats, tempCharStatus, tempCharOther, tempCharNPC.toString())
    }
}

// API connection functions below:
  
async function apiAddCharacter(charName, race, size, maxHealth, currentHealth, initiativeBonus, armor, touch, flatFooted, fort, ref, will, grapple, 
    speed, attacks, spells, skills, magic, loot, feats, status, other, isNPC) {

    const res = await fetch('http://192.168.1.65:9001/playermenu/addcharacter', {
        method: 'POST',
        body: JSON.stringify({
            "characterName": charName,
            "maxHealth": maxHealth,
            "currentHealth": currentHealth,
            "initiative": initiativeBonus,
            "armorClass": armor,
            "touch": touch,
            "flatFooted": flatFooted,
            "fortSave": fort,
            "refSave": ref,
            "willSave": will,
            "grapple": grapple,
            "speed": speed,
            "attacks": attacks,
            "skills": skills,
            "spells": spells,
            "magicItems": magic,
            "loot": loot,
            "feats": feats,
            "status": status,
            "race": race,
            "size": size,
            "other": other,
            "isNPC": isNPC,
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

async function apiEditCharacter(charName, race, size, maxHealth, currentHealth, initiativeBonus, armor, touch, flatFooted, fort, ref, will, grapple, 
    speed, attacks, spells, skills, magic, loot, feats, status, other, isNPC) {

        const res = await fetch('http://192.168.1.65:9001/playermenu/editcharacter', {
        method: 'POST',
        body: JSON.stringify({
            "characterName": charName,
            "maxHealth": maxHealth,
            "currentHealth": currentHealth,
            "initiative": initiativeBonus,
            "armorClass": armor,
            "touch": touch,
            "flatFooted": flatFooted,
            "fortSave": fort,
            "refSave": ref,
            "willSave": will,
            "grapple": grapple,
            "speed": speed,
            "attacks": attacks,
            "skills": skills,
            "spells": spells,
            "magicItems": magic,
            "loot": loot,
            "feats": feats,
            "status": status,
            "race": race,
            "size": size,
            "other": other,
            "isNPC": isNPC,
        })
    })
    .then((response) => {
        if(response.status === 400){
            console.log('Character', charName, 'does not exist');
        } else if (response.status === 200) {
            console.log('Edited character', charName);
            // refresh page
            window.location.reload(false);
        }
    })
    .catch(err => {
        console.log(err);
    });
}