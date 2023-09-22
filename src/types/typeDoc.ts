export type TypeDocRawOutput = {
  children: Array<{
    name: string;
    type: {
      declaration: {
        children: Array<{
          name: string;
          type: {
            name: string;
          };
        }>;
      };
      types: Array<{
        typeArguments: Array<{
          types: Array<{
            declaration: {
              children: Array<{
                name: string;
                type: {
                  name: string;
                };
              }>;
            };
          }>;
        }>;
      }>;
    };
    signatures: Array<{
      parameters: Array<{
        name: string;
        type: {
          types: Array<{
            typeArguments: Array<{
              types: Array<{
                declaration: {
                  children: Array<{
                    name: string;
                    type: {
                      name: string;
                    };
                  }>;
                };
              }>;
            }>;
          }>;
        };
      }>;
    }>;
  }>;
  symbolIdMap: {
    [key: string]: {
      qualifiedName: string;
    };
  };
};
