package com.dnd.helper.restservice.apibase;

import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import org.json.JSONObject;
import org.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "*")
public class ApiBase {
	private Map<String, String> players; // username & isDM
	private Vector<String> bannedPlayers;
	
	ApiBase(){
		players = new HashMap<String, String>();
		bannedPlayers = new Vector<String>();
	}
	
	@GetMapping(value = "/")
	public String getPage() {
		return "Welcome to the D&D 3.5 Combat Assistant!";
	}
	
	@GetMapping(value = "/getplayers")
	public ResponseEntity<String> getPlayers() {
		try {
			return new ResponseEntity<> (new ObjectMapper().writeValueAsString(players), HttpStatus.OK);
		} catch (JsonProcessingException err) {
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
	    } 
	}
	
	@GetMapping(value = "/getbannedplayers")
	public ResponseEntity<String> getBannedPlayers() {
		try {
			return new ResponseEntity<> (new ObjectMapper().writeValueAsString(bannedPlayers), HttpStatus.OK);
		} catch (JsonProcessingException err) {
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
	    } 
	}
	
	@PostMapping(value = "/addplayer")
	//	{
	//	    "username":"testName",
	//	    "isDM":"no"
	//	}
	public ResponseEntity<String> addPlayer(@RequestBody String player) {
		try {
            JSONObject playersJson = new JSONObject(player);
            String name = (String) playersJson.get("username");
            if (bannedPlayers.contains(name)) {
            	System.out.println("Player " + name + " is banned!");
            	return new ResponseEntity<> ("Player " + name + " is banned!", HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS); // 451
            } else if (players.containsKey(name)) {
            	 System.out.println("Player " + name + " already exists.");
            	 return new ResponseEntity<> ("Player " + name + " already exists.", HttpStatus.BAD_REQUEST); // 400
            } else {
            	players.put(name, (String) playersJson.get("isDM"));
            	System.out.println("Player " + name + " added.");
            	return new ResponseEntity<> (new ObjectMapper().writeValueAsString(players), HttpStatus.OK); // 200 -> only a 200 response will enter the game
            }
        } catch (JSONException err) { // client side formatting error
            System.out.println("Exception : "+err.toString());
            return new ResponseEntity<> (err.toString(), HttpStatus.BAD_REQUEST);
        } catch (JsonProcessingException err) { // server side error processing Map object
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
	    } 
		
	}
	
	@PutMapping(value = "/promoteplayer/{name}")
	public ResponseEntity<String> promotePlayer(@PathVariable String name) {
		if (players.containsKey(name)) {
			players.put(name, "yes");
			System.out.println("Player " + name + " promoted to DM.");
			return new ResponseEntity<> ("Player " + name + " promoted to DM.", HttpStatus.OK);
		} else {
			System.out.println("Player " + name + " does not exist.");
			return new ResponseEntity<> ("Player " + name + " does not exist.", HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping(value = "/demoteplayer/{name}")
	public ResponseEntity<String> demotePlayer(@PathVariable String name) {
		if (players.containsKey(name)) {
			players.put(name, "no");
			System.out.println("Player " + name + " demoted.");
			return new ResponseEntity<> ("Player " + name + " demoted.", HttpStatus.OK);
		} else {
			System.out.println("Player " + name + " does not exist.");
			return new ResponseEntity<> ("Player " + name + " does not exist.", HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping(value = "/banplayer/{name}")
	public ResponseEntity<String> banPlayer(@PathVariable String name) {
		try {
			if (players.containsKey(name)) {
				players.remove(name);
				bannedPlayers.add(name);
				System.out.println("Player " + name + " banned!");
				return new ResponseEntity<> (new ObjectMapper().writeValueAsString(bannedPlayers), HttpStatus.OK);
			} else {
				System.out.println("Player " + name + " does not exist.");
				return new ResponseEntity<> ("Player " + name + " does not exist.", HttpStatus.BAD_REQUEST);
			}
		} catch (JsonProcessingException err) {
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@PostMapping(value = "/unbanplayer/{name}")
	public ResponseEntity<String> unBanPlayer(@PathVariable String name) {
		try {
			if (bannedPlayers.contains(name)) {
				bannedPlayers.remove(name);
				System.out.println("Player " + name + " unbanned!");
				return new ResponseEntity<> (new ObjectMapper().writeValueAsString(bannedPlayers), HttpStatus.OK);
			} else {
				System.out.println("Player " + name + " is not banned.");
				return new ResponseEntity<> ("Player " + name + " is not banned.", HttpStatus.BAD_REQUEST);
			}
		} catch (JsonProcessingException err) {
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@PostMapping(value = "/kickplayer/{name}")
	public ResponseEntity<String> kickPlayer(@PathVariable String name) {
		System.out.println("Player " + name + " kicked! (to-do)");
		// kick player??
		return new ResponseEntity<> ("Player " + name + " kicked! (to-do)", HttpStatus.OK);
	}
	
	
	
	
	
	// get all Settings
	// load a Setting (setting includes Hexes, Characters, and Things)
	// new Setting
	// save current Setting
	// remove a Setting
	
	// list all characters in setting
	// add a character
	// play as a character
	// add a thing
	
	// roll initiative
	// DM controls
	
	// draw on  map
	// select hexes from map
	
}
