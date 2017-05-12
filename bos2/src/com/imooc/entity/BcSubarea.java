package com.imooc.entity;

/**
 * BcSubarea entity. @author MyEclipse Persistence Tools
 */

public class BcSubarea implements java.io.Serializable {

	// Fields

	private String id;
	private BcDecidedzone bcDecidedzone;
	private BcRegion bcRegion;
	private String addresskey;
	private String startnum;
	private String endnum;
	private String single;
	private String position;

	// Constructors

	/** default constructor */
	public BcSubarea() {
	}

	
	public BcSubarea(String id, BcDecidedzone bcDecidedzone, BcRegion bcRegion,
			String addresskey, String startnum, String endnum, String single,
			String position) {
		super();
		this.id = id;
		this.bcDecidedzone = bcDecidedzone;
		this.bcRegion = bcRegion;
		this.addresskey = addresskey;
		this.startnum = startnum;
		this.endnum = endnum;
		this.single = single;
		this.position = position;
	}


	/** full constructor */
	public BcSubarea(BcDecidedzone bcDecidedzone, BcRegion bcRegion,
			String addresskey, String startnum, String endnum, String single,
			String position) {
		this.bcDecidedzone = bcDecidedzone;
		this.bcRegion = bcRegion;
		this.addresskey = addresskey;
		this.startnum = startnum;
		this.endnum = endnum;
		this.single = single;
		this.position = position;
	}

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public BcDecidedzone getBcDecidedzone() {
		return this.bcDecidedzone;
	}

	public void setBcDecidedzone(BcDecidedzone bcDecidedzone) {
		this.bcDecidedzone = bcDecidedzone;
	}

	public BcRegion getBcRegion() {
		return this.bcRegion;
	}

	public void setBcRegion(BcRegion bcRegion) {
		this.bcRegion = bcRegion;
	}

	public String getAddresskey() {
		return this.addresskey;
	}

	public void setAddresskey(String addresskey) {
		this.addresskey = addresskey;
	}

	public String getStartnum() {
		return this.startnum;
	}

	public void setStartnum(String startnum) {
		this.startnum = startnum;
	}

	public String getEndnum() {
		return this.endnum;
	}

	public void setEndnum(String endnum) {
		this.endnum = endnum;
	}

	public String getSingle() {
		return this.single;
	}

	public void setSingle(String single) {
		this.single = single;
	}

	public String getPosition() {
		return this.position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

}