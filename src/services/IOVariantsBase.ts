import IIO from '../interfaces/IIO';
import IIOEntity, { IIOEntityBase } from '../interfaces/IIOEntity';
import IIOTotal from '../interfaces/IIOTotal';
import IResource, { IResourceBase } from '../interfaces/IResource';
import IVariantInput from '../interfaces/IVariantInput';
import {
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
    records: IIOEntity[],
    inputs?: IVariantInput[],
  ): T[] {
    if (inputs) {
      return this.getWithInputs(records, inputs) as T[];
    } else {
      return this.getDefault(records) as T[];
    }
  }

  public static getDefault(records: IIOEntityBase[]): IIOEntity[] {
    return records.map((record) => ({
      ...record,
      quantity: 0,
      utilization: 100,
      variantUtilizations:
        record.variants?.map((_variant, index) => (index === 0 ? 100 : 0)) ??
        [],
      inputs: [],
      outputs: [],
    }));
  }

  public static getResourceData(
    records: IIOEntity[],
    resource: IResourceBase,
  ): IIOTotal {
    const inputs = this.getIOsForResource(records, 'inputs', resource.name);
    const outputs = this.getIOsForResource(records, 'outputs', resource.name);
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
    records: IIOEntity[],
    resources: IResource[],
    name: string,
    quantity: number,
  ) {
    const newRecords = records.map((record) =>
      record.name === name
        ? {
            ...record,
            quantity,
          }
        : record,
    );

    this.saveToLocalStorage(newRecords);

    return {
      resources: this.updateResources(newRecords, resources),
      [this.key]: newRecords,
    };
  }

  public static setUtilization(
    buildings: IIOEntity[],
    resources: IResource[],
    name: string,
    utilization: number,
  ) {
    const newRecords = buildings.map((record) =>
      record.name === name
        ? {
            ...record,
            utilization: utilization,
          }
        : record,
    );

    this.saveToLocalStorage(newRecords);

    const newResources = this.updateResources(newRecords, resources);
    return {
      buildings: newRecords,
      resources: newResources,
    };
  }

  public static setVariantUtilization(
    buildings: IIOEntity[],
    resources: IResource[],
    name: string,
    variantUtilizations: number[],
  ) {
    const newRecords = buildings.map((building) => {
      if (building.name !== name) {
        return building;
      }
      const { inputs, outputs } = this.getIOFromVariantUtilizations({
        ...building,
        variantUtilizations,
      });
      return { ...building, inputs, outputs, variantUtilizations };
    });

    this.saveToLocalStorage(newRecords);

    const newResources = this.updateResources(newRecords, resources);
    return {
      buildings: newRecords,
      resources: newResources,
    };
  }

  public static clearInputs(records: IIOEntity[], resources: IResource[]) {
    const newRecords = this.getWithClearedInputs(records);
    return {
      resources: this.updateResources(records, resources),
      [this.key]: newRecords,
    };
  }

  protected static getWithInputs(
    records: IIOEntity[],
    inputs: IVariantInput[],
  ): IIOEntity[] {
    return records.map((record) => {
      const inputsByName = getInputsByName(inputs);
      const input = inputsByName[record.name] as IVariantInput;

      const variantUtilizations =
        input &&
        input.variantUtilizations &&
        input.variantUtilizations.length > 0
          ? input.variantUtilizations
          : (record.variants?.map((_variant, index) =>
              index === 0 ? 100 : 0,
            ) ?? []);

      const updatedRecord = {
        ...record,
        quantity: input?.quantity ?? 0,
        utilization: input?.utilization ? input.utilization : 100,
        variantUtilizations,
      };

      const { inputs: variantInputs, outputs: variantOutputs } =
        this.getIOFromVariantUtilizations(updatedRecord);

      return {
        ...updatedRecord,
        inputs: variantInputs ?? [],
        outputs: variantOutputs ?? [],
      };
    });
  }

  protected static getSavableRecords(records: IIOEntity[]): object[] {
    return records.map((record) => ({
      name: record.name,
      quantity: record.quantity ?? 0,
      utilization: record.utilization ?? 100,
      variantUtilizations: record.variantUtilizations ?? [],
    }));
  }

  protected static getExtendedValue(record: IIOEntity, io: IIO) {
    return (
      record.quantity *
      (io.value as number) *
      (record.utilization / 100) *
      (io.utilization / 100)
    );
  }

  private static getIOsForResource(
    records: IIOEntity[],
    type: 'inputs' | 'outputs',
    resourceName: string,
  ): IIO[] {
    if (type !== 'inputs' && type !== 'outputs') {
      throw new Error('Type must be inputs or outputs');
    }

    const newRecords = records.filter((record) => record.quantity > 0);

    if (newRecords.length === 0) return [];

    return newRecords
      .map((record) => this.getIOs(record, type, resourceName))
      .reduce((a, b) => a.concat(b), []);
  }

  private static getIOs(
    record: IIOEntity,
    type: keyof IIOEntity,
    resourceName: string,
  ): IIO[] {
    if (record[type] === undefined) return [];

    const ios = (record[type] as IIO[]).filter(
      (io: IIO) => io.name === resourceName,
    );

    if (ios.length === 0) return [];

    return ios.map((io) => {
      const standardIO = getStandardIO(io) as IIO;
      return {
        ...io,
        record,
        valueExtended: this.getExtendedValue(record, standardIO),
        rate: standardIO.rate,
      };
    });
  }

  private static getWithClearedInputs(records: IIOEntity[]) {
    const clearedRecords = this.getDefault(records);
    this.saveToLocalStorage(clearedRecords);
    return clearedRecords;
  }

  private static getIOFromVariantUtilizations(entity: IIOEntity): {
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
            valueExtended: this.getExtendedValue(entity, {
              ...(getStandardIO(input) as IIO),
              utilization: 100,
            }),
            utilization: 100,
          })) ?? [],
        outputs:
          firstVariant.outputs?.map((output) => ({
            ...output,
            valueExtended: this.getExtendedValue(entity, {
              ...(getStandardIO(output) as IIO),
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

        // If a building has no variants or only one, always use 100. This should
        // be how the app handles this so this is more of a backup/failsafe.
        const normalizedUtilization =
          !entity.variants || entity.variants?.length === 1 ? 100 : utilization;

        variant.inputs?.forEach((input) =>
          inputs.push({
            ...input,
            valueExtended: this.getExtendedValue(entity, {
              ...(getStandardIO(input) as IIO),
              utilization,
            }),
            utilization: normalizedUtilization,
          }),
        );
        variant.outputs?.forEach((output) =>
          outputs.push({
            ...output,
            valueExtended: this.getExtendedValue(entity, {
              ...(getStandardIO(output) as IIO),
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
    records: IIOEntity[],
    resources: IResource[],
  ) {
    return resources.map((resource) => {
      const updatedResource = {
        ...resource,
        subtotals: {
          ...resource.subtotals,
          [this.key]: this.getResourceData(records, resource),
        },
      };
      updatedResource.totalInput = getTotalInput(updatedResource);
      updatedResource.totalOutput = getTotalOutput(updatedResource);

      return {
        ...updatedResource,
        totalIO: updatedResource.totalOutput - updatedResource.totalInput,
      };
    });
  }

  protected static saveToLocalStorage(records: IIOEntity[]) {
    localStorage.setItem(
      this.key,
      JSON.stringify(this.getSavableRecords(records)),
    );
  }
}
