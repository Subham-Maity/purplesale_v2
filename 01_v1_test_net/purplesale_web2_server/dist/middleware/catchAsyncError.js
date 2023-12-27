const catchAsyncError = (asyncFun) => (req, res, next) => {
    Promise.resolve(asyncFun(req, res, next)).catch(next);
};
export default catchAsyncError;
//# sourceMappingURL=catchAsyncError.js.map