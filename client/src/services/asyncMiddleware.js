const asyncMiddleware = (func) => {
  return (e) => {
    try {
      func(e);
    } catch (err) {
      if (err.response) {
        setNotification(err.response.data.message);
      }
      setNotification(err.message);
    }
  };
};

export default asyncMiddleware;
