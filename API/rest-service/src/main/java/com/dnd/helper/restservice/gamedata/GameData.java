package com.dnd.helper.restservice.gamedata;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Vector;

import org.json.JSONObject;

// Store/Load Setting here (class name is GameData)

public class GameData implements Serializable {
	//default serialVersion id
    private static final long serialVersionUID = 1L;
	
//	private Vector<Hex> hexes = null;
	private Vector<DndCharacter> charactersNotInMap = null;
	private Vector<DndCharacter> charactersInMap = null;
	private Map<DndCharacter, Integer> baseCharacterInits = null;
	private Vector<Map<String, String>> initiativeOrder = null;
	private String currentCharacterName; // for initiative order
	private String nextCharacterName; // for initiative order
	
	private int time = 0; // time = seconds since beginning
	
	public GameData() {
		charactersNotInMap = new Vector<>();
		charactersInMap = new Vector<>();
	}
	
	public DndCharacter getCharacterInAnyMap(String characterName) {
		Vector<DndCharacter> inMapChars = getCharactersInMap();
		if (inMapChars != null) {
			for (DndCharacter d: inMapChars) { // in map
				if (Objects.equals(d.getCharName(), characterName)) {
					System.out.println("Found character " + characterName);
					return d;
				}
			}
		}
		
		Vector<DndCharacter> notInMapChars = getCharactersNotInMap();
		if (notInMapChars != null) {
			for (DndCharacter d : notInMapChars) { // not in map
				if (Objects.equals(d.getCharName(), characterName)) {
					System.out.println("Found character " + characterName);
					return d;
				}
			}
		}
		
		System.out.println("Did not find character " + characterName);
		return null;
	}

	public Vector<DndCharacter> getCharactersInMap() {
		return charactersInMap;
	}

	public void addCharacterInMap(DndCharacter character, String mapLocation) {
//		character.setMapLocationId(mapLocation);
		charactersInMap.add(character);
		System.out.println("Character " + character.getCharName() + " added (in map, id = " + mapLocation + ").");
	}
	
	public Vector<DndCharacter> getCharactersNotInMap() {
		return charactersNotInMap;
	}

	public void addCharacterNotInMap(DndCharacter character) {
		charactersNotInMap.add(character);
		System.out.println("Character " + character.getCharName() + " added (not in map).");
	}
	
