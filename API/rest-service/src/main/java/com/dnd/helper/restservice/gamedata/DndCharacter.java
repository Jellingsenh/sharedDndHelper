package com.dnd.helper.restservice.gamedata;

import java.io.Serializable;
import java.util.Vector;

public class DndCharacter implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String charName = "John Doe";
//    private Vector<ClassSkills> classes = null;
//    private int experience = 0; // used to calculate level

//    private int Str = 10; // used to calculate carrying capacity, jump height, throw length, etc
//    private int Dex = 10;
//    private int Con = 10;
//    private int Int = 10;
//    private int Wis = 10;
//    private int Cha = 10;

    private int fortSave = 0;
    private int refSave = 0;
    private int willSave = 0;

    private int health = 1; // max health
    private int currentHealth = 1;
    private int armorClass = 10;
    private int touchArmor = 10;
    private int flatFooted = 10;
//    private int dodgeBonus = 0; // should include any misc. bonuses
//    private int armorBonus = 0; // also should include the misc. bonuses

//    private Vector<Integer> bab = null;
    private int initiative = 0;
    private int speed = 6; // = 30 ft
//    private int speedLeft = 0;

    private String race = null;
    private String size = "m"; // default
//    private String height = null;
//    private String description = null;
//    private String god = null;
//    private String alignment = null;
//    private String vision = null;
//    private String weaknesses; // piercing, etc

//    private int age = 0;
//    private int weight = 0;
//    private int velocity = 0;
//    private int lastVelocity = 0;
//    private int elevation = 0;
    
//    private boolean literate = true;
//    private boolean swimFreely = false;
//    private boolean climbFreely = false;
//    private boolean canFly = false;
//    private boolean swimming = false;
//    private boolean climbing = false;
//    private boolean falling = false;
//    private boolean running = false;
//    private boolean hiding = false;

//    private boolean invisible = false;
//    private boolean deaf = false;
//    private boolean magicallyHeld = false;
//    private boolean stuck = false;
//    private boolean grappled = false;

//    private boolean hot = false;
//    private boolean cold = false;
//    private boolean onFire = false;
//    private boolean frozen = false;
//    private Vector<Poison> poison = null; // types of poison, null = healthy
//    private boolean hungry = false;
//    private boolean thirsty = false;
//    private boolean fatigued = false;
//    private Vector<String> otherStuff = null;

//    private boolean solid = true;
//    private boolean ooze = false;

//    private boolean allControl = true; // if false, only owner can control the character
//    private String owner = null;
    private boolean isNPC = false;
//    private String mapLocationId = null;
//    private boolean realDice = true; // can be set to true to stop auto-rolling

//    private Vector<String> pixelArtFiles; // 3x images + small "height" box (which will also show debufs)

//    private Inventory inventory; // weapons, armor, usable, misc, junk
//    private Vector<DamageReduction> damageReduction = null;
//    private Skills skills; // based on class
//    private ActiveAbilities abilities; // usable abilities (also includes feats)
//    private PassiveEffects effects; // passive abilities (& feats)
//    private Spells spells = null;
//    private Attacks attacks;

//    private String currentActionString = null; // will have attacks, spells, & abilities being used
//    private boolean standardActionUsed = false;
//    private boolean moveActionUsed = false; // you can take a second move action in place of a standard action
//    private boolean swiftActionUsed = false;

//    private int fatigueLevel = 0; // 0 = fully rested
    
    //temp variables until fully made
    
    public String attacksString;
    public String skillsString;
    public String spellsString;
    public String magicItemsString;
    public String lootString;
    public String featsString;
    public String statusString;
    public String otherString;
    public int grapple;

    public DndCharacter(String name) {
    	this.charName = name;
    	
    	// instantiate inventory, skills, abilities, effects, spells, & attacks
//    	setAttacks(new Attacks());
//    	setSpells(new Spells());
//    	setEffects(new PassiveEffects());
//    	setAbilities(new ActiveAbilities());
//    	setSkills(new Skills());
//    	setInventory(new Inventory());
//    	setPoison(new Vector<Poison>());
//    	setClasses(new Vector<ClassSkills>());
//    	bab.add(0);
    	// create a character here
    	
    	
//    	attacks.loadUnarmedStrike(this.size); //!!!!!! !!!!!!
    	
    	System.out.println("Created character " + charName);
    }

    public void setCharName(String newCharName) {
    	this.charName = newCharName;
    }

    public String getCharName() {
    	return charName;
    }

    public void doAttack(Character target) {
    	
    }
    
    public void printCharacter() {
    	String printStr = charName;

    	System.out.println(printStr);
    }
    
    private int getStatMod(int stat) {
    	return (stat-10)/2;
    }
    
