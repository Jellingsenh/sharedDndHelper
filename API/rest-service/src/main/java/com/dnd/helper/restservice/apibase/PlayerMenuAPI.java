package com.dnd.helper.restservice.apibase;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Objects;
import java.util.Vector;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dnd.helper.restservice.gamedata.DndCharacter;
import com.dnd.helper.restservice.gamedata.GameData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/playermenu")
@CrossOrigin(origins = "*")
public class PlayerMenuAPI {
	private GameData gameData;
	
	public PlayerMenuAPI(){
		gameData = new GameData();
	}
	
	@PostMapping(value = "/addcharacter")
	//	{
	//	"characterName":"",
	//	"maxHealth":"",
	//	"currentHealth":""," -> optional?
	//	"initiative":"",
	//	"armorClass":"",
	//	"touch":"",
	//	"flatFooted":"",
	// 	"fortSave":"",
	// 	"refSave":"",
	// 	"willSave":"",
	// 	"grapple":"",
	// 	"speed":"",
	// 	"attacks":"",
	// 	"skills":"",
	// 	"spells":"",
	// 	"magicItems":"",
	// 	"loot":"",
	// 	"feats":"",
	// 	"other":"",
	//	"race":"",
	//	"size":"",
	//  "isNPC":"false",
	//}
	public ResponseEntity<String> addCharacter(@RequestBody String tempChar) {
		try {
            JSONObject charJson = new JSONObject(tempChar);
            String name = (String) charJson.get("characterName");
            
			if (getAllCharacterNames() != null) {
				if (getAllCharacterNames().contains(name)) {
					System.out.println("Character " + name + " already exists.");
					return new ResponseEntity<> ("Character " + name + " already exists.", HttpStatus.BAD_REQUEST); // 400
				}
			}
           
        	int maxHealth = Integer.parseInt( (String) charJson.get("maxHealth") );
        	int initiative = Integer.parseInt(  (String) charJson.get("initiative") );
        	
        	int ac = Integer.parseInt(  (String) charJson.get("armorClass") );
        	int touch = Integer.parseInt(  (String) charJson.get("touch") );
        	int flatFooted = Integer.parseInt(  (String) charJson.get("flatFooted") );
        	
        	int fortSaveTotal = Integer.parseInt( (String) charJson.get("fortSave") );
        	int refSaveTotal = Integer.parseInt( (String) charJson.get("refSave") );
        	int willSaveTotal = Integer.parseInt( (String) charJson.get("willSave") );
        	
        	int grapple = Integer.parseInt( (String) charJson.get("grapple") );
        	int speed = Integer.parseInt( (String) charJson.get("speed") );
        	
        	String attacks = (String) charJson.get("attacks");
        	
        	boolean isNPC = Boolean.parseBoolean((String) charJson.get("isNPC"));
        	
        	// required values ^
        	// optional values:
        	String race = "Human";
        	String size = "M";
        	String skills = "None";
        	String spells = "None";
        	String status = "Normal";
        	String feats = "None";
        	String magicItems = "None";
        	String loot = "None";
        	String other = "Likes ducks";
 
        	try {
        		race = (String) charJson.get("race");
            } catch (JSONException e) {
            	System.out.println("Defaulting race to Human (Ignored exception = "+e.toString() +")");
            }
        	
        	try {
        		skills = (String) charJson.get("skills");
            } catch (JSONException e) {
            	System.out.println("Defaulting skills to None (Ignored exception = "+e.toString() +")");
            }
        	
        	try {
        		spells = (String) charJson.get("spells");
            } catch (JSONException e) {
            	System.out.println("Defaulting spells to None (Ignored exception = "+e.toString() +")");
            }
        	
        	try {
        		magicItems = (String) charJson.get("magicItems");
            } catch (JSONException e) {
            	System.out.println("Defaulting magicItems to None (Ignored exception = "+e.toString() +")");
            }

        	try {
        		loot = (String) charJson.get("loot");
            } catch (JSONException e) {
            	System.out.println("Defaulting loot to None (Ignored exception = "+e.toString() +")");
            }

        	try {
        		feats = (String) charJson.get("feats");
            } catch (JSONException e) {
            	System.out.println("Defaulting feats to None (Ignored exception = "+e.toString() +")");
            }
        	
        	try {
        		status = (String) charJson.get("status");
            } catch (JSONException e) {
            	System.out.println("Defaulting status to Normal (Ignored exception = "+e.toString() +")");
            }
			
        	try {
        		size = (String) charJson.get("size");
            } catch (JSONException e) {
            	System.out.println("Defaulting size to M (Ignored exception = "+e.toString() +")");
            }
        	
        	try {
        		other = (String) charJson.get("other");
            } catch (JSONException e) {
            	System.out.println("Defaulting other to Likes ducks (Ignored exception = "+e.toString() +")");
            }
             
             DndCharacter dndChar = gameData.createBaseCharacter(name, maxHealth, initiative, ac, touch, flatFooted, race, size, isNPC, 
            		 fortSaveTotal, refSaveTotal, willSaveTotal, grapple, speed, attacks, skills, spells, magicItems, loot, feats, status, other);
             
             try {
	             String currentHealth = (String) charJson.get("currentHealth");
	             if(StringUtils.hasText(currentHealth)) {
	            	 dndChar.setCurrentHealth(Integer.parseInt(currentHealth));
	             }
             } catch (JSONException e) {
            	 System.out.println("Current Health was null, ignoring... (Exception: "+e.toString() +")");
             }
        	
        	addCharacterToGame(dndChar, ""); // "" = add to not in map
        	
        	return new ResponseEntity<> (new ObjectMapper().writeValueAsString(getAllCharacterNames()), HttpStatus.OK); // 200
        	
            
        } catch (JSONException err) { // client side formatting error 
            System.out.println("Exception : "+err.toString());
            return new ResponseEntity<> (err.toString(), HttpStatus.BAD_REQUEST);
        } catch (JsonProcessingException err) { // server side error processing Map object
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
	    } 
		
	}
	
