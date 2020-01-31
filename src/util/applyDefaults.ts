export default (opts: any, defaults: any) => {
  for (const defaultOpt of Object.keys(defaults)) {
    if (opts[defaultOpt] === undefined) {
      opts[defaultOpt] = defaults[defaultOpt];
    }
  }
};