//	public int getExperience() {
//		return experience;
//	}
//
//	public void setExperience(int experience) {
//		this.experience = experience;
//	}
//	
//	public void addExperience(int experience) {
//		this.experience += experience;
//	}
	
//	public int getMeleeAttackMod() {
////		for (Ability a : effects.getEffects()) {
////			if (a.getAbilityName().equals("Weapon Finesse")) {
////				return getDexMod(); // add a light weapon check?
////			}
////		}
//		return getStrMod();
//	}

//	public int getStr() {
//		return Str;
//	}
//
//	public void setStr(int str) {
//		Str = str;
//	}
//	
//	public int getStrMod() {
//		return getStatMod(this.Str);
//	}
//
//	public int getDex() {
//		return Dex;
//	}
//
//	public void setDex(int dex) {
//		Dex = dex;
//	}
//	
//	public int getDexMod() {
//		return getStatMod(this.Dex);
//	}
//
//	public int getCon() {
//		return Con;
//	}
//
//	public void setCon(int con) {
//		Con = con;
//	}
//	
//	public int getConMod() {
//		return getStatMod(this.Con);
//	}
//
//	/**
//	 * @return the int
//	 */
//	public int getInt() {
//		return Int;
//	}
//
//	/**
//	 * @param i the int to set
//	 */
//	public void setInt(int i) {
//		Int = i;
//	}
//	
//	public int getIntMod() {
//		return getStatMod(this.Int);
//	}
//
//	/**
//	 * @return the wis
//	 */
//	public int getWis() {
//		return Wis;
//	}
//
//	/**
//	 * @param wis the wis to set
//	 */
//	public void setWis(int wis) {
//		Wis = wis;
//	}
//	
//	public int getWisMod() {
//		return getStatMod(this.Wis);
//	}
//
//	/**
//	 * @return the cha
//	 */
//	public int getCha() {
//		return Cha;
//	}
//
//	/**
//	 * @param cha the cha to set
//	 */
//	public void setCha(int cha) {
//		Cha = cha;
//	}
//	
//	public int getChaMod() {
//		return getStatMod(this.Cha);
//	}

	/**
	 * @return the fortSave
	 */
	public int getFortSave() {
		return fortSave;
	}

	/**
	 * @param fortSave the fortSave to set
	 */
	public void setFortSave(int fortSave) {
		this.fortSave = fortSave;
	}

	/**
	 * @return the refSave
	 */
	public int getRefSave() {
		return refSave;
	}

	/**
	 * @param refSave the refSave to set
	 */
	public void setRefSave(int refSave) {
		this.refSave = refSave;
	}

	/**
	 * @return the willSave
	 */
	public int getWillSave() {
		return willSave;
	}

	/**
	 * @param willSave the willSave to set
	 */
	public void setWillSave(int willSave) {
		this.willSave = willSave;
	}

	/**
	 * @return the health
	 */
	public int getHealth() {
		return health;
	}

	/**
	 * @param health the health to set
	 */
	public void setHealth(int health) {
		this.health = health;
	}

	/**
	 * @return the armorClass
	 */
	public int getArmorClass() {
		return armorClass;
	}

	/**
	 * @param armorClass the armorClass to set
	 */
	public void setArmorClass(int armorClass) {
		this.armorClass = armorClass;
	}

	/**
	 * @return the touchArmor
	 */
	public int getTouchArmor() {
		return touchArmor;
	}

	/**
	 * @param touchArmor the touchArmor to set
	 */
	public void setTouchArmor(int touchArmor) {
		this.touchArmor = touchArmor;
	}

	/**
	 * @return the flatFooted
	 */
	public int getFlatFooted() {
		return flatFooted;
	}

	/**
	 * @param flatFooted the flatFooted to set
	 */
	public void setFlatFooted(int flatFooted) {
		this.flatFooted = flatFooted;
	}

