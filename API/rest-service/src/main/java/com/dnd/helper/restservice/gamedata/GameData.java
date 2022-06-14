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
	
	private Vector<TimedEffect> durationEffects;
	
	private int extraYears = 0;
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
//					System.out.println("Found character in map: " + characterName);
					return d;
				}
			}
		}
		
		Vector<DndCharacter> notInMapChars = getCharactersNotInMap();
		if (notInMapChars != null) {
			for (DndCharacter d : notInMapChars) { // not in map
				if (Objects.equals(d.getCharName(), characterName)) {
//					System.out.println("Found character not in map: " + characterName);
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
		c.setInitiativeBonus(initiative);
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
			editChar.setInitiativeBonus(initiative);
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
	
	// turn order stuff:
	
	public boolean setInitialTurns() {
		// set character orders:
		if (getInitiativeOrder().size() >= 2) {
			setCurrentCharacterName(getInitiativeOrder().get(0).get("name"));
			setNextCharacterName(getInitiativeOrder().get(1).get("name"));
			return true;
		} else {
			return false;
		}
	} 
	
	public boolean nextTurn() {
		if (getCurrentCharacterName() == null || getNextCharacterName() == null) {
			return setInitialTurns();
		} else {
			addOneRound(); // time
			
			if (getInitiativeOrder().size() >= 2) {
				
				setCurrentCharacterName(getNextCharacterName());
				
				for (int i = 0; i < getInitiativeOrder().size(); i++) { // update next character
					if (getInitiativeOrder().get(i).get("name").equals(getNextCharacterName())) { // found the next character
						if (i+1 == getInitiativeOrder().size()) { // next character needs be the first
							setNextCharacterName(getInitiativeOrder().get(0).get("name"));
						} else {
							setNextCharacterName(getInitiativeOrder().get(i+1).get("name"));
						}
						break;
					}
				}
			} else { // size = 2 or less, just flip-flop
				String tempName = getCurrentCharacterName();
				setCurrentCharacterName(getNextCharacterName());
				setNextCharacterName(tempName);
			}

			return true;
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

		//set turns
		if (!setInitialTurns()) {
			System.out.println("Unable to set initial turn order");
		} else {
			System.out.println("Set initial turn order");
		}
		
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
//			System.out.println(d.getCharName() + "\'s initiative: " + init);
			
			if (initiativeVector.isEmpty()) {
				initiativeVector.add(d);
			} else {
				int i = 0;
				boolean placed = false;
				for (DndCharacter c: initiativeVector) {
					int initSorted = getBaseCharacterInits().get(c);
					if (initSorted < init) { // sorted = in list, init = being added
						initiativeVector.add(i, d);
						placed = true;
						break;
					} else if (initSorted == init) { // compare init bonuses 
						if (c.getInitiativeBonus() <= d.getInitiativeBonus()) {
							initiativeVector.add(i, d);
							placed = true;
							break;
						} else {
							if (i+1 == initiativeVector.size()) {
								break; // will add to the end
							} else {
								initiativeVector.add(i+1, d);
								placed = true;
								break;
							}
						}
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
//			System.out.println("Mapping " + d.getCharName() + "\'s current health: " + d.getCurrentHealth());
			initiativeStatsMap.put("ac", Integer.toString(d.getArmorClass()));
			initiativeStatsMap.put("attack", d.attacksString);
			initiativeStatsMap.put("status", d.statusString);
			initiativeStatsMap.put("other", d.otherString);
			initiativeOrderMap.add(initiativeStatsMap);
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
			unrolledInits.put(charac, charac.getInitiativeBonus()); // only add the base init modifier, not a roll
		}
		
		return unrolledInits;
	}
	
	public Map<DndCharacter, Integer> rollNpcInitiatives() {
		Map<DndCharacter, Integer> npcInits = new HashMap<>();
				
		for (DndCharacter charac: charactersInMap) {
			if (charac.isNpc()) {
				System.out.println("adding npc " + charac.getCharName() + "\'s initiative (base: " + charac.getInitiativeBonus() + ").");
				npcInits.put(charac, rollNpcInitiative(charac));
			}
		}
		
		return npcInits;
	}
	
	private int rollNpcInitiative(DndCharacter c) {
		return c.getInitiativeBonus() + getRandomNumber(1, 21);
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
		
		if (!getBaseCharacterInits().containsKey(d)) {
			getBaseCharacterInits().put(d, 0);
		}
	}
	
	public void removeCharacterFromInitMapUnrolled(DndCharacter d) {
		if (getBaseCharacterInits().containsKey(d)) {
			getBaseCharacterInits().remove(d);
		}
		changeInitiativeOrder(); // change actually just updates & sorts the list, does not change it
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
	
	public void resetTime() {
		setTime(0);
		this.extraYears = 0;
	}
	
	public void addRounds(int x) {
		this.time += x*6;
		
	}

	public void subtractRounds(int x) {
		this.time -= x*6;
	}

	public void addMinutes(int x) {
		this.time += x*60;
	}

	public void subtractMinutes(int x) {
		this.time -= x*60;
	}

	public void addHours(int x) {
		this.time += x*3600;
	}

	public void subtractHours(int x) {
		this.time -= x*3600;
	}
	
	public void addDays(int x) {
		this.time += x*86400;
	}

	public void subtractDays(int x) {
		this.time -= x*86400;
	}

	public void addYears(int x) {
		extraYears += x; // do not add to time bc overflow error after 40+ years (16 bytes I think)
	}

	public void subtractYears(int x) {
		if (extraYears > 0) {
			if (x <= extraYears) { // subtract from extra years
				extraYears -= x;
			} else { // subtract all, then subtract leftovers
				int diff = x - extraYears;
				extraYears = 0;
				this.time -= diff*31536000;
			}
		} else {
			this.time -= x*31536000;
		}
	}
	
	private void addOneRound() {
		this.time += 6; // 6 seconds
	}
	
	public String getTimeString() { // return a string of what time it is (converted to New Terra Standard Time)
		updateDurationEffects();
		int tempTime = getTime();
		String totalTime = "";
		if (tempTime > 0 || extraYears > 0) {
			if (tempTime >= 31536000 || extraYears > 0) { // extract years
				int years = tempTime/31536000;
				totalTime += "Year: " + String.valueOf(years + extraYears) + ", ";
				tempTime = tempTime%31536000;
			}
			
			if (tempTime >= 86400) { // extract days
				int days = tempTime/86400;
				totalTime += "Day: " + String.valueOf(days) + ", ";
				tempTime = tempTime%86400;
			}
			
			if (tempTime >= 3600) { // extract hours
				int hours = tempTime/3600;
				totalTime += "Hour: " + String.valueOf(hours) + ", ";
				tempTime = tempTime%3600;
			}
			
			if (tempTime >= 60) { // extract minutes
				int minutes = tempTime/60;
				totalTime += "Minute: " + String.valueOf(minutes) + ", ";
				tempTime = tempTime%60;
			}
			if (tempTime >= 6) {
				int rounds = tempTime/6;
				totalTime += "Round: " + String.valueOf(rounds) + ". ";
			}
			
			totalTime = totalTime.substring(0, totalTime.length()-2) + ".";
		} else {
			setTime(0);
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
//		System.out.println("Current character: " + currentCharacterName);
		this.currentCharacterName = currentCharacterName;
	}

	public String getNextCharacterName() {
		return nextCharacterName;
	}

	public void setNextCharacterName(String nextCharacterName) {
//		System.out.println("Next character: " + nextCharacterName);
		this.nextCharacterName = nextCharacterName;
	}

	public Map<DndCharacter, Integer> getBaseCharacterInits() {
		if (baseCharacterInits == null) {
			baseCharacterInits = new HashMap<>();
		}
		return baseCharacterInits;
	}

	public void setBaseCharacterInits(Map<DndCharacter, Integer> baseCharacterInits) {
		this.baseCharacterInits = baseCharacterInits;
	}

	public Vector<TimedEffect> getDurationEffects() {
		if (durationEffects == null) {
			durationEffects = new Vector<TimedEffect>();
		}
		return durationEffects;
	}

	public void setDurationEffects(Vector<TimedEffect> durationEffects) {
		this.durationEffects = durationEffects;
	}
	
	public boolean addDurationEffect(String name, String effect, String targets, int durationRounds) {
		for (TimedEffect t: getDurationEffects()) {
			if (t.getName().equals(name)) { // already exists
				System.out.println("Timed effect " + name + " already exists.");
				return false;
			}
		}
		
		TimedEffect durationEffect = new TimedEffect();
		
		durationEffect.setName(name);
		durationEffect.setEffect(effect);
		durationEffect.setTargets(targets);
		durationEffect.setTimeLeft(durationRounds); // start out with duration ROunds left
		
		//server-side only:
		durationEffect.setTimeEnd(durationRounds + getRoundsOfTimeAndYears());
	
		getDurationEffects().add(durationEffect);
		return true;
	}
	
	public boolean removeDurationEffect(String effectName) {
		TimedEffect toBeEnded = null;
		for (TimedEffect t: getDurationEffects()) {
			if (t.getName().equals(effectName)) { //found for deletion
				toBeEnded = t;
			}
		}
		
		if (toBeEnded == null) {
			return false;
		}
		
		getDurationEffects().remove(toBeEnded);
		
		return true;
	}
	
	private void updateDurationEffects() {
		int totalRoundsPassed = getRoundsOfTimeAndYears();
		
		Vector<TimedEffect> timedOut = new Vector<>();
		
		for (TimedEffect t: getDurationEffects()) {
			if (totalRoundsPassed < t.getTimeEnd()) { // count up
				t.setTimeLeft(t.getTimeEnd() - totalRoundsPassed);
			} else { //remove
				timedOut.add(t);
			}
		}
		
		for (TimedEffect removeEffect: timedOut) {
			getDurationEffects().remove(removeEffect);
		}
	}
	
	private int getRoundsOfTimeAndYears() {
		int rounds = getTime()/6;
		int roundYears = extraYears*5256000;
		return rounds + roundYears;
	}

}