	@PostMapping(value = "/editcharacter")
	//	{
	//	"characterName":"",
	//	"maxHealth":"",
	//	"currentHealth":""," -> optional?
	//	"initiative":"",
	//	"armorClass":"",
	//	"touch":"",
	//	"flatFooted":"",
	// 	"fortSave":"",
	// 	"refSave":"",
	// 	"willSave":"",
	// 	"grapple":"",
	// 	"speed":"",
	// 	"attacks":"",
	// 	"skills":"",
	// 	"spells":"",
	// 	"magicItems":"",
	// 	"loot":"",
	// 	"feats":"",
	// 	"other":"",
	//	"race":"",
	//	"size":"",
	//  "isNPC":"false",
	//}
	public ResponseEntity<String> editCharacter(@RequestBody String tempChar) {
		try {
            JSONObject charJson = new JSONObject(tempChar);
            String name = (String) charJson.get("characterName");
            
			if (getAllCharacterNames() != null) {
				if (!getAllCharacterNames().contains(name)) {
					System.out.println("Character " + name + " does not exist.");
					return new ResponseEntity<> ("Character " + name + " does not exist.", HttpStatus.BAD_REQUEST); // 400
				}
			} else {
				return new ResponseEntity<> ("No characters found", HttpStatus.INTERNAL_SERVER_ERROR); // 500
			}
			
			System.out.println("Editing " + name + "...");
           
        	int maxHealth = Integer.parseInt( (String) charJson.get("maxHealth") );
        	int initiative = Integer.parseInt(  (String) charJson.get("initiative") );
        	
        	int ac = Integer.parseInt(  (String) charJson.get("armorClass") );
        	int touch = Integer.parseInt(  (String) charJson.get("touch") );
        	int flatFooted = Integer.parseInt(  (String) charJson.get("flatFooted") );
        	
        	int fortSaveTotal = Integer.parseInt( (String) charJson.get("fortSave") );
        	int refSaveTotal = Integer.parseInt( (String) charJson.get("refSave") );
        	int willSaveTotal = Integer.parseInt( (String) charJson.get("willSave") );
        	
        	int grapple = Integer.parseInt( (String) charJson.get("grapple") );
        	int speed = Integer.parseInt( (String) charJson.get("speed") );
        	
        	String attacks = (String) charJson.get("attacks");
        	
        	boolean isNPC = Boolean.parseBoolean((String) charJson.get("isNPC"));
        	
        	// required values ^
        	// optional values:
        	String race = "Human";
        	String size = "M";
        	String skills = "None";
        	String spells = "None";
        	String status = "Normal";
        	String feats = "None";
        	String magicItems = "None";
        	String loot = "None";
        	String other = "Likes ducks";
        	int currentHealth = maxHealth;
 
        	try {
        		race = (String) charJson.get("race");
            } catch (JSONException e) {
            	System.out.println("Defaulting race to Human (Ignored exception = "+e.toString() +")");
            }
        	
        	try {
        		skills = (String) charJson.get("skills");
            } catch (JSONException e) {
            	System.out.println("Defaulting skills to None (Ignored exception = "+e.toString() +")");
            }
        	
        	try {
        		spells = (String) charJson.get("spells");
            } catch (JSONException e) {
            	System.out.println("Defaulting spells to None (Ignored exception = "+e.toString() +")");
            }
        	
        	try {
        		magicItems = (String) charJson.get("magicItems");
            } catch (JSONException e) {
            	System.out.println("Defaulting magicItems to None (Ignored exception = "+e.toString() +")");
            }

        	try {
        		loot = (String) charJson.get("loot");
            } catch (JSONException e) {
            	System.out.println("Defaulting loot to None (Ignored exception = "+e.toString() +")");
            }

        	try {
        		feats = (String) charJson.get("feats");
            } catch (JSONException e) {
            	System.out.println("Defaulting feats to None (Ignored exception = "+e.toString() +")");
            }
        	
        	try {
        		status = (String) charJson.get("status");
            } catch (JSONException e) {
            	System.out.println("Defaulting status to Normal (Ignored exception = "+e.toString() +")");
            }
			
        	try {
        		size = (String) charJson.get("size");
            } catch (JSONException e) {
            	System.out.println("Defaulting size to M (Ignored exception = "+e.toString() +")");
            }
        	
        	try {
        		other = (String) charJson.get("other");
            } catch (JSONException e) {
            	System.out.println("Defaulting other to Likes ducks (Ignored exception = "+e.toString() +")");
            }
        	
        	try {
	             currentHealth = Integer.parseInt((String) charJson.get("currentHealth"));
            } catch (JSONException e) {
            	System.out.println("Defaulting currentHealth to maxHealth (Ignored exception = "+e.toString() +")");
            }
             
             if (gameData.editCharacterData(name, maxHealth, currentHealth, initiative, ac, touch, flatFooted, race, size, isNPC, 
            		 fortSaveTotal, refSaveTotal, willSaveTotal, grapple, speed, attacks, skills, spells, magicItems, loot, feats, status, other)) {
            	 return new ResponseEntity<> (new ObjectMapper().writeValueAsString(getAllCharacterNames()), HttpStatus.OK); // 200
             } else {
            	 return new ResponseEntity<> ("Character " + name + " does not exist.", HttpStatus.BAD_REQUEST);
             }
        } catch (JSONException err) { // client side formatting error 
            System.out.println("Exception : "+err.toString());
            return new ResponseEntity<> (err.toString(), HttpStatus.BAD_REQUEST);
        } catch (JsonProcessingException err) { // server side error processing Map object
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
	    } 
		
	}
	