//	/**
//	 * @return the bab
//	 */
//	public Vector<Integer> getBab() {
//		return bab;
//	}
//
//	/**
//	 * @param bab the bab to set
//	 */
//	public void setBab(Vector<Integer> bab) {
//		this.bab = bab;
//	}

	/**
	 * @return the initiative
	 */
	public int getInitiativeBonus() {
		return initiative;
	}

	/**
	 * @param initiative the initiative to set
	 */
	public void setInitiativeBonus(int initiative) {
		this.initiative = initiative;
	}

	/**
	 * @return the speed
	 */
	public int getSpeed() {
		return speed;
	}

	/**
	 * @param speed the speed to set
	 */
	public void setSpeed(int speed) {
		this.speed = speed;
	}

//	/**
//	 * @return the speedLeft
//	 */
//	public int getSpeedLeft() {
//		return speedLeft;
//	}
//
//	/**
//	 * @param speedLeft the speedLeft to set
//	 */
//	public void setSpeedLeft(int speedLeft) {
//		this.speedLeft = speedLeft;
//	}

	/**
	 * @return the race
	 */
	public String getRace() {
		return race;
	}

	/**
	 * @param race the race to set
	 */
	public void setRace(String race) {
		this.race = race;
	}

	/**
	 * @return the size
	 */
	public String getSize() {
		return size;
	}

	/**
	 * @param size the size to set
	 */
	public void setSize(String size) {
		this.size = size;
	}

