package com.dnd.helper.restservice.gamedata;

import java.io.Serializable;

public class Weapon extends Item implements Serializable {
	//default serialVersion id
    private static final long serialVersionUID = 1L;
    
    public Weapon(String itemName) {
		super(itemName);
	}
    
    private String damage; // damage without Str or Feats
    private int attackRollBonus; // any attack bonuses from the weapon?
    private int range; // default throwing range = ?
    private int ammoLeft = -1; // -1 = no ammo needed
    private int critRange; // lowest crit number needed
    private int critFailRange;
    private int critMultiplier;
    private String weaponType; // melee or ranged
    private String damageType; // percing, etc

	public void setDamage(String dmg) {
		this.damage = dmg;
	}
	
	public String getDamage() {
		return damage;
	}

	public int getAttackRollBonus() {
		return attackRollBonus;
	}

	public void setAttackRollBonus(int attackRollBonus) {
		this.attackRollBonus = attackRollBonus;
	}

	public int getRange() {
		return range;
	}

	public void setRange(int range) {
		this.range = range;
	}

	public int getAmmoLeft() {
		return ammoLeft;
	}

	public void setAmmoLeft(int ammoLeft) {
		this.ammoLeft = ammoLeft;
	}

	public int getCritRange() {
		return critRange;
	}

	public void setCritRange(int critRange) {
		this.critRange = critRange;
	}

	public int getCritDamageMultiplier() {
		return critMultiplier;
	}

	public void setCritDamageMultiplier(int critDamage) {
		this.critMultiplier = critDamage;
	}

	public String getWeaponType() {
		return weaponType;
	}

	public void setWeaponType(String weaponType) {
		this.weaponType = weaponType;
	}

	public String getDamageType() {
		return damageType;
	}

	public void setDamageType(String damageType) {
		this.damageType = damageType;
	}

	public int getCritFailRange() {
		return critFailRange;
	}

	public void setCritFailRange(int critFailRange) {
		this.critFailRange = critFailRange;
	}
}