	@PostMapping(value = "/editcharacterhealth")
	//	{
	//	"characterName":"",
	//	"currentHealth":"",
	//}
	public ResponseEntity<String> editCharacterHealth(@RequestBody String tempChar) {
		try {
            JSONObject charJson = new JSONObject(tempChar);
            String name = (String) charJson.get("characterName");
            
			if (getAllCharacterNames() != null) {
				if (!getAllCharacterNames().contains(name)) {
					System.out.println("Character " + name + " does not exist.");
					return new ResponseEntity<> ("Character " + name + " does not exist.", HttpStatus.BAD_REQUEST); // 400
				}
			} else {
				return new ResponseEntity<> ("No characters found", HttpStatus.INTERNAL_SERVER_ERROR); // 500
			}
			
			System.out.println("Editing " + name + "\'s health...");
			int currentHealth = Integer.parseInt((String) charJson.get("currentHealth"));
			gameData.updateCharacterCurrentHealth(name, currentHealth);
			
			return new ResponseEntity<> (new ObjectMapper().writeValueAsString("Updated " + name), HttpStatus.OK); // 200
		} catch (JsonProcessingException err) { // server side error processing Map object
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
	    } 
		
	}
	
	@PostMapping(value = "/duplicatecharacter")
	//	{
	//	"characterName":"",
	//}
	public ResponseEntity<String> duplicateCharacterEndpoint(@RequestBody String tempChar) {
		try {
            JSONObject charJson = new JSONObject(tempChar);
            String name = (String) charJson.get("characterName");
            
			if (getAllCharacterNames() != null) {
				if (!getAllCharacterNames().contains(name)) {
					System.out.println("Character " + name + " does not exist.");
					return new ResponseEntity<> ("Character " + name + " does not exist.", HttpStatus.BAD_REQUEST); // 400
				}
			} else {
				return new ResponseEntity<> ("No characters found", HttpStatus.INTERNAL_SERVER_ERROR); // 500
			}
			
			String dupedCharName = gameData.duplicateCharacter(name);
           
			return new ResponseEntity<> ("Character " + name + " duplicated as " + dupedCharName +  ".", HttpStatus.OK); // 200

        } catch (JSONException err) { // client side formatting error 
            System.out.println("Exception : "+err.toString());
            return new ResponseEntity<> (err.toString(), HttpStatus.BAD_REQUEST);
        }
		
	}

