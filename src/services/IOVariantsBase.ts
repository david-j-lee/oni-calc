import { IGameMode } from '../interfaces/IGameMode';
import IIO from '../interfaces/IIO';
import IIOEntity, { IIOEntityBase } from '../interfaces/IIOEntity';
import IIOTotal from '../interfaces/IIOTotal';
import IResource, { IResourceBase } from '../interfaces/IResource';
import IState from '../interfaces/IState';
import IVariantInput from '../interfaces/IVariantInput';
import {
  getGameModeValue,
  getInputsByName,
  getIOTotal,
  getStandardIO,
  getTotalInput,
  getTotalOutput,
} from '../utils/commonUtils';

export default abstract class IOVariantsBase {
  constructor() {}

  public static key = 'base';

  public static getAll<T extends IIOEntity>(
    gameMode: IGameMode,
    entities: IIOEntity[],
    inputs?: IVariantInput[],
  ): T[] {
    if (inputs) {
      return this.getWithInputs(gameMode, entities, inputs) as T[];
    } else {
      return this.getDefault(entities) as T[];
    }
  }

  public static getDefault(entities: IIOEntityBase[]): IIOEntity[] {
    return entities.map((entity) => ({
      ...entity,
      quantity: 0,
      utilization: 100,
      variantUtilizations:
        entity.variants?.map((_variant, index) => (index === 0 ? 100 : 0)) ??
        [],
      inputs: [],
      outputs: [],
    }));
  }

  public static getResourceData(
    gameMode: IGameMode,
    entities: IIOEntity[],
    resource: IResourceBase,
  ): IIOTotal {
    const inputs = this.getIOsForResource(
      gameMode,
      entities,
      'inputs',
      resource.name,
    );
    const outputs = this.getIOsForResource(
      gameMode,
      entities,
      'outputs',
      resource.name,
    );
    const totalInput = getIOTotal(inputs);
    const totalOutput = getIOTotal(outputs);

    return {
      inputs,
      outputs,
      totalInput,
      totalOutput,
      total: totalOutput - totalInput,
    };
  }

  public static setQuantity(
    gameMode: IGameMode,
    entities: IIOEntity[],
    resources: IResource[],
    name: string,
    quantity: number,
  ): Partial<IState> {
    const newEntities = entities.map((entity) => {
      if (entity.name !== name) {
        return entity;
      }
      const { inputs, outputs } = this.getIOFromVariantUtilizations(gameMode, {
        ...entity,
        quantity,
      });
      return { ...entity, inputs, outputs, quantity };
    });

    this.saveToLocalStorage(newEntities);

    return {
      resources: this.updateResources(gameMode, newEntities, resources),
      [this.key]: newEntities,
    };
  }

  public static setUtilization(
    gameMode: IGameMode,
    entities: IIOEntity[],
    resources: IResource[],
    name: string,
    utilization: number,
  ) {
    const newEntities = entities.map((entity) => {
      if (entity.name !== name) {
        return entity;
      }
      const { inputs, outputs } = this.getIOFromVariantUtilizations(gameMode, {
        ...entity,
        utilization,
      });
      return { ...entity, inputs, outputs, utilization };
    });

    this.saveToLocalStorage(newEntities);

    const newResources = this.updateResources(gameMode, newEntities, resources);
    return {
      resources: newResources,
      [this.key]: newEntities,
    } as Partial<IState>;
  }

  public static setVariantUtilization(
    gameMode: IGameMode,
    entities: IIOEntity[],
    resources: IResource[],
    name: string,
    variantUtilizations: number[],
  ) {
    const newEntities = entities.map((entity) => {
      if (entity.name !== name) {
        return entity;
      }
      const { inputs, outputs } = this.getIOFromVariantUtilizations(gameMode, {
        ...entity,
        variantUtilizations,
      });
      return { ...entity, inputs, outputs, variantUtilizations };
    });

    this.saveToLocalStorage(newEntities);

    const newResources = this.updateResources(gameMode, newEntities, resources);
    return {
      resources: newResources,
      [this.key]: newEntities,
    } as Partial<IState>;
  }

  public static clearInputs(
    gameMode: IGameMode,
    entities: IIOEntity[],
    resources: IResource[],
  ) {
    const newEntities = this.getWithClearedInputs(entities);
    return {
      resources: this.updateResources(gameMode, entities, resources),
      [this.key]: newEntities,
    } as Partial<IState>;
  }

  protected static getWithInputs(
    gameMode: IGameMode,
    entities: IIOEntity[],
    inputs: IVariantInput[],
  ): IIOEntity[] {
    return entities.map((entity) => {
      const inputsByName = getInputsByName(inputs);
      const input = inputsByName[entity.name];

      const variantUtilizations =
        input &&
        input.variantUtilizations &&
        input.variantUtilizations.length > 0
          ? input.variantUtilizations
          : (entity.variants?.map((_variant, index) =>
              index === 0 ? 100 : 0,
            ) ?? []);

      const updatedEntity = {
        ...entity,
        quantity: input?.quantity ?? 0,
        utilization: input?.utilization ? input.utilization : 100,
        variantUtilizations,
      };

      const { inputs: variantInputs, outputs: variantOutputs } =
        this.getIOFromVariantUtilizations(gameMode, updatedEntity);

      return {
        ...updatedEntity,
        inputs: variantInputs ?? [],
        outputs: variantOutputs ?? [],
      };
    });
  }

