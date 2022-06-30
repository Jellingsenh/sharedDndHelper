import React from 'react';

import {List, Paper, Button, TextField, Stack} from '@mui/material';
import { AccessTime, CalendarViewMonth, MoreTime, Restore, Timer, WbSunny } from '@mui/icons-material';

class DungeonMasterOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        timeString: ""
    };

    this.getTime.bind(this);
    this.getTime();
  }

  getTime = async () => {
      const res = await  fetch('http://YOUR_URL_HERE:9001/playermenu/gettimestring', {
          method: 'GET',
      })
      .then((response) => {
          // console.log(response)
          return response.text()
      })
      .then((response) => {
          // console.log(response)
          this.setState({
              timeString: response,
          });
      })
      .catch(err => {
          console.log(err);
      });
  }

  render() {
    return (
      
      <div style={{width:'80%', "display": "flex", "flexDirection": "column", resizeMode: 'center'}}>
        <h3>Dungeon Master Options (only time settings for now)</h3>
        <TextField color="dmblue"
            focused
            InputProps={{
                readOnly: true,
                style: { fontSize: 28, color: '#283593' },
            }}
            id="outlined"
            label="Time"
            value={this.state.timeString}
        />&nbsp;
        <Stack spacing={1} >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
            <p>a pulled wagon can travel 16 miles per day&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <TextField color="sixth"
                onChange={addRounds}
                style={{width:'140%', left:'-20%'}}
                id="outlined-required"
                type="number"
                label="Add rounds (can be negative)"
            />
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {'a light horse can travel 48 miles per day'}</p>
          </div>
          <Button color="deeppurp" style={{color:"white", textTransform: 'none', width: '20%', left:'40%'}} onClick={() =>submitRounds()} variant="contained" endIcon={<Timer />}>
              Submit rounds
          </Button>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
          <p>30 ft walk = 3 miles per hour</p>
            <TextField color="sixth"
                onChange={addMinutes}
                style={{width:'140%', left:'-20%'}}
                id="outlined-required"
                type="number"
                label="Add minutes (can be negative)"
            />
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {'a rowboat can travel 15 miles per day'}</p>
          </div>
          <Button color="deeppurp" style={{color:"white", textTransform: 'none', width: '20%', left:'40%'}} onClick={() =>submitMinutes()} variant="contained" endIcon={<MoreTime />}>
              Submit minutes
          </Button>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
            <p>30 ft hustle = 6 miles in an hour&nbsp;&nbsp;</p>
            <TextField color="sixth"
                onChange={addHours}
                style={{width:'140%', left:'-20%'}}
                id="outlined-required"
                type="number"
                label="Add hours (can be negative)"
            />
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {'a galley can travel 96 miles per day (3.5 knots)'}</p>
          </div>
          <Button color="deeppurp" style={{color:"white", textTransform: 'none', width: '20%', left:'40%'}} onClick={() =>submitHours()} variant="contained" endIcon={<AccessTime />}>
              Submit hours
          </Button>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
            <p>30 ft walk = 24 miles per day</p>
            <TextField color="sixth"
                onChange={addDays}
                style={{width:'140%', left:'-20%'}}
                id="outlined-required"
                type="number"
                label="Add days (can be negative)"
            />
            <p style={{fontSize:'14px'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            a modern ship can travel 552 miles per day (20 knots)</p>
          </div>
          <Button color="deeppurp" style={{color:"white", textTransform: 'none', width: '20%', left:'40%'}} onClick={() =>submitDays()} variant="contained" endIcon={<WbSunny />}>
              Submit days
          </Button>
          <TextField color="sixth"
              onChange={addYears}
              style={{width:'46%', left: '27%'}}
              id="outlined-required"
              type="number"
              label="Add years (use this to determine your campaign's millennium)"
          />
          <Button color="deeppurp" style={{color:"white", textTransform: 'none', width: '20%', left:'40%'}} onClick={() =>submitYears()} variant="contained" endIcon={<CalendarViewMonth />}>
              Submit years
          </Button>&nbsp;
          <Button color="primary" style={{color:"white", textTransform: 'none', width: '70%', left:'15%'}} onClick={() =>resetTime()} variant="contained" endIcon={<Restore />}>
              Reset time
          </Button>
        </Stack>
      </div>

    );
  }

}

export default DungeonMasterOptions;

var roundsToAdd
var minutesToAdd
var hoursToAdd
var daysToAdd
var yearsToAdd

function addRounds(e) {
  roundsToAdd = e.target.value
  // console.log('rounds to add:', roundsToAdd)
}

async function submitRounds() {
  // console.log('rounds to add:', roundsToAdd)
  if (roundsToAdd >= 0 ) {
    await fetch('http://YOUR_URL_HERE:9001/playermenu/addrounds', {
        method: 'POST',
        body: roundsToAdd
    })
    .catch(err => {
        console.log(err);
    });
  } else {
    await fetch('http://YOUR_URL_HERE:9001/playermenu/subtractrounds', {
        method: 'POST',
        body: roundsToAdd*-1
    })
    .catch(err => {
        console.log(err);
    });
  }
  // refresh page
  window.location.reload(false);
}

function addMinutes(e) {
  minutesToAdd = e.target.value
}

async function submitMinutes() {
  if (minutesToAdd >= 0 ) {
    await fetch('http://YOUR_URL_HERE:9001/playermenu/addminutes', {
        method: 'POST',
        body: minutesToAdd
    })
    .catch(err => {
        console.log(err);
    });
  } else {
    await fetch('http://YOUR_URL_HERE:9001/playermenu/subtractminutes', {
        method: 'POST',
        body: minutesToAdd*-1
    })
    .catch(err => {
        console.log(err);
    });
  }
  // refresh page
  window.location.reload(false);
}

function addHours(e) {
  hoursToAdd = e.target.value
}

async function submitHours() {
  if (hoursToAdd >= 0 ) {
    await fetch('http://YOUR_URL_HERE:9001/playermenu/addhours', {
        method: 'POST',
        body: hoursToAdd
    })
    .catch(err => {
        console.log(err);
    });
  } else {
    await fetch('http://YOUR_URL_HERE:9001/playermenu/subtracthours', {
        method: 'POST',
        body: hoursToAdd*-1
    })
    .catch(err => {
        console.log(err);
    });
  }
  // refresh page
  window.location.reload(false);
}

function addDays(e) {
  daysToAdd = e.target.value
}

async function submitDays() {
  if (daysToAdd >= 0 ) {
    await fetch('http://YOUR_URL_HERE:9001/playermenu/adddays', {
        method: 'POST',
        body: daysToAdd
    })
    .catch(err => {
        console.log(err);
    });
  } else {
    await fetch('http://YOUR_URL_HERE:9001/playermenu/subtractdays', {
        method: 'POST',
        body: daysToAdd*-1
    })
    .catch(err => {
        console.log(err);
    });
  }
  // refresh page
  window.location.reload(false);
}

function addYears(e) {
  yearsToAdd = e.target.value
}

async function submitYears() {
  if (yearsToAdd >= 0 ) {
    await fetch('http://YOUR_URL_HERE:9001/playermenu/addyears', {
        method: 'POST',
        body: yearsToAdd
    })
    .catch(err => {
        console.log(err);
    });
  } else {
    await fetch('http://YOUR_URL_HERE:9001/playermenu/subtractyears', {
        method: 'POST',
        body: yearsToAdd*-1
    })
    .catch(err => {
        console.log(err);
    });
  }
  // refresh page
  window.location.reload(false);
}

async function resetTime() {
  await fetch('http://YOUR_URL_HERE:9001/playermenu/resettime', {
      method: 'GET',
  })
  .catch(err => {
      console.log(err);
  });
  // refresh page
  window.location.reload(false);
}
