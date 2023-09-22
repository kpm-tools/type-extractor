import { TypeDocRawOutput } from "../types/typeDoc";

type TypeNameAndValues = Array<{
  name: string;
  children: Array<{
    name: string;
    type?: string;
  }>;
}>;

// This file will need some love, but it's a start
function typeNamesAndValues(_raw: TypeDocRawOutput) {
  const raw = _raw.children;
  const types: TypeNameAndValues = [];

  raw.forEach((parent) => {
    const type: TypeNameAndValues[number] = {
      name: parent.name,
      children: [],
    };

    if (parent?.type?.declaration?.children) {
      parent.type.declaration.children.forEach((child) => {
        type.children.push({
          name: child.name,
          type: child.type.name,
        });
      });
    }

    if (parent?.signatures) {
      parent.signatures.forEach((_) => {
        _.parameters.forEach((child: any) => {
          // I believe __namedParameters isn't useful, so we filter out anything that has that name
          if (child.name !== "__namedParameters") {
            const childType: TypeNameAndValues[number] = {
              name: child.name,
              children: [],
            };

            if (child?.type?.types?.length > 0) {
              child.type.types.forEach((__: any) => {
                if (__.typeArguments.length > 0) {
                  __.typeArguments.forEach((___: any) => {
                    ___?.types &&
                      ___?.types.forEach((____: any) => {
                        ____?.declaration?.children.forEach((_____: any) => {
                          childType.children.push({
                            name: _____.name,
                            type: _____.type.name,
                          });
                        });
                      });
                  });
                }
              });
            }
            type.children.push(childType);
          }
        });
      });
    }
    types.push(type);
  });
  return types;
}

export { typeNamesAndValues };
