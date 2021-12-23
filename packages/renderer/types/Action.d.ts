export type ActionDescriptionRecord = Record<string, ActionDescription>;

enum PermissionLevel {
  VIEW = "VIEW",
}

interface PermissionGroup {
  level: PermissionLevel;
  name: string;
  permissions: any[];
  actualAccessLevel: PermissionLevel;
}

interface AdditionalChild {
  segment: string;
  path: string;
}

export interface ActionDescription {
  path: string;
  class: string;
  superclass: string;
  maxParameters: number;
  minParameters: number;
  children: string[];
  parameters: any[]; //TODO
  page: {
    permissions: {
      group: PermissionGroup[];
    };
  };
  "additional-child": AdditionalChild[];
}
