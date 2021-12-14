
// instead of using try-catch and async-await everywhere, we can use "Promise".



module.exports = (func) => (req,res,next) => {
    Promise.resolve(func(req,res,next)).catch(next);
};