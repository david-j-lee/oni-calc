import { useContext } from '../../context/context';
import IBuildingsGrouped from '../../interfaces/IBuildingsGrouped';
import BuildingsGridGroup from './BuildingsGridGroup';
import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';
import { FC, useEffect, useState } from 'react';

export const BuildingsGrid: FC = () => {
  const [{ buildings, collapseBuildingPanels, collapseBuildingPanelsTrigger }] =
    useContext();

  const [groupedBuildings, setGroupedBuildings] =
    useState<IBuildingsGrouped | null>(null);

  useEffect(() => {
    const grouped = buildings.reduce((acc, building) => {
      const normalizedName = building.category
        .toLowerCase()
        .split(' ')
        .join('-');
      if (!acc[normalizedName]) {
        acc[normalizedName] = {
          name: building.category,
          normalizedName,
          image: `/images/building-categories/${normalizedName}.png`,
          buildings: [building],
        };
      } else {
        acc[normalizedName].buildings.push(building);
      }
      return acc;
    }, {} as IBuildingsGrouped);
    setGroupedBuildings(grouped);
  }, [buildings]);

  return (
    <div css={rootCss}>
      {groupedBuildings &&
        Object.values(groupedBuildings).map((group) => (
          <BuildingsGridGroup
            key={group.normalizedName}
            group={group}
            collapseBuildingPanels={collapseBuildingPanels}
            collapseBuildingPanelsTrigger={collapseBuildingPanelsTrigger}
          />
        ))}
    </div>
  );
};

const rootCss = (theme: Theme) =>
  css({
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 1),
  });

export default BuildingsGrid;
