type GetEntryPointsOptions = {
  entryPoints: Array<string>;
};

function getEntryPoints({ entryPoints }: GetEntryPointsOptions) {
  return entryPoints;
}

export { getEntryPoints };
export type { GetEntryPointsOptions };
