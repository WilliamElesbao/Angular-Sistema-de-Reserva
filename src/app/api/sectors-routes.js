import { Router } from "express";
import db from "./db-connection.js";

const router = Router();

router.get("/", (req, res) => {
  const query = `
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
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Erro ao buscar os sectors:", err);
      res.status(500).send("Erro ao buscar os sectors.");
    } else {
      const groupedData = {};
      result.forEach((sector) => {
        if (!groupedData[sector.sectorId]) {
          groupedData[sector.sectorId] = {
            sectorId: sector.sectorId,
            sectorName: sector.sectorName,
            stations: [],
          };
        }

        groupedData[sector.sectorId].stations.push({
          stationId: sector.stationId,
          stationName: sector.stationName,
          branch: sector.branch,
          pcType: sector.pcType,
          serialNumberPc: sector.serialNumberPc,
        });
      });

      const formattedData = Object.values(groupedData);

      res.status(200).json({ sectors: formattedData });
    }
  });
});

export default router;
