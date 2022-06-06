package com.dnd.helper.restservice.gamedata;

import java.io.Serializable;
import java.util.Vector;

public class Attacks implements Serializable {
	//default serialVersion id
    private static final long serialVersionUID = 1L;
    
    private Vector<Weapon> attackList;
    
    public Attacks() {
    	setAttackList(new Vector<Weapon>());
    }
    
    public void loadUnarmedStrike(String size) {
    	Weapon unarmed = new Weapon("Unarmed Strike");
    	switch (size) {
	    	case "m":
	    		unarmed.setDamage("1d3");
	    		break;
	    	default:
	    		break;
    	}
    	unarmed.setType("weapon");
    	unarmed.setDescription("An unarmed attack");
    	unarmed.setRange(1); // = 5 ft
    	unarmed.setCritRange(20);  // 20 = min crit range
    	unarmed.setCritDamageMultiplier(2); // x2
    	
    	attackList.addElement(unarmed);
    }
    
    private void addWeapon(String itemSize, Weapon weapon) {
    	switch (itemSize) {
	    	case "m":
	    		weapon.setDamage("1d6"); // read from file
	    		break;
	    	default:
	    		break;
    	}
    	// any special effects?
//    	weapon.setAttackRollBonus(1);
    	weapon.setDescription("A weapon attack");
    	weapon.setRange(1); // = 5 ft
    	weapon.setCritRange(20);
    	weapon.setCritDamageMultiplier(2); // x2
	    	
    	attackList.addElement(weapon);
    	System.out.println("Added weapon " + weapon.getName() + " added.");
    }

	public Vector<Weapon> getAttackList() {
		return attackList;
	}

	
	public void setAttackList(Vector<Weapon> attackList) {
		this.attackList = attackList;
	}
}
