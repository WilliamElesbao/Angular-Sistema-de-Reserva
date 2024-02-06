SELECT 
    sectors.sector_id AS sectorId,
    sectors.sector_name AS sectorName,
    stations.station_id AS stationId,
    stations.station_name AS stationName,
    stations.branch AS branch,
    stations.pc_type AS pcType,
    LPAD(stations.serial_number_pc, 6, '0') AS serialNumberPc
  FROM sectors
  JOIN stations ON sectors.sector_id = stations.sector_id;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;

select * from sectors join stations on stations.sector_id = sectors.sector_id where sectors.sector_id = 1;




