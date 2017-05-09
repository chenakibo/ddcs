CREATE TABLE tbl_user
(
  id serial NOT NULL,
  username varchar(64) NOT NULL UNIQUE,
  password varchar(64) NOT NULL,
  email varchar(64),
  usertype char NOT NULL,
  mobile varchar(32) NOT NULL,
  createtime varchar(32),
  lastmodtime varchar(32),
  CONSTRAINT tbl_user_pkey PRIMARY KEY (username)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE tbl_user
  OWNER TO uxdbwebuser;
COMMENT ON COLUMN tbl_user.username IS '用户名称';
COMMENT ON COLUMN tbl_user.password IS '用户密码';
COMMENT ON COLUMN tbl_user.password IS '用户邮箱';
COMMENT ON COLUMN tbl_user.usertype IS '用户类型
0：管理员
1：普通用户';
COMMENT ON COLUMN tbl_user.password IS '手机号码';
COMMENT ON COLUMN tbl_user.createtime IS '首次记录时间';
COMMENT ON COLUMN tbl_user.lastmodtime IS '最后一次修改时间';

