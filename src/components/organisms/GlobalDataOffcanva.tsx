import React from "react";
import { OffcanvasPlacement } from "react-bootstrap/esm/Offcanvas";
import CustomOffCanvas from "../molecules/CustomOffCanvas";
import GlobalDataList from "../molecules/GlobalDataList";

type OffcanvaTypes = {
  open: boolean;
  onClose: () => void;
  placement?: OffcanvasPlacement;
  maxStat?: { name: string; value: number };
  globalStats: { name: string; value: string }[];
};

const GlobalDataOffcanva: React.FC<OffcanvaTypes> = (props) => {
  return (
    <CustomOffCanvas
      placement={props.placement}
      onClose={props.onClose}
      open={props.open}
    >
      {props?.globalStats?.length < 1 && (
        <p>
          Todavia no hay ningún heroe en tu equipo, agregalos para ver las
          estadísticas generales del equipo
        </p>
      )}

      {props.globalStats.length > 0 && (
        <GlobalDataList
          globalStats={props.globalStats}
          maxStat={props.maxStat}
        />
      )}
    </CustomOffCanvas>
  );
};

export default GlobalDataOffcanva;