  protected static getSavableEntities(entities: IIOEntity[]): object[] {
    return entities.map((entity) => ({
      name: entity.name,
      quantity: entity.quantity ?? 0,
      utilization: entity.utilization ?? 100,
      variantUtilizations: entity.variantUtilizations ?? [],
    }));
  }

  protected static getExtendedValue(
    gameMode: IGameMode,
    entity: IIOEntity,
    io: IIO,
  ) {
    return (
      entity.quantity *
      getGameModeValue(gameMode, io.value) *
      (entity.utilization / 100) *
      (io.utilization / 100)
    );
  }

  private static getIOsForResource(
    gameMode: IGameMode,
    entities: IIOEntity[],
    type: 'inputs' | 'outputs',
    resourceName: string,
  ): IIO[] {
    if (type !== 'inputs' && type !== 'outputs') {
      throw new Error('Type must be inputs or outputs');
    }

    const newEntities = entities.filter((entity) => entity.quantity > 0);

    if (newEntities.length === 0) return [];

    return newEntities
      .map((entity) => this.getIOs(gameMode, entity, type, resourceName))
      .reduce((a, b) => a.concat(b), []);
  }

  private static getIOs(
    gameMode: IGameMode,
    entity: IIOEntity,
    type: keyof IIOEntity,
    resourceName: string,
  ): IIO[] {
    if (entity[type] === undefined) return [];

    const ios = (entity[type] as IIO[]).filter(
      (io: IIO) => io.name === resourceName,
    );

    if (ios.length === 0) return [];

    return ios.map((io) => {
      const standardIO = getStandardIO(gameMode, io) as IIO;
      return {
        ...io,
        entity,
        valueExtended: this.getExtendedValue(gameMode, entity, standardIO),
        rate: standardIO.rate,
      };
    });
  }

  private static getWithClearedInputs(entities: IIOEntity[]) {
    const clearedEntities = this.getDefault(entities);
    this.saveToLocalStorage(clearedEntities);
    return clearedEntities;
  }

  private static getIOFromVariantUtilizations(
    gameMode: IGameMode,
    entity: IIOEntity,
  ): {
    inputs: IIO[];
    outputs: IIO[];
  } {
    // Get from the first if there are no variant utilizations
    if (
      entity.variants &&
      (!entity.variantUtilizations || entity.variantUtilizations.length === 0)
    ) {
      const firstVariant = entity.variants[0];
      return {
        inputs:
          firstVariant.inputs?.map((input) => ({
            ...input,
            valueExtended: this.getExtendedValue(gameMode, entity, {
              ...(getStandardIO(gameMode, input) as IIO),
              utilization: 100,
            }),
            utilization: 100,
          })) ?? [],
        outputs:
          firstVariant.outputs?.map((output) => ({
            ...output,
            valueExtended: this.getExtendedValue(gameMode, entity, {
              ...(getStandardIO(gameMode, output) as IIO),
              utilization: 100,
            }),
            utilization: 100,
          })) ?? [],
      };
    }

    // If there are variantUtilizations, construct the inputs and outputs from
    // them.
    const inputs: IIO[] = [];
    const outputs: IIO[] = [];

    entity.variantUtilizations?.forEach((utilization, index) => {
      if (entity.variants && utilization > 0) {
        const variant = entity.variants[index];

        // If a entity has no variants or only one, always use 100. This should
        // be how the app handles this so this is more of a backup/failsafe.
        const normalizedUtilization =
          !entity.variants || entity.variants?.length === 1 ? 100 : utilization;

        variant.inputs?.forEach((input) =>
          inputs.push({
            ...input,
            valueExtended: this.getExtendedValue(gameMode, entity, {
              ...(getStandardIO(gameMode, input) as IIO),
              utilization,
            }),
            utilization: normalizedUtilization,
          }),
        );
        variant.outputs?.forEach((output) =>
          outputs.push({
            ...output,
            valueExtended: this.getExtendedValue(gameMode, entity, {
              ...(getStandardIO(gameMode, output) as IIO),
              utilization,
            }),
            utilization: normalizedUtilization,
          }),
        );
      }
    });

    return { inputs, outputs };
  }

  protected static updateResources(
    gameMode: IGameMode,
    entities: IIOEntity[],
    resources: IResource[],
  ) {
    return resources.map((resource) => {
      const updatedResource = {
        ...resource,
        subtotals: {
          ...resource.subtotals,
          [this.key]: this.getResourceData(gameMode, entities, resource),
        },
      };
      updatedResource.totalInput = getTotalInput(updatedResource);
      updatedResource.totalOutput = getTotalOutput(updatedResource);

      return {
        ...updatedResource,
        total: updatedResource.totalOutput - updatedResource.totalInput,
      };
    });
  }

  protected static saveToLocalStorage(entities: IIOEntity[]) {
    localStorage.setItem(
      this.key,
      JSON.stringify(this.getSavableEntities(entities)),
    );
  }
}
