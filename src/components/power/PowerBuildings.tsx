import React, { FC, memo } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import IBuilding from '../../interfaces/IBuilding';

import Number from '../common/Number';

interface IProps {
  buildings: IBuilding[];
  title: string;
}

export const PowerBuildings: FC<IProps> = memo(({ buildings, title }) => {
  const classes = useStyles();

  return (
    <div>
      {buildings.length <= 0 ? (
        <Typography className={classes.noBuildings}>
          No {title.toLowerCase()} found
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size="small">Building</TableCell>
              <TableCell align="right" size="small">
                Quantity
              </TableCell>
              <TableCell align="right" size="small">
                Utilization
              </TableCell>
              <TableCell align="right" size="small">
                Total {title}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buildings.map((building, index) => {
              const value =
                Math.round(
                  ((building.quantity * building.utilization) / 100.0) *
                    (building.power.generation - building.power.usage) *
                    100.0,
                ) / 100.0;
              const unit = building.power.unit;

              return (
                <TableRow key={index}>
                  <TableCell size="small">{building.name}</TableCell>
                  <TableCell align="right" size="small">
                    {building.quantity}
                  </TableCell>
                  <TableCell align="right" size="small">
                    {building.utilization}%
                  </TableCell>
                  <TableCell align="right" size="small">
                    <Number value={value} suffix={' ' + unit} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
  noBuildings: {
    padding: theme.spacing(),
  },
}));

export default PowerBuildings;
