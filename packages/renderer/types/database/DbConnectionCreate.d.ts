export default interface DbPlatform {
  databaseName: string;
  driver: string;
  entityMode: string;
  password: string;
  url: string;
  username: string;
}
