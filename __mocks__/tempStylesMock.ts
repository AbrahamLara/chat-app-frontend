// Some components will temporarily inject css into a style tag in the DOM with the help of use() and unuse() methods
// provided by style-loader that we should mock so that jest doesn't complain.
// eslint-disable-next-line @typescript-eslint/no-empty-function
const tempStyle = { use: () => {}, unuse: () => {} };

export default tempStyle;
