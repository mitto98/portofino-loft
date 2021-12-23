import { PortofinoValue } from "types/Portofino";

export interface DbConnectionSchema {
  catalog: string | null;
  name: string | null;
  schema: string;
  selected: boolean;
  liquibase: boolean;
}

export interface DbConnection {
  databaseName: PortofinoValue;
  description: PortofinoValue;
  driver: PortofinoValue;
  entityMode: PortofinoValue;
  errorMessage: PortofinoValue;
  falseString: PortofinoValue;
  hibernateDialect: PortofinoValue;
  jndiResource: PortofinoValue;
  lastTested: PortofinoValue;
  password: PortofinoValue;
  status: PortofinoValue;
  trueString: PortofinoValue;
  url: PortofinoValue;
  username: PortofinoValue;
  schemas: DbConnectionSchema[];
}

export interface DbConnectionSummary {
  name: string;
  status: string;
  description: string;
}
