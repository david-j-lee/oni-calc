import React, { useEffect, useState } from 'react';
import { useContext } from '../../context';

// material
import { makeStyles } from '@material-ui/styles';

// components
import BuildingsGridGroup from './BuildingsGridGroup';

export const BuildingsGrid = () => {
  const classes = useStyles();

  const [
    { buildings, collapseBuildingPanels, collapseBuildingPanelsTrigger },
  ] = useContext();

  const [groupedBuildings, setGroupedBuildings] = useState(null);

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

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 1),
  },
}));

export default BuildingsGrid;
