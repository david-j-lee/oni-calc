export function updatePercentagesProportionally(
  percentages: number[],
  index: number,
  newValue: number,
): number[] {
  const newPercentages = [...percentages];

  // Calculate the total sum before the update
  const totalBefore = newPercentages.reduce((acc, value) => acc + value, 0);

  // Update the specified index
  newPercentages[index] = newValue;

  // Calculate the difference that needs to be adjusted
  const diff = 100 - newPercentages.reduce((acc, value) => acc + value, 0);

  // Distribute the adjustment proportionally to all indices except the updated one
  const remainingIndexes = newPercentages
    .map((_, i) => i)
    .filter((i) => i !== index);

  const totalAdjustable = totalBefore - newPercentages[index];

  if (totalAdjustable !== 0) {
    for (const i of remainingIndexes) {
      // Distribute proportionally
      newPercentages[i] += (newPercentages[i] / totalAdjustable) * diff;
    }
  }

  // Ensure floating-point corrections are applied
  const totalAfter = newPercentages.reduce((acc, value) => acc + value, 0);

  if (Math.abs(totalAfter - 100) > 1e-10) {
    newPercentages[remainingIndexes[0]] += 100 - totalAfter;
  }

  return newPercentages.map((value) => Math.round(value));
}
