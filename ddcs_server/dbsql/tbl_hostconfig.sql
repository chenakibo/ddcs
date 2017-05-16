CREATE TABLE tbl_hostconfig
(
  id serial NOT NULL,
  hostname VARCHAR(32),
  platform VARCHAR(32),
  arch VARCHAR(32),
  ip VARCHAR(32),
  cpuInfo VARCHAR(64),
  cpuNumber VARCHAR(16),
  totalMem VARCHAR(32)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE tbl_hostconfig
  OWNER TO uxdbwebuser;
COMMENT ON COLUMN tbl_hostconfig.id IS '主机信息ID';
COMMENT ON COLUMN tbl_hostconfig.hostname IS '主机名';
COMMENT ON COLUMN tbl_hostconfig.platform IS '主机操作系统平台';
COMMENT ON COLUMN tbl_hostconfig.arch IS '主机的CPU架构';
COMMENT ON COLUMN tbl_hostconfig.ip IS '主机IP地址';
COMMENT ON COLUMN tbl_hostconfig.cpuInfo IS '主机CPU信息';
COMMENT ON COLUMN tbl_hostconfig.cpuNumber IS '主机CPU数量';
COMMENT ON COLUMN tbl_hostconfig.totalMem IS '主机总内存';