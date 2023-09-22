import typedoc, { type TypeDocOptions as TypeDocOptionsLib } from "typedoc";
import type { GetEntryPointsOptions } from "./getEntryPoints";
import { generateTemporaryOutFileName } from "./generateTemporaryOutFileName";
import fs from "fs/promises";
import { TypeDocRawOutput } from "../types/typeDoc";

type TypeDocOptions = Partial<TypeDocOptionsLib>;

type GetRawTypesOptions = {
  entryPoints: GetEntryPointsOptions["entryPoints"];
} & TypeDocOptions;

async function getRawTypes({
  entryPoints,
  ...typdocOptions
}: GetRawTypesOptions) {
  const app = await typedoc.Application.bootstrap({
    entryPoints: entryPoints,
    entryPointStrategy: typedoc.EntryPointStrategy.Expand,
    skipErrorChecking: true,
    ...typdocOptions,
  });

  const project = await app.convert();

  if (!project) {
    throw new Error("Failed to convert project");
  }

  const outFile = generateTemporaryOutFileName();

  await app.generateJson(project, outFile);

  const generatedFileContents = await fs.readFile(outFile, "utf-8");
  const rawTypes = JSON.parse(generatedFileContents);

  await fs.unlink(outFile);

  return rawTypes as TypeDocRawOutput;
}

export { getRawTypes };
export type { GetRawTypesOptions, TypeDocOptions };
