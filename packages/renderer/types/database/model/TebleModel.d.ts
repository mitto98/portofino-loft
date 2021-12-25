export interface TableModel {
  tableName: string;
  entityName: string | null;
  shortName: string | null;
  javaClass: string | null;
  primaryKey: string | null;
  qualifiedName: string;
  idStrategy: string | null;
  annotation: any[];
  columns: TableColumn[];
  foreignKey: ForeignKey[];
  query: any[];
}

interface TableColumn {
  columnName: string;
  columnType: string;
  length: number;
  scale: number | null;
  jdbcType: number;
  autoincrement: boolean;
  nullable: boolean;
  javaType: string | null;
  propertyName: string | null;
  annotation: any[];
}

interface ForeignKey {
  name: string;
  onePropertyName: string | null;
  manyPropertyName: string | null;
  onDelete: string;
  onUpdate: string;
  sql: string | null;
  toDatabase: string;
  toSchema: string;
  toTable: string;

  reference: { fromColumn: string; toColumn: string }[];
}
