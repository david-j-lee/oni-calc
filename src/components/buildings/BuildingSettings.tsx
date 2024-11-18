import { useContext } from '../../context/useContext';
import IBuilding from '../../interfaces/IBuilding';
import { updatePercentagesProportionally } from '../../utils/mathUtils';
import ResourceChip from '../resources/ResourceChip';
import { ArrowRightAlt } from '@mui/icons-material';
import {
  Card,
  CardContent,
  css,
  Slider,
  Theme,
  Typography,
} from '@mui/material';
import { useCallback, useRef, useState } from 'react';

interface IProps {
  building: IBuilding;
}

export const BuildingSettings = ({ building }: IProps) => {
  const [, { setBuildingUtilization, setBuildingVariantUtilization }] =
    useContext();
  const [utilization, setUtilization] = useState(building.utilization ?? 0);
  const [variantUtilizations, setVariantUtilizations] = useState(
    building.variantUtilizations ?? [],
  );

  const utilizationTimer = useRef<number | null>(null);
  const variantUtilizationTimer = useRef<number | null>(null);

  const handleSliderChange = useCallback(
    (_event: Event, value: number | number[]) => {
      if (value instanceof Array) {
        return;
      }
      setUtilization(value);
      if (utilizationTimer.current) {
        clearTimeout(utilizationTimer.current);
      }
      utilizationTimer.current = setTimeout(() => {
        setBuildingUtilization(building.name, Math.round(value));
      }, 500);
    },
    [building.name, setBuildingUtilization],
  );

  const handleVariantSliderChange = useCallback(
    (_event: Event, index: number, value: number | number[]) => {
      if (value instanceof Array) {
        return;
      }

      const newVariantUtilizations = updatePercentagesProportionally(
        variantUtilizations,
        index,
        Math.round(value),
      );

      setVariantUtilizations(newVariantUtilizations);
      if (variantUtilizationTimer.current) {
        clearTimeout(variantUtilizationTimer.current);
      }
      variantUtilizationTimer.current = setTimeout(() => {
        setBuildingVariantUtilization(building.name, newVariantUtilizations);
      }, 500);
    },
    [building.name, setBuildingVariantUtilization, variantUtilizations],
  );

  return (
    <div css={rootCss}>
      <Typography variant="h5">{building.name}</Typography>
      <Typography variant="overline">Settings</Typography>
      {!building.hasConsistentIO && building.quantity > 0 && (
        <div>
          <Typography variant="subtitle1">Utilization</Typography>
          <div css={sliderCss}>
            <Slider
              value={utilization}
              onChange={handleSliderChange}
              valueLabelFormat={(number) => number.toFixed(0) + '%'}
              valueLabelDisplay="auto"
            />
          </div>
        </div>
      )}
      {building.variants && building.variants.length > 1 ? (
        building.variants.map((variant, index) => {
          return (
            <Card key={index} css={variantUtilizationCardCss}>
              <CardContent>
                <div css={ioInfoInlineCss}>
                  <div css={ioInfoInlineInputsCss}>
                    {variant.inputs &&
                      variant.inputs.map((input, index) => (
                        <ResourceChip key={index} io={input} />
                      ))}
                  </div>
                  <div css={ioInfoArrowCss}>
                    <ArrowRightAlt />
                  </div>
                  <div css={ioInfoInlineOutputsCss}>
                    {variant.outputs &&
                      variant.outputs.map((output, index) => (
                        <ResourceChip key={index} io={output} align="right" />
                      ))}
                  </div>
                </div>
                <div css={sliderCss}>
                  <Slider
                    value={variantUtilizations[index]}
                    onChange={(event, value) =>
                      handleVariantSliderChange(event, index, value)
                    }
                    valueLabelFormat={(number) => number.toFixed(0) + '%'}
                    valueLabelDisplay="auto"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <Typography>No settings to customize for this building</Typography>
      )}
    </div>
  );
};

const rootCss = (theme: Theme) =>
  css({
    minWidth: 400,
    maxWidth: 600,
    padding: theme.spacing(2),
  });

const sliderCss = (theme: Theme) =>
  css({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1.5, 0, 0),
  });

const variantUtilizationCardCss = (theme: Theme) =>
  css({
    '&:not(:last-child)': {
      marginBottom: theme.spacing(),
    },
  });

const ioInfoInlineCss = (theme: Theme) =>
  css({
    display: 'inline-flex',
    width: '100%',
    paddingTop: theme.spacing(),
  });

const ioInfoInlineInputsCss = (theme: Theme) =>
  css({
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingRight: theme.spacing(),
  });

const ioInfoInlineOutputsCss = (theme: Theme) =>
  css({
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: theme.spacing(),
  });

const ioInfoArrowCss = (theme: Theme) =>
  css({
    padding: theme.spacing(1, 0),
    display: 'flex',
    alignItems: 'center',
  });