	@GetMapping(value = "/getcharacter/{characterName}")
	public ResponseEntity<String> getCharacterEndpoint(@PathVariable String characterName) {
		try {
			DndCharacter tempD = gameData.getCharacterInAnyMap(characterName);
			if (tempD != null) {
				return new ResponseEntity<> (new ObjectMapper().writeValueAsString(tempD), HttpStatus.OK); // 200
			} else {
				return new ResponseEntity<> ("Character " + characterName + " does not exist.", HttpStatus.BAD_REQUEST);
			}
		} catch (JsonProcessingException err) {
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
	    } 
	}
	
	@PostMapping(value = "/removecharacter")
//	{
//		"characterName":""
//	}
	public ResponseEntity<String> removeCharacter(@RequestBody String characterName) {
		try {
			Vector<DndCharacter> inMapChars = getCharacters(true);
			Vector<DndCharacter> notInMapChars = getCharacters(false);
			
			if (inMapChars != null) {
				for (DndCharacter d: inMapChars) { // in map
					if (Objects.equals(d.getCharName(), characterName)) {
						inMapChars.remove(d);
						System.out.println("Removed character " + characterName);
						return new ResponseEntity<> (new ObjectMapper().writeValueAsString(getAllCharacterNames()), HttpStatus.OK); // 200
					}
				}
			}
			if (notInMapChars != null) {
				for (DndCharacter d : notInMapChars) { // not in map
					if (Objects.equals(d.getCharName(), characterName)) {
						notInMapChars.remove(d);
						System.out.println("Removed character " + characterName);
						return new ResponseEntity<> (new ObjectMapper().writeValueAsString(getAllCharacterNames()), HttpStatus.OK); // 200
					}
				}
			}
			return new ResponseEntity<> ("Character " + characterName + " does not exist.", HttpStatus.BAD_REQUEST);
		} catch (JSONException err) { // client side formatting error 
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.BAD_REQUEST);
	    } catch (JsonProcessingException err) { // server side error processing Map object
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
	    }
	}
	
	@GetMapping(value = "/getcharacters/{inMap}")
	public ResponseEntity<String> getCharsactersAPI(@PathVariable boolean inMap) {
		try {
			return new ResponseEntity<> (new ObjectMapper().writeValueAsString(getCharacterNames(inMap)), HttpStatus.OK);
		} catch (JsonProcessingException err) {
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
	    } 
	}
	
	@GetMapping(value = "/getpcs")
	public ResponseEntity<String> getPCsEndpoint() {
		try {
			return new ResponseEntity<> (new ObjectMapper().writeValueAsString(getPCs()), HttpStatus.OK);
		} catch (JsonProcessingException err) {
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR);
	    } 
	}
	
	@PostMapping(value = "/movetomap")
