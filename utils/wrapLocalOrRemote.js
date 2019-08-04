




module.exports = function wrapLocalOrRemote(localFn, remoteFn) {
  if (process.env.INVOKE_AS_LOCAL == 'true') {
    return localFn;
  } else {
    return remoteFn;
  }
};