//	/**
//	 * @return the height
//	 */
//	public String getHeight() {
//		return height;
//	}
//
//	/**
//	 * @param height the height to set
//	 */
//	public void setHeight(String height) {
//		this.height = height;
//	}
//
//	/**
//	 * @return the description
//	 */
//	public String getDescription() {
//		return description;
//	}
//
//	/**
//	 * @param description the description to set
//	 */
//	public void setDescription(String description) {
//		this.description = description;
//	}
//
//	/**
//	 * @return the god
//	 */
//	public String getGod() {
//		return god;
//	}
//
//	/**
//	 * @param god the god to set
//	 */
//	public void setGod(String god) {
//		this.god = god;
//	}
//
//	/**
//	 * @return the alignment
//	 */
//	public String getAlignment() {
//		return alignment;
//	}
//
//	/**
//	 * @param alignment the alignment to set
//	 */
//	public void setAlignment(String alignment) {
//		this.alignment = alignment;
//	}
//
//	/**
//	 * @return the vision
//	 */
//	public String getVision() {
//		return vision;
//	}
//
//	/**
//	 * @param vision the vision to set
//	 */
//	public void setVision(String vision) {
//		this.vision = vision;
//	}
//
//	/**
//	 * @return the age
//	 */
//	public int getAge() {
//		return age;
//	}
//
//	/**
//	 * @param age the age to set
//	 */
//	public void setAge(int age) {
//		this.age = age;
//	}
//
//	/**
//	 * @return the weight
//	 */
//	public int getWeight() {
//		return weight;
//	}
//
//	/**
//	 * @param weight the weight to set
//	 */
//	public void setWeight(int weight) {
//		this.weight = weight;
//	}
//
//	/**
//	 * @return the velocity
//	 */
//	public int getVelocity() {
//		return velocity;
//	}
//
//	/**
//	 * @param velocity the velocity to set
//	 */
//	public void setVelocity(int velocity) {
//		this.velocity = velocity;
//	}
//
//	/**
//	 * @return the lastVelocity
//	 */
//	public int getLastVelocity() {
//		return lastVelocity;
//	}
//
//	/**
//	 * @param lastVelocity the lastVelocity to set
//	 */
//	public void setLastVelocity(int lastVelocity) {
//		this.lastVelocity = lastVelocity;
//	}
//
//	/**
//	 * @return the elevation
//	 */
//	public int getElevation() {
//		return elevation;
//	}
//
//	/**
//	 * @param elevation the elevation to set
//	 */
//	public void setElevation(int elevation) {
//		this.elevation = elevation;
//	}
//
//	/**
//	 * @return the literate
//	 */
//	public boolean isLiterate() {
//		return literate;
//	}
//
//	/**
//	 * @param litterate the litterate to set
//	 */
//	public void setLiterate(boolean literate) {
//		this.literate = literate;
//	}
//
//	/**
//	 * @return the swimFreely
//	 */
//	public boolean isSwimFreely() {
//		return swimFreely;
//	}
//
//	/**
//	 * @param swimFreely the swimFreely to set
//	 */
//	public void setSwimFreely(boolean swimFreely) {
//		this.swimFreely = swimFreely;
//	}
//
//	/**
//	 * @return the climbFreely
//	 */
//	public boolean isClimbFreely() {
//		return climbFreely;
//	}
//
//	/**
//	 * @param climbFreely the climbFreely to set
//	 */
//	public void setClimbFreely(boolean climbFreely) {
//		this.climbFreely = climbFreely;
//	}
//
//	/**
//	 * @return the canFly
//	 */
//	public boolean isCanFly() {
//		return canFly;
//	}
//
//	/**
//	 * @param canFly the canFly to set
//	 */
//	public void setCanFly(boolean canFly) {
//		this.canFly = canFly;
//	}
//
//	/**
//	 * @return the swimming
//	 */
//	public boolean isSwimming() {
//		return swimming;
//	}
//
//	/**
//	 * @param swimming the swimming to set
//	 */
//	public void setSwimming(boolean swimming) {
//		this.swimming = swimming;
//	}
//
//	/**
//	 * @return the climbing
//	 */
//	public boolean isClimbing() {
//		return climbing;
//	}
//
//	/**
//	 * @param climbing the climbing to set
//	 */
//	public void setClimbing(boolean climbing) {
//		this.climbing = climbing;
//	}
//
//	/**
//	 * @return the falling
//	 */
//	public boolean isFalling() {
//		return falling;
//	}
//
//	/**
//	 * @param falling the falling to set
//	 */
//	public void setFalling(boolean falling) {
//		this.falling = falling;
//	}
//
//	/**
//	 * @return the running
//	 */
//	public boolean isRunning() {
//		return running;
//	}
//
//	/**
//	 * @param running the running to set
//	 */
//	public void setRunning(boolean running) {
//		this.running = running;
//	}
//
//	/**
//	 * @return the hiding
//	 */
//	public boolean isHiding() {
//		return hiding;
//	}
//
//	/**
//	 * @param hiding the hiding to set
//	 */
//	public void setHiding(boolean hiding) {
//		this.hiding = hiding;
//	}
//
//	/**
//	 * @return the invisible
//	 */
//	public boolean isInvisible() {
//		return invisible;
//	}
//
//	/**
//	 * @param invisible the invisible to set
//	 */
//	public void setInvisible(boolean invisible) {
//		this.invisible = invisible;
//	}
//
//	/**
//	 * @return the magicallyHeld
//	 */
//	public boolean isMagicallyHeld() {
//		return magicallyHeld;
//	}
//
//	/**
//	 * @param magicallyHeld the magicallyHeld to set
//	 */
//	public void setMagicallyHeld(boolean magicallyHeld) {
//		this.magicallyHeld = magicallyHeld;
//	}
//
//	/**
//	 * @return the deaf
//	 */
//	public boolean isDeaf() {
//		return deaf;
//	}
//
//	/**
//	 * @param deaf the deaf to set
//	 */
//	public void setDeaf(boolean deaf) {
//		this.deaf = deaf;
//	}
//
//	/**
//	 * @return the stuck
//	 */
//	public boolean isStuck() {
//		return stuck;
//	}
//
//	/**
//	 * @param stuck the stuck to set
//	 */
//	public void setStuck(boolean stuck) {
//		this.stuck = stuck;
//	}
//
//	/**
//	 * @return the grappled
//	 */
//	public boolean isGrappled() {
//		return grappled;
//	}
//
//	/**
//	 * @param grappled the grappled to set
//	 */
//	public void setGrappled(boolean grappled) {
//		this.grappled = grappled;
//	}
//
//	/**
//	 * @return the hot
//	 */
//	public boolean isHot() {
//		return hot;
//	}
//
//	/**
//	 * @param hot the hot to set
//	 */
//	public void setHot(boolean hot) {
//		this.hot = hot;
//	}
//
//	/**
//	 * @return the cold
//	 */
//	public boolean isCold() {
//		return cold;
//	}
//
//	/**
//	 * @param cold the cold to set
//	 */
//	public void setCold(boolean cold) {
//		this.cold = cold;
//	}
//
//	/**
//	 * @return the onFire
//	 */
//	public boolean isOnFire() {
//		return onFire;
//	}
//
//	/**
//	 * @param onFire the onFire to set
//	 */
//	public void setOnFire(boolean onFire) {
//		this.onFire = onFire;
//	}
//
//	/**
//	 * @return the frozen
//	 */
//	public boolean isFrozen() {
//		return frozen;
//	}
//
//	/**
//	 * @param frozen the frozen to set
//	 */
//	public void setFrozen(boolean frozen) {
//		this.frozen = frozen;
//	}