	public String duplicateCharacter(String charToDupeName) { // return duplicated name 
		int count = 1;
		while (true) {
			count++;
			String newChar = charToDupeName +  Integer.toString(count);
			if (getCharacterInAnyMap(newChar) == null) { // new char does not exist
				try {
					// serialize & de-serialize
					ByteArrayOutputStream bos = new ByteArrayOutputStream();
					ObjectOutputStream oos = new ObjectOutputStream(bos);
					
					DndCharacter toBeDuped = getCharacterInAnyMap(charToDupeName);
					oos.writeObject(toBeDuped);
					
					oos.flush();
					oos.close();
					bos.close();
					byte[] byteData = bos.toByteArray();
					ByteArrayInputStream bais = new ByteArrayInputStream(byteData);
					
					DndCharacter duped = (DndCharacter) new ObjectInputStream(bais).readObject();
					duped.setCharName(newChar);
					
					addCharacterNotInMap(duped);
					System.out.println("Duplicated " + charToDupeName + " to " + newChar);
					return newChar;
					
				} catch (ClassNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return null;
			}
		}
	}
	
	public DndCharacter createBaseCharacter(String name, int maxHealth, int initiative, int ac, int touch, int flatFooted, String race, String size, boolean isNPC, 
			int fortSave, int refSave, int willSave, int grapple, int speed, String attacks, String skills, String spells, String magicItems, String loot, String feats, String status, String other) {
		
		DndCharacter c = new DndCharacter(name);
		c.setHealth(maxHealth);
		c.setCurrentHealth(maxHealth);
		c.setInitiative(initiative);
		c.setArmorClass(ac);
		c.setTouchArmor(touch);
		c.setFlatFooted(flatFooted);
		c.setRace(race);
		c.setSize(size);
		c.setNpc(isNPC);
		c.setFortSave(fortSave);
		c.setRefSave(refSave);
		c.setWillSave(willSave);
		c.setSpeed(speed);
		c.attacksString = attacks;
		c.skillsString = skills;
		c.spellsString = spells;
		c.magicItemsString = magicItems;
		c.lootString = loot;
		c.featsString = feats;
		c.statusString = status;
		c.otherString = other;
		c.grapple = grapple;
				
		return c;
	}
	
	public boolean editCharacterData(String name, int maxHealth, int currHealth, int initiative, int ac, int touch, int flatFooted,
			String race, String size, boolean isNPC, int fortSaveTotal, int refSaveTotal, int willSaveTotal,
			int grapple, int speed, String attacks, String skills, String spells, String magicItems, String loot,
			String feats, String status, String other) {
		
		DndCharacter editChar = getCharacterInAnyMap(name);
		if (editChar != null) {
			editChar.setHealth(maxHealth);
			editChar.setCurrentHealth(currHealth);
			editChar.setInitiative(initiative);
			editChar.setArmorClass(ac);
			editChar.setTouchArmor(touch);
			editChar.setFlatFooted(flatFooted);
			editChar.setRace(race);
			editChar.setSize(size);
			editChar.setNpc(isNPC);
			editChar.setFortSave(fortSaveTotal);
			editChar.setRefSave(refSaveTotal);
			editChar.setWillSave(willSaveTotal);
			editChar.setSpeed(speed);
			editChar.attacksString = attacks;
			editChar.skillsString = skills;
			editChar.spellsString = spells;
			editChar.magicItemsString = magicItems;
			editChar.lootString = loot;
			editChar.featsString = feats;
			editChar.statusString = status;
			editChar.otherString = other;
			editChar.grapple = grapple;
			
			//now edit initiative (if necessary)
			for (Map<String, String> charac : getInitiativeOrder()) {
				if (charac.get("name").equals(name)) {
					System.out.println("Character Update for " + name + " complete. Updating initiative map");
					charac.put("hp", Integer.toString(currHealth));
					charac.put("name", name);
					charac.put("initTotal", Integer.toString(initiative));
					charac.put("ac", Integer.toString(ac));
					charac.put("attack", attacks);
					charac.put("status", status);
					charac.put("other", other);
					break;
				}	
			}
			
			return true;
		}
		return false; // did not find character
	}
	
	public void updateCharacterCurrentHealth(String charName, int currHealth) {
		DndCharacter editChar = getCharacterInAnyMap(charName);
		if (editChar != null) {
			editChar.setCurrentHealth(currHealth);
			// now set initiative order
			for (Map<String, String> charac : getInitiativeOrder()) {
				if (charac.get("name").equals(charName)) {
					charac.put("hp", Integer.toString(currHealth));
					break;
				}	
			}
		}
	}
	
	// ----- ----- Initiative stuff: ----- -----
	
	public Vector<Map<String, String>> rollInitiative(Map<DndCharacter, Integer> pcInitiatives) { // name, ac, hp, initTotal
				
		Map<DndCharacter, Integer> tempCharacterInits =  rollNpcInitiatives();
		System.out.println("Adding PC initiative...");
		tempCharacterInits.putAll(pcInitiatives);
		
		setBaseCharacterInits(tempCharacterInits); // 
				
		// sort
		Vector<DndCharacter> initiativeVector = sortInitiativeOrder();
		
		// map
		Vector<Map<String, String>> initiativeOrderMap = mapInitiativeOrder(initiativeVector);
		
		setInitiativeOrder(initiativeOrderMap);
		
		return initiativeOrderMap;
	}
	
	private void generateUnrolledInititative() {
		Map<DndCharacter, Integer> unrolledCharacterInits = getUnrolledInits(); // all from characters in the map
		System.out.println("Adding unrolled initiative...");
		setBaseCharacterInits(unrolledCharacterInits);
		
		setInitiativeOrder(mapInitiativeOrder(sortInitiativeOrder()));
	}
	
	public Vector<DndCharacter> sortInitiativeOrder() {
		Vector<DndCharacter> initiativeVector = new Vector<>();
		
		for (DndCharacter d: getBaseCharacterInits().keySet()) {
			int init = getBaseCharacterInits().get(d);
			System.out.println(d.getCharName() + "\'s initiative: " + init);
			
			if (initiativeVector.isEmpty()) {
				initiativeVector.add(d);
			} else {
				int i = 0;
				boolean placed = false;
				for (DndCharacter c: initiativeVector) {
					int initSorted = getBaseCharacterInits().get(c);
					if (initSorted <= init) {
						initiativeVector.add(i, d);
						placed = true;
						break;
					}
					i++;
				}
				if (!placed) { // got to the end without placing
					initiativeVector.add(d);
				}
			}
		}
		
		return initiativeVector;
	}
	
	private Vector<Map<String, String>> mapInitiativeOrder( Vector<DndCharacter> initiativeVector) {
		Vector<Map<String, String>> initiativeOrderMap = new Vector<>();
		
		for (DndCharacter d: initiativeVector) {
			System.out.println(d.getCharName() + "\'s (sorted) initiative: " + getBaseCharacterInits().get(d));
			
			Map<String, String> initiativeStatsMap = new HashMap<>();
			initiativeStatsMap.put("name", d.getCharName());
			initiativeStatsMap.put("initTotal", Integer.toString(getBaseCharacterInits().get(d)));
			initiativeStatsMap.put("hp", Integer.toString(d.getCurrentHealth()));
			System.out.println("Mapping " + d.getCharName() + "\'s current health: " + d.getCurrentHealth());
			initiativeStatsMap.put("ac", Integer.toString(d.getArmorClass()));
			initiativeStatsMap.put("attack", d.attacksString);
			initiativeStatsMap.put("status", d.statusString);
			initiativeStatsMap.put("other", d.otherString);
			initiativeOrderMap.add(initiativeStatsMap);
		}
		
		// set character orders:
		if (initiativeOrderMap.size() > 2) {
			setCurrentCharacterName(initiativeOrderMap.get(0).get("name"));
			setNextCharacterName(initiativeOrderMap.get(1).get("name"));
		}
		
		return initiativeOrderMap;
	}
	
	public void updateSingleCharacterInitiative(String charName, int init) {
		for (Map.Entry<DndCharacter,Integer> characterWithInit : getBaseCharacterInits().entrySet()) {
			if (characterWithInit.getKey().getCharName().equals(charName)) {
				characterWithInit.setValue(init);
				System.out.println("Inititative updated");
			}
		}
	}
	
	public void changeInitiativeOrder() {
		setInitiativeOrder(mapInitiativeOrder(sortInitiativeOrder()));
	}
	
	private  Map<DndCharacter, Integer> getUnrolledInits() {
		Map<DndCharacter, Integer> unrolledInits = new HashMap<>();
		
		for (DndCharacter charac: charactersInMap) {
			unrolledInits.put(charac, charac.getInitiative()); // only add the base init modifier, not a roll
		}
		
		return unrolledInits;
	}
	
	public Map<DndCharacter, Integer> rollNpcInitiatives() {
		Map<DndCharacter, Integer> npcInits = new HashMap<>();
				
		for (DndCharacter charac: charactersInMap) {
			if (charac.isNpc()) {
				System.out.println("adding npc " + charac.getCharName() + "\'s initiative (base: " + charac.getInitiative() + ").");
				npcInits.put(charac, rollNpcInitiative(charac));
			}
		}
		
		return npcInits;
	}
	
	private int rollNpcInitiative(DndCharacter c) {
		return c.getInitiative() + getRandomNumber(1, 21);
	}
	
	public void addNewCharacterToInitMapUnrolled(DndCharacter d) {
		
		for (Map<String, String> mappedChar : getInitiativeOrder()) {
			if (mappedChar.get("name").equals(d.getCharName())) {
				System.out.println(d.getCharName() + " is already in the initiative map" );
				return; // do not add twice
			}
		}

		System.out.println("Adding " + d.getCharName() + " to the initiative map" );
		Map<String, String> tempInitiativeMap = new HashMap<>();
		tempInitiativeMap.put("name", d.getCharName());
		tempInitiativeMap.put("initTotal", "0"); // default to 0 for late adds, you can edit it later
		tempInitiativeMap.put("hp", Integer.toString(d.getCurrentHealth()));
		tempInitiativeMap.put("ac", Integer.toString(d.getArmorClass()));
		tempInitiativeMap.put("attack", d.attacksString);
		tempInitiativeMap.put("status", d.statusString);
		tempInitiativeMap.put("other", d.otherString);
		
		getInitiativeOrder().add(tempInitiativeMap);
	}
	
	// ----- ----- -----
	
	public int getRandomNumber(int min, int max) {
	    return (int) ((Math.random() * (max - min)) + min);
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}
	
	private void addOneRound() {
		this.time += 6; // 6 seconds
	}
	
	private void addOneHour() {
		this.time += 3600;
	}
	
	private void addOneDay() {
		this.time += 86400;
	}
	
	private void addOneYear() {
		this.time += 31536000;
	}
	
	private String getTimeString() { // return a string of what time it is (converted to New Terra Standard Time)
		int tempTime = getTime();
		String totalTime = "";
		if (tempTime > 0) {
			if (tempTime >= 31536000) { // extract years
				int years = tempTime/31536000;
				totalTime += "Year: 20" + String.valueOf(years) + " "; // added 200 years with the '20'
				tempTime = tempTime%31536000;
			}
			
			if (tempTime >= 86400) { // extract days
				int days = tempTime/86400;
				totalTime += "Day: " + String.valueOf(days) + " ";
				tempTime = tempTime%86400;
			}
			
			if (tempTime >= 86400) { // extract hours
				int hours = tempTime/86400;
				totalTime += "Hour: " + String.valueOf(hours) + " ";
				tempTime = tempTime%86400;
			}
			
			if (tempTime >= 3600) { // extract minutes
				int minutes = tempTime/3600;
				totalTime += "Minute: " + String.valueOf(minutes) + " ";
				tempTime = tempTime%3600;
			}
		} else {
			totalTime = "Time has not started yet";
		}
		return totalTime;
	}

	public void setInitiativeOrder(Vector<Map<String, String>> initNames) {
		this.initiativeOrder = initNames;
	}

	public Vector<Map<String, String>> getInitiativeOrder() {
		if (initiativeOrder == null) {
			System.out.println("Character added to map since last initiative roll");
			generateUnrolledInititative();
		}
		return initiativeOrder;
	}

	public String getCurrentCharacterName() {
		return currentCharacterName;
	}

	public void setCurrentCharacterName(String currentCharacterName) {
		this.currentCharacterName = currentCharacterName;
	}

	public String getNextCharacterName() {
		return nextCharacterName;
	}

	public void setNextCharacterName(String nextCharacterName) {
		this.nextCharacterName = nextCharacterName;
	}

	public Map<DndCharacter, Integer> getBaseCharacterInits() {
		return baseCharacterInits;
	}

	public void setBaseCharacterInits(Map<DndCharacter, Integer> baseCharacterInits) {
		this.baseCharacterInits = baseCharacterInits;
	}

}
