CREATE TABLE tbl_hostinfo
(
  id VARCHAR(64) NOT NULL,
  cpuusage VARCHAR(16),
  memeryusage VARCHAR(16),
  diskusage VARCHAR(16),
  lastopttm VARCHAR(32),
  CONSTRAINT tbl_hostinfo_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE tbl_hostinfo
  OWNER TO uxdbwebuser;
COMMENT ON COLUMN tbl_hostinfo.id IS '站点ID';
COMMENT ON COLUMN tbl_hostinfo.cpuusage IS 'CPU使用率';
COMMENT ON COLUMN tbl_hostinfo.memeryusage IS '内存使用率';
COMMENT ON COLUMN tbl_hostinfo.diskusage IS '磁盘使用率';
COMMENT ON COLUMN tbl_hostinfo.lastopttm IS '最后一次更新时间';