//	/**
//	 * @return the poison
//	 */
//	public Vector<Poison> getPoison() {
//		return poison;
//	}
//
//	/**
//	 * @param poison the poison to set
//	 */
//	public void setPoison(Vector<Poison> poison) {
//		this.poison = poison;
//	}

//	/**
//	 * @return the solid
//	 */
//	public boolean isSolid() {
//		return solid;
//	}
//
//	/**
//	 * @param solid the solid to set
//	 */
//	public void setSolid(boolean solid) {
//		this.solid = solid;
//	}
//
//	/**
//	 * @return the ooze
//	 */
//	public boolean isOoze() {
//		return ooze;
//	}
//
//	/**
//	 * @param ooze the ooze to set
//	 */
//	public void setOoze(boolean ooze) {
//		this.ooze = ooze;
//	}
//
//	/**
//	 * @return the allControl
//	 */
//	public boolean isAllControl() {
//		return allControl;
//	}
//
//	/**
//	 * @param allControl the allControl to set
//	 */
//	public void setAllControl(boolean allControl) {
//		this.allControl = allControl;
//	}
//
//	/**
//	 * @return the owner
//	 */
//	public String getOwner() {
//		return owner;
//	}
//
//	/**
//	 * @param owner the owner to set
//	 */
//	public void setOwner(String owner) {
//		this.owner = owner;
//	}
//
//	/**
//	 * @return the realDice
//	 */
//	public boolean useRealDice() {
//		return realDice;
//	}
//
//	/**
//	 * @param realDice the realDice to set
//	 */
//	public void setRealDice(boolean realDice) {
//		this.realDice = realDice;
//	}
//
//	/**
//	 * @return the pixelArtFiles
//	 */
//	public Vector<String> getPixelArtFiles() {
//		return pixelArtFiles;
//	}
//
//	/**
//	 * @param pixelArtFiles the pixelArtFiles to set
//	 */
//	public void setPixelArtFiles(Vector<String> pixelArtFiles) {
//		this.pixelArtFiles = pixelArtFiles;
//	}

//	/**
//	 * @return the damageReduction
//	 */
//	public Vector<DamageReduction> getDamageReduction() {
//		return damageReduction;
//	}
//
//	/**
//	 * @param damageReduction the damageReduction to set
//	 */
//	public void setDamageReduction(Vector<DamageReduction> damageReduction) {
//		this.damageReduction = damageReduction;
//	}

//	/**
//	 * @return the currentActionString
//	 */
//	public String getCurrentActionString() {
//		return currentActionString;
//	}
//
//	/**
//	 * @param currentActionString the currentActionString to set
//	 */
//	public void setCurrentActionString(String currentActionString) {
//		this.currentActionString = currentActionString;
//	}
//
//	/**
//	 * @return the standardActionUsed
//	 */
//	public boolean isStandardActionUsed() {
//		return standardActionUsed;
//	}
//
//	/**
//	 * @param standardActionUsed the standardActionUsed to set
//	 */
//	public void setStandardActionUsed(boolean standardActionUsed) {
//		this.standardActionUsed = standardActionUsed;
//	}
//
//	/**
//	 * @return the moveActionUsed
//	 */
//	public boolean isMoveActionUsed() {
//		return moveActionUsed;
//	}
//
//	/**
//	 * @param moveActionUsed the moveActionUsed to set
//	 */
//	public void setMoveActionUsed(boolean moveActionUsed) {
//		this.moveActionUsed = moveActionUsed;
//	}
//
//	/**
//	 * @return the swiftActionUsed
//	 */
//	public boolean isSwiftActionUsed() {
//		return swiftActionUsed;
//	}
//
//	/**
//	 * @param swiftActionUsed the swiftActionUsed to set
//	 */
//	public void setSwiftActionUsed(boolean swiftActionUsed) {
//		this.swiftActionUsed = swiftActionUsed;
//	}
//
//	/**
//	 * @return the fatigueLevel
//	 */
//	public int getFatigueLevel() {
//		return fatigueLevel;
//	}
//
//	/**
//	 * @param fatigueLevel the fatigueLevel to set
//	 */
//	public void setFatigueLevel(int fatigueLevel) {
//		this.fatigueLevel = fatigueLevel;
//	}

