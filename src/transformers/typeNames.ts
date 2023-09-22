import { TypeDocRawOutput } from "../types/typeDoc";

function typeNames(payload: TypeDocRawOutput) {
  const raw = payload.symbolIdMap;

  const flattenedKeys = Object.keys(raw)
    .map((key) => {
      return {
        name: raw[key].qualifiedName,
      };
    })
    .filter((v) => v.name && v.name !== "props");

  const deDupedKeys = flattenedKeys.filter(
    (v, i, a) => a.findIndex((t) => t.name === v.name) === i,
  );

  let currentParent = "";

  type Types = Array<{
    name: string;
    children: { name: string }[];
  }>;

  const types: Types = [];

  deDupedKeys.forEach((key) => {
    if (!key.name.includes("__type")) {
      currentParent = key.name;
      types.push({
        name: key.name,
        children: [],
      });
    }

    if (key.name.includes("__type")) {
      const parentIndex = types.findIndex(
        (type) => type.name === currentParent,
      );

      const keyName = key.name.split(".")[1];
      if (parentIndex > -1 && keyName) {
        types[parentIndex].children.push({
          name: keyName,
        });
      }
    }
  });

  return types;
}

export { typeNames };