//	{
//		"characterName":""
//	}
	public ResponseEntity<String> moveCharacterToMap(@RequestBody String characterName) {
		try {
			Vector<DndCharacter> inMapChars = getCharacters(true);
			Vector<DndCharacter> notInMapChars = getCharacters(false);
			
			
			if (notInMapChars != null) {
				for (DndCharacter d : notInMapChars) { // not in map
					if (Objects.equals(d.getCharName(), characterName)) {
						if (inMapChars != null) {
							inMapChars.add(d);
							notInMapChars.remove(d);
						}
						gameData.addNewCharacterToInitMapUnrolled(d);
						System.out.println("Moved character " + characterName + " into the map.");
						return new ResponseEntity<> (new ObjectMapper().writeValueAsString(getAllCharacterNames()), HttpStatus.OK); // 200
					}
				}
				return new ResponseEntity<> ("Character " + characterName + " is not not in the map.", HttpStatus.BAD_REQUEST);
			}
		
			return new ResponseEntity<> ("Character " + characterName + " loading error.", HttpStatus.BAD_REQUEST);
		} catch (JSONException err) { // client side formatting error 
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.BAD_REQUEST);
	    } catch (JsonProcessingException err) { // server side error processing Map object
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
	    }
	}
	
	@PostMapping(value = "/removefrommap")
//	{
//		"characterName"
//	}
	public ResponseEntity<String> removeCharacterFromMap(@RequestBody String characterName) {
		try {
			Vector<DndCharacter> inMapChars = getCharacters(true);
			Vector<DndCharacter> notInMapChars = getCharacters(false);
			
			
			if (inMapChars != null) {
				for (DndCharacter d : inMapChars) { // not in map
					if (Objects.equals(d.getCharName(), characterName)) {
						if (notInMapChars != null) {
							notInMapChars.add(d);
							inMapChars.remove(d);
						}
						
						System.out.println("Moved character " + characterName + " out of the map.");
						return new ResponseEntity<> (new ObjectMapper().writeValueAsString(getAllCharacterNames()), HttpStatus.OK); // 200
					}
				}
				return new ResponseEntity<> ("Character " + characterName + " is not in the map.", HttpStatus.BAD_REQUEST);
			}
		
			return new ResponseEntity<> ("Character " + characterName + " loading error.", HttpStatus.BAD_REQUEST);
		} catch (JSONException err) { // client side formatting error 
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.BAD_REQUEST);
	    } catch (JsonProcessingException err) { // server side error processing Map object
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
	    }
	}
	
	@PostMapping(value = "/rollinitiative") // list of totals from PCs
