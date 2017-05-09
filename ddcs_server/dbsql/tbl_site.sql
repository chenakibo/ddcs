CREATE TABLE tbl_site
(
  id varchar(64) NOT NULL,
  sitename varchar(64),
  ip varchar(32),
  port varchar(10),
  type char,
  firsttm varchar(32),
  state char,
  latesttm varchar(32),
  CONSTRAINT tbl_site_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE tbl_site OWNER TO uxdbwebuser;
COMMENT ON COLUMN tbl_site.id IS '站点ID,IP和类型生成唯一标识';
COMMENT ON COLUMN tbl_site.sitename IS '站点名称';
COMMENT ON COLUMN tbl_site.ip IS '站点IP';
COMMENT ON COLUMN tbl_site.port IS '端口';
COMMENT ON COLUMN tbl_site.type IS '类型';
COMMENT ON COLUMN tbl_site.firsttm IS '首次发现时间';
COMMENT ON COLUMN tbl_site.state IS '状态，启动[1],故障[2]';
COMMENT ON COLUMN tbl_site.latesttm IS '最近一次心跳时间';