//	/**
//	 * @return the attacks
//	 */
//	public Attacks getAttacks() {
//		return attacks;
//	}
//
//	/**
//	 * @param attacks the attacks to set
//	 */
//	public void setAttacks(Attacks attacks) {
//		this.attacks = attacks;
//	}
//
//	/**
//	 * @return the spells
//	 */
//	public Spells getSpells() {
//		return spells;
//	}
//
//	/**
//	 * @param spells the spells to set
//	 */
//	public void setSpells(Spells spells) {
//		this.spells = spells;
//	}
//
//	/**
//	 * @return the effects
//	 */
//	public PassiveEffects getEffects() {
//		return effects;
//	}
//
//	/**
//	 * @param effects the effects to set
//	 */
//	public void setEffects(PassiveEffects effects) {
//		this.effects = effects;
//	}
//
//	/**
//	 * @return the abilities
//	 */
//	public ActiveAbilities getAbilities() {
//		return abilities;
//	}
//
//	/**
//	 * @param abilities the abilities to set
//	 */
//	public void setAbilities(ActiveAbilities abilities) {
//		this.abilities = abilities;
//	}
//
//	/**
//	 * @return the skills
//	 */
//	public Skills getSkills() {
//		return skills;
//	}
//
//	/**
//	 * @param skills the skills to set
//	 */
//	public void setSkills(Skills skills) {
//		this.skills = skills;
//	}

//	/**
//	 * @return the inventory
//	 */
//	public Inventory getInventory() {
//		return inventory;
//	}
//
//	/**
//	 * @param inventory the inventory to set
//	 */
//	public void setInventory(Inventory inventory) {
//		this.inventory = inventory;
//	}

	public int getCurrentHealth() {
		return currentHealth;
	}

	public void removeHealth(int dmgRollInt) {
		setCurrentHealth(this.health - dmgRollInt);
		
	}

	public void setCurrentHealth(int currentHealth) {
		this.currentHealth = currentHealth;
	}

//	public String getWeaknesses() {
//		return weaknesses;
//	}
//
//	public void setWeaknesses(String weaknesses) {
//		this.weaknesses = weaknesses;
//	}

//	public Vector<ClassSkills> getClasses() {
//		return classes;
//	}
//
//	public void setClasses(Vector<ClassSkills> classes) {
//		this.classes = classes;
//	}

//	public int getDodgeBonus() {
//		return dodgeBonus;
//	}
//
//	public void setDodgeBonus(int dodgeBonus) {
//		this.dodgeBonus = dodgeBonus;
//	}
//
//	public int getArmorBonus() {
//		return armorBonus;
//	}
//
//	public void setArmorBonus(int armorBonus) {
//		this.armorBonus = armorBonus;
//	}
//
//	public boolean isHungry() {
//		return hungry;
//	}
//
//	public void setHungry(boolean hungry) {
//		this.hungry = hungry;
//	}
//
//	public boolean isThirsty() {
//		return thirsty;
//	}
//
//	public void setThirsty(boolean thirsty) {
//		this.thirsty = thirsty;
//	}
//
//	public boolean isFatigued() {
//		return fatigued;
//	}
//
//	public void setFatigued(boolean fatigued) {
//		this.fatigued = fatigued;
//	}
//
//	public Vector<String> getOtherStuff() {
//		return otherStuff;
//	}
//
//	public void setOtherStuff(Vector<String> otherStuff) {
//		this.otherStuff = otherStuff;
//	}

	public boolean isNpc() {
		return isNPC;
	}

	public void setNpc(boolean isNPC) {
		this.isNPC = isNPC;
	}

//	public String getMapLocationId() {
//		return mapLocationId;
//	}
//
//	public void setMapLocationId(String mapLocationId) {
//		this.mapLocationId = mapLocationId;
//	}
}
