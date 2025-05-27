export interface IBatch {
  execute(): Promise<void>;
}
