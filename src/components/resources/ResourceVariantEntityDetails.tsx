import { useContext } from '../../context/useContext';
import { getStandardIO } from '../../utils/commonUtils';
import { updatePercentagesProportionally } from '../../utils/mathUtils';
import DetailsSection from '../ui/DetailsSection';
import { IEntityDetailsProps } from '../ui/IOGridCard';
import NumberInput from '../ui/NumberInput';
import ResourceChips from './ResourceChips';
import { ArrowRightAlt } from '@mui/icons-material';
import { css, Grid, Slider, Theme, Typography } from '@mui/material';
import { Fragment, useCallback, useRef, useState } from 'react';

export const ResourceVariantEntityDetails = ({
  entity,
  setQuantity: setEntityQuantity,
  setUtilization: setEntityUtilization,
  setVariantUtilization: setEntityVariantUtilization,
  showAllVariants,
}: IEntityDetailsProps) => {
  const [quantity, setQuantity] = useState(entity.quantity || 0);
  const [utilization, setUtilization] = useState(entity.utilization ?? 0);
  const [variantUtilizations, setVariantUtilizations] = useState(
    entity.variantUtilizations ?? [],
  );
  const [
    {
      settings: { gameMode },
    },
  ] = useContext();

  const timer = useRef<number | null>(null);
  const utilizationTimer = useRef<number | null>(null);
  const variantUtilizationTimer = useRef<number | null>(null);

  // change quantities
  const increment = useCallback(() => {
    setQuantity(quantity + 1);
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setEntityQuantity(entity.name, quantity + 1);
    }, 500);
  }, [entity.name, quantity, setEntityQuantity]);

  const decrement = useCallback(() => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setEntityQuantity(entity.name, quantity - 1);
      }, 500);
    }
  }, [entity.name, quantity, setEntityQuantity]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const valueString = event.target.value;
      let value = Number(valueString);
      if (value < 0) value = 0;

      setQuantity(value);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        setEntityQuantity(entity.name, value);
      }, 500);
    },
    [entity.name, setEntityQuantity],
  );

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
        setEntityUtilization(entity.name, Math.round(value));
      }, 500);
    },
    [entity.name, setEntityUtilization],
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
        setEntityVariantUtilization(entity.name, newVariantUtilizations);
      }, 500);
    },
    [entity.name, setEntityVariantUtilization, variantUtilizations],
  );

  if (!entity.variants || entity.variants.length == 0) {
    return null;
  }
  return (
    <Grid container css={scrollCss}>
      {showAllVariants ? (
        <Fragment>
          <Grid item xs={12} sm={6}>
            <DetailsSection title="Quantity">
              <NumberInput
                label="Quantity"
                value={quantity}
                onChange={handleChange}
                decrement={decrement}
                increment={increment}
              />
            </DetailsSection>
          </Grid>
          <Grid item xs={12} sm={6} css={gridCss}>
            {entity.variants &&
              entity.variants.length > 0 &&
              entity.quantity > 0 && (
                <DetailsSection title="Utilization" center>
                  <div css={sliderCss}>
                    <Slider
                      value={utilization}
                      onChange={handleSliderChange}
                      valueLabelFormat={(number) => number.toFixed(0) + '%'}
                      valueLabelDisplay="auto"
                    />
                  </div>
                </DetailsSection>
              )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailsSection>
              <Typography>Variants</Typography>
            </DetailsSection>
            {entity.variants.map((variant, index) => (
              <div key={index}>
                <DetailsSection title={`Variant ${index + 1}`}>
                  {variant.inputs && variant.inputs.length > 0 && (
                    <ResourceChips ios={variant.inputs} />
                  )}
                  <ArrowRightAlt />
                  {variant.outputs && variant.outputs.length > 0 && (
                    <ResourceChips ios={variant.outputs} />
                  )}
                  {entity.variants && entity.variants.length > 1 && (
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
                  )}
                </DetailsSection>
              </div>
            ))}
          </Grid>
          <Grid item xs={12} sm={6}>
            <DetailsSection>
              <Typography>Calculated</Typography>
            </DetailsSection>
            {entity.quantity > 0 &&
              entity.inputs &&
              entity.inputs.length > 0 && (
                <DetailsSection title="Inputs">
                  <ResourceChips
                    ios={entity.inputs.map((input) =>
                      getStandardIO(gameMode, input),
                    )}
                  />
                </DetailsSection>
              )}
            {entity.quantity > 0 &&
              entity.outputs &&
              entity.outputs.length > 0 && (
                <DetailsSection title="Outputs">
                  <ResourceChips
                    ios={entity.outputs.map((output) =>
                      getStandardIO(gameMode, output),
                    )}
                  />
                </DetailsSection>
              )}
          </Grid>
        </Fragment>
      ) : (
        <Grid item xs={12} sm={12}>
          {entity.variants[0] && (
            <Fragment>
              {entity.variants[0].inputs &&
                entity.variants[0].inputs.length > 0 && (
                  <DetailsSection title="Inputs">
                    <ResourceChips ios={entity.variants[0].inputs} />
                  </DetailsSection>
                )}
              {entity.variants[0].outputs &&
                entity.variants[0].outputs.length > 0 && (
                  <DetailsSection title="Outputs">
                    <ResourceChips ios={entity.variants[0].outputs} />
                  </DetailsSection>
                )}
            </Fragment>
          )}
          {entity.variants.length > 1 && (
            <DetailsSection>
              <Typography>
                +{entity.variants.length - 1} variant
                {entity.variants.length > 2 ? 's' : ''}
              </Typography>
            </DetailsSection>
          )}
        </Grid>
      )}
    </Grid>
  );
};

const gridCss = css({
  display: 'flex',
});

const sliderCss = (theme: Theme) =>
  css({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 2),
  });

const scrollCss = css({
  overflow: 'auto',
});
