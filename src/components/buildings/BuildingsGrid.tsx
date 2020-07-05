import React, { FC, useEffect, useState } from 'react';
import { useContext } from '../../context';

// material
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';

// components
import BuildingsGridGroup from './BuildingsGridGroup';

export const BuildingsGrid: FC = () => {
  const classes = useStyles();

  const [
    { buildings, collapseBuildingPanels, collapseBuildingPanelsTrigger },
  ] = useContext();

  const [groupedBuildings, setGroupedBuildings] = useState<object | null>(null);

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
    }, {});
    setGroupedBuildings(grouped);
  }, [buildings]);

  return (
    <div className={classes.root}>
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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 1),
  },
}));

export default BuildingsGrid;