//	{
//	  "jim":"10",
//	  "john":"11",
//  }
	public ResponseEntity<String> rollInitiativeEndpoint(@RequestBody String pcInitiatives) {
		Map<DndCharacter, Integer> pcInitMap = new HashMap<>();
		
		try {
			JSONObject charJson = new JSONObject(pcInitiatives);
			
			for (DndCharacter d : getCharacters(true)) {
				if (!d.isNpc()) { // if the character is a PC
					int initRoll = Integer.valueOf( (String) charJson.get(d.getCharName()));	
					pcInitMap.put(d, initRoll);
				}
			}
			
			Vector<Map<String, String>> initNames = gameData.rollInitiative(pcInitMap);
					
			return new ResponseEntity<> (new ObjectMapper().writeValueAsString(initNames), HttpStatus.OK);
		} catch (JSONException err) { // client side formatting error 
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.BAD_REQUEST);
	    } catch (JsonProcessingException err) { // server side error processing Map object
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
	    }		
	}
	
	@GetMapping(value = "/getinitiative")
	public ResponseEntity<String> getInitiativeEndpoint() {
		try {
			return new ResponseEntity<> (new ObjectMapper().writeValueAsString(gameData.getInitiativeOrder()), HttpStatus.OK);
	    } catch (JsonProcessingException err) { // server side error processing Map object
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
	    }		
	}
	
	@PostMapping(value = "/changeinitiative") // list of totals from PCs/NPCs
