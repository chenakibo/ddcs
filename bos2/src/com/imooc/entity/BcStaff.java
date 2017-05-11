package com.imooc.entity;

import java.util.HashSet;
import java.util.Set;

/**
 * BcStaff entity. @author MyEclipse Persistence Tools
 */

public class BcStaff implements java.io.Serializable {

	// Fields

	private String id;
	private String name;
	private String telephone;
	private String email;
	private String haspda="0";
	private String deltag="0";
	private String station;
	private String standard;
	private Set bcDecidedzones = new HashSet(0);

	@Override
	public String toString() {
		// TODO 自动生成的方法存根
		return "id:"+this.id+"\n"+"name:"+this.name+"\n"+"telephone:"+this.telephone+"\n"
				+"email:"+this.email+"\n"+"haspda:"+this.haspda+"\n"+"deltag:"+this.deltag+"\n"
				+"station:"+this.station+"\n"+"standard:"+this.standard;
	}
	// Constructors

	/** default constructor */
	public BcStaff() {
	}

	/** full constructor */
	public BcStaff(String name, String telephone, String email, String haspda,
			String deltag, String station, String standard, Set bcDecidedzones) {
		this.name = name;
		this.telephone = telephone;
		this.email = email;
		this.haspda = haspda;
		this.deltag = deltag;
		this.station = station;
		this.standard = standard;
		this.bcDecidedzones = bcDecidedzones;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTelephone() {
		return this.telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getHaspda() {
		return this.haspda;
	}

	public void setHaspda(String haspda) {
		this.haspda = haspda;
	}

	public String getDeltag() {
		return this.deltag;
	}

	public void setDeltag(String deltag) {
		this.deltag = deltag;
	}

	public String getStation() {
		return this.station;
	}

	public void setStation(String station) {
		this.station = station;
	}

	public String getStandard() {
		return this.standard;
	}

	public void setStandard(String standard) {
		this.standard = standard;
	}

	public Set getBcDecidedzones() {
		return this.bcDecidedzones;
	}

	public void setBcDecidedzones(Set bcDecidedzones) {
		this.bcDecidedzones = bcDecidedzones;
	}

}