import { formatUSD } from "@sushiswap/format";
import { Typography } from "@sushiswap/ui";
import { FC } from "react";

import { CellProps } from "./types";

export const PairFees7dCell: FC<CellProps> = ({ row }) => {
  const volume = formatUSD(row.fees1w);

  return (
    <Typography variant="sm" weight={600} className="text-right text-slate-50">
      {volume.includes("NaN") ? "$0.00" : volume}
    </Typography>
  );
};