//	{
//	  "jim":"10",
//	  "john":"11",
//  }
	public ResponseEntity<String> changeInitiativeEndpoint(@RequestBody String newInitiatives) {
		
		try {
			JSONObject initJson = new JSONObject(newInitiatives);
			Iterator<String> keys = initJson.keys();
			
			while(keys.hasNext()) {
			    String key = keys.next();
			    System.out.println("character: " + key); 
			    if (getAllCharacterNames().contains(key)) {
		    		int tempNewInit = Integer.valueOf( (String) initJson.get(key) );
		    		System.out.println("tempNewInit: " + tempNewInit);
		    		gameData.updateSingleCharacterInitiative(key, tempNewInit);
		    	}
			}
			
			gameData.changeInitiativeOrder();
			
			return new ResponseEntity<> (new ObjectMapper().writeValueAsString(gameData.getInitiativeOrder()), HttpStatus.OK);
//			gameData.setInitiativeOrder(initNames);
		} catch (JSONException err) { // client side formatting error 
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.BAD_REQUEST);
	    } catch (JsonProcessingException err) { // server side error processing Map object
	        System.out.println("Exception : "+err.toString());
	        return new ResponseEntity<> (err.toString(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
	    }		
	}
	
	@PostMapping(value = "/savecharacter") 
//	{
//	  "john"
//  }
	public ResponseEntity<String> saveCharacterEndpoint(@RequestBody String charName) {
		
		if (saveCharacterToFile(gameData.getCharacterInAnyMap(charName))) {
			return new ResponseEntity<> (charName + " saved", HttpStatus.OK);
		} else {
			return new ResponseEntity<> (charName + " saving error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value = "/getcharactersaves")
	public ResponseEntity<String> loadSavedCharacterNamesEndpoint() {
		
		try {
			return new ResponseEntity<> (new ObjectMapper().writeValueAsString(loadCharacterNames()), HttpStatus.OK);
		} catch (JsonProcessingException e) {
			return new ResponseEntity<> ("Error getting game saves", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(value = "/loadcharacter") // loading adds character not in map
//	{
//	  "clarence"
//  }
	public ResponseEntity<String> loadCharacterEndpoint(@RequestBody String charName) {
		
		if (loadCharacterFromFile(charName)) {
			return new ResponseEntity<> (charName + " loaded (added not in the map)", HttpStatus.OK);
		} else {
			return new ResponseEntity<> (charName + " loading error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(value = "/deletecharacter") 
//	{
//	  "ben"
//  }
	public ResponseEntity<String> deleteCharacterEndpoint(@RequestBody String charName) {
		
		if (deleteCharacterFile(charName)) {
			return new ResponseEntity<> (charName + " deleted", HttpStatus.OK);
		} else {
			return new ResponseEntity<> (charName + " deletion error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(value = "/savegame") 
//	{
//	  "game1"
//  }
	public ResponseEntity<String> saveGameStateEndpoint(@RequestBody String gameName) {
		
		if (saveGameState(gameName)) {
			return new ResponseEntity<> (gameName + " saved", HttpStatus.OK);
		} else {
			return new ResponseEntity<> (gameName + " saving error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value = "/getgamesaves") 
	public ResponseEntity<String> loadSavedGameNamesEndpoint() {
		
		try {
			return new ResponseEntity<> (new ObjectMapper().writeValueAsString(loadSavedGameNames()), HttpStatus.OK);
		} catch (JsonProcessingException e) {
			return new ResponseEntity<> ("Error getting game saves", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(value = "/loadgame") 
//	{
//	  "game1"
//  }
	public ResponseEntity<String> loadGameStateEndpoint(@RequestBody String gameName) {
		
		if (loadGameState(gameName)) {
			return new ResponseEntity<> (gameName + " loaded", HttpStatus.OK);
		} else {
			return new ResponseEntity<> (gameName + " loading error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping(value = "/deletegame") 
//	{
//	  "game1"
//  }
	public ResponseEntity<String> deleteGameStateEndpoint(@RequestBody String gameName) {
		
		if (deleteGameState(gameName)) {
			return new ResponseEntity<> (gameName + " deleted", HttpStatus.OK);
		} else {
			return new ResponseEntity<> (gameName + " deletion error", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	// ----- ----- ^ API STUFF ----- ----- v GameData stuff ----- -----
	
	
	public Vector<DndCharacter> getCharacters(boolean inMap) {
		if (!inMap) {
			return gameData.getCharactersNotInMap();
		} else {
			return gameData.getCharactersInMap();
		}
	}
	
	public Vector<String> getCharacterNames(boolean inMap) {
		Vector<String> result = new Vector<>();
		
		if (getCharacters(inMap) != null) {
			for (DndCharacter d: getCharacters(inMap)) {
				result.add(d.getCharName());
			}
		}
		
		return result;
	}
	
	public Vector<String> getAllCharacterNames() {
		Vector<String> result = getCharacterNames(true);
		result.addAll(getCharacterNames(false));
		return result;
	}
	
	public void addCharacterToGame(DndCharacter c, String mapLocation) { // mapLocation = "" for not in map
		if(StringUtils.hasText(mapLocation)) {
			gameData.addCharacterInMap(c, mapLocation);
		} else {
			gameData.addCharacterNotInMap(c);
		}
		
	}
	
	public Vector<String> getPCs() {
		Vector<String> result = new Vector<>();
		
		Vector<DndCharacter> inMapChars = getCharacters(true);
		if (inMapChars != null) {
			for (DndCharacter d: inMapChars) { // in map
				if (!d.isNpc()) {
					result.add(d.getCharName());
				}
			}
		}
		
		return result;
	}
	
	// Save to text file:
	
	public Vector<String> loadCharacterNames() {
		Vector<String> charList = new Vector<>();
		
        File f = new File("gameSaves/Characters");
        File[] listOfFiles = f.listFiles();
        
        if (listOfFiles != null) {
	        for (int i = 0; i < listOfFiles.length; i++) {
	        	  if (listOfFiles[i].isFile()) {
	        		  String charFileName = listOfFiles[i].getName();
	        	    System.out.println("File " + charFileName);
	        	    charList.add(charFileName.substring(0, charFileName.length()-4));
	        	  } else if (listOfFiles[i].isDirectory()) {
	        	    System.out.println("Directory " + listOfFiles[i].getName());
	        	  }
	        }
        }
		
		return charList;
	}

	public boolean loadCharacterFromFile(String charName) {
		try {	
			String filename = "gameSaves/Characters/" + charName + ".txt";
			FileInputStream file = new FileInputStream(filename);
	        ObjectInputStream in = new ObjectInputStream(file);
	          
	        // Method for deserialization of object
	        DndCharacter loadedCharacter = (DndCharacter) in.readObject();
	          
	        in.close();
	        file.close();
	        
	        if (getAllCharacterNames() != null) {
				if (getAllCharacterNames().contains(loadedCharacter.getCharName())) {
					System.out.println("Character " + loadedCharacter.getCharName() + " already exists. Cannot load from file :(");
					return false;
				}
			}
	        
	        gameData.addCharacterNotInMap(loadedCharacter);
	        System.out.println("Loaded character: " + charName);
	        return true;
	        
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return false;

	}
	
	public boolean saveCharacterToFile(DndCharacter saveCharacter) {
		
		try {	
			String filename = saveCharacter.getCharName() + ".txt";
			String filepath = "gameSaves/Characters/" + filename;
			FileOutputStream fileOut = new FileOutputStream(filepath);
	        ObjectOutputStream objectOut = new ObjectOutputStream(fileOut);
			objectOut.writeObject(saveCharacter);
		
	        objectOut.close();
	        System.out.println("character succesfully saved to file: " + filename);
	        return true;
        
        } catch (Exception e) {
			e.printStackTrace();
		}
		
		return false;
		
		
	}
	
	public boolean deleteCharacterFile(String charName) {
		
		File myObj = new File("gameSaves/Characters/" + charName + ".txt"); 
	    if (myObj.delete()) { 
	      System.out.println("Deleted the file: " + myObj.getName());
	    } else {
	      System.out.println("Failed to delete the file.");
	      return false;
	    } 
		
		return true; // return true if success
	}
	
	public Vector<String> loadSavedGameNames() {
		Vector<String> gamesList = new Vector<>();
		
        File f = new File("gameSaves/GameStates");
        File[] listOfFiles = f.listFiles();
        
        if (listOfFiles != null) {
	        for (int i = 0; i < listOfFiles.length; i++) {
	        	  if (listOfFiles[i].isFile()) {
	        		  String gameFileName = listOfFiles[i].getName();
	        	    System.out.println("File " + gameFileName);
	        	    gamesList.add(gameFileName.substring(0, gameFileName.length()-4));
	        	  } else if (listOfFiles[i].isDirectory()) {
	        	    System.out.println("Directory " + listOfFiles[i].getName());
	        	  }
	        }
        }
		
		return gamesList;
	}

	public boolean loadGameState(String gameName) {
		try {	
			String filename = "gameSaves/GameStates/" + gameName + ".txt";
			FileInputStream file = new FileInputStream(filename);
	        ObjectInputStream in = new ObjectInputStream(file);
	          
	        // Method for deserialization of object
	        GameData loadedGame = (GameData) in.readObject();
	          
	        in.close();
	        file.close();
	        
	        this.gameData = loadedGame;
	        System.out.println("Loaded game " + gameName);
	        return true;
	        
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return false;

	}
	
	public boolean saveGameState(String saveAsName) {
		
		try {	
			String filename = saveAsName + ".txt";
			String filepath = "gameSaves/GameStates/" + filename;
			FileOutputStream fileOut = new FileOutputStream(filepath);
	        ObjectOutputStream objectOut = new ObjectOutputStream(fileOut);
			objectOut.writeObject(gameData);
		
	        objectOut.close();
	        System.out.println("game state succesfully saved to file: " + filename);
	        return true;
        
        } catch (Exception e) {
			e.printStackTrace();
		}
		
		return false;
		
		
	}
	
	public boolean deleteGameState(String gameName) {
		
		File myObj = new File("gameSaves/GameStates/" + gameName + ".txt"); 
	    if (myObj.delete()) { 
	      System.out.println("Deleted the file: " + myObj.getName());
	    } else {
	      System.out.println("Failed to delete the file.");
	      return false;
	    } 
		
		return true; // return true if success
	}
	
	// dm time controls?
	
//	public void addAllies (DndCharacter c, Vector<String> allies) {
//		
//	}
//	
//	public void removeAllies (DndCharacter c, Vector<String> allies) {
//		
//	}
	
}
