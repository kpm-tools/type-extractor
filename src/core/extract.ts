import {
  getEntryPoints,
  type GetEntryPointsOptions,
} from "../helpers/getEntryPoints";
import { getRawTypes, type TypeDocOptions } from "../helpers/getRawTypes";
import { typeNames } from "../transformers/typeNames";
import { typeNamesAndValues } from "../transformers/typeNamesAndValues";

type ExtractOptions = {
  entryPoints: GetEntryPointsOptions["entryPoints"];
  transformer?:
    | "typeNames"
    | "typeNamesAndValues"
    | ((value: unknown) => any)
    | undefined;
} & TypeDocOptions;

const internalExtractOptions = ["transformer"];

async function extract(options: ExtractOptions) {
  const entryPoints = getEntryPoints({ entryPoints: options.entryPoints });

  const onlyTypeDocOptions = Object.fromEntries(
    Object.entries(options).filter(
      ([key]) => !internalExtractOptions.includes(key),
    ),
  );

  const rawTypes = await getRawTypes({
    ...onlyTypeDocOptions,
    entryPoints,
  });

  if (typeof options?.transformer === "function") {
    return options.transformer(rawTypes);
  }

  if (options?.transformer === "typeNames") {
    return typeNames(rawTypes);
  }

  if (options.transformer === "typeNamesAndValues") {
    return typeNamesAndValues(rawTypes);
  }

  return rawTypes;
}

export { extract };
