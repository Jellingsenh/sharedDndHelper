package com.dnd.helper.restservice.gamedata;

import java.io.Serializable;
import java.util.Vector;

public class Thing implements Serializable { // something bigger than an item, but not "alive"
	//default serialVersion id
    private static final long serialVersionUID = 1L;
    
	private String name;
	private String size;
	private int hardness;
	private int health;
	private int weight;
	private boolean detectable;
	private int detectDc; // smell/spot/listen check
	private String description;
	private Vector<String> pixelArtFiles;

	public Thing (String thingName) {
		this.name = thingName;
		// System.out.println("thing name: " + name);
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public int getHardness() {
		return hardness;
	}

	public void setHardness(int hardness) {
		this.hardness = hardness;
	}

	public int getHealth() {
		return health;
	}

	public void setHealth(int health) {
		this.health = health;
	}

	public boolean isDetectable() {
		return detectable;
	}

	public void setDetectable(boolean detectable) {
		this.detectable = detectable;
	}

	public int getDc() {
		return detectDc;
	}

	public void setDc(int dc) {
		this.detectDc = dc;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String descr) {
		this.description = descr;
	}

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	public Vector<String> getPixelArtFiles() {
		return pixelArtFiles;
	}

	public void setPixelArtFiles(Vector<String> pixelArtFiles) {
		this.pixelArtFiles = pixelArtFiles;
	}
}