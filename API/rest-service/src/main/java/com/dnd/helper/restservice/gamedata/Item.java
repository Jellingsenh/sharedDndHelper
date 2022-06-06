package com.dnd.helper.restservice.gamedata;

public class Item extends Thing {
    private String type = "weapon"; // weapon, armor, magic, misc
    private int value; // gp
    private String effect;

    public Item (String itemName) {
        super(itemName);
    }

	public String getType() {
		return type;
	}
	
	public void setType(String type) {
		this.type = type;
	}

	public int getValueGp() {
		return value;
	}

	public void setValueGp(int value) {
		this.value = value;
	}

	public String getEffect() {
		return effect;
	}

	public void setEffect(String effect) {
		this.effect = effect;
	}
}
