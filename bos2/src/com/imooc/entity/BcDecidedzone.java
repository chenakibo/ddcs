package com.imooc.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * BcDecidedzone entity. @author MyEclipse Persistence Tools
 */

public class BcDecidedzone implements java.io.Serializable {

	// Fields

	private String id;
	private BcStaff bcStaff;
	private String name;
	private Set bcSubareas = new HashSet(0);

	// Constructors

	/** default constructor */
	public BcDecidedzone() {
	}

	/** full constructor */
	public BcDecidedzone(BcStaff bcStaff, String name, Set bcSubareas) {
		this.bcStaff = bcStaff;
		this.name = name;
		this.bcSubareas = bcSubareas;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public BcStaff getBcStaff() {
		return this.bcStaff;
	}

	public void setBcStaff(BcStaff bcStaff) {
		this.bcStaff = bcStaff;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set getBcSubareas() {
		return this.bcSubareas;
	}

	public void setBcSubareas(Set bcSubareas) {
		this.bcSubareas = bcSubareas;
	}

}