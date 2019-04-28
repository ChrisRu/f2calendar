export interface NodeModule {
  hot: {
    accept: (array: string[], method: () => void) => void
  }
}
