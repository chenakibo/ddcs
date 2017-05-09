CREATE TABLE tbl_onlineuser
(
  sessionid varchar(64) NOT NULL,
  username varchar(64) NOT NULL,
  userrole char,
  lastopttm varchar(32),
  optsite varchar(64),
  CONSTRAINT tbl_onlineuser_pkey PRIMARY KEY (sessionid),
CONSTRAINT tbl_onlineuser_username_key UNIQUE (username)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE tbl_onlineuser
  OWNER TO uxdbwebuser;
COMMENT ON TABLE tbl_onlineuser
  IS '登录在线用户信息表';
COMMENT ON COLUMN tbl_onlineuser.sessionid IS '会话ID';
COMMENT ON COLUMN tbl_onlineuser.username IS '在线用户名称';
COMMENT ON COLUMN tbl_onlineuser.userrole IS '在线用户角色';
COMMENT ON COLUMN tbl_onlineuser.lastopttm IS '最后操作时间（距离1970的秒数）';
COMMENT ON COLUMN tbl_onlineuser.optsite IS '操作站点';


