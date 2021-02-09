const instance = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      // dev code
      return 'http://localhost:3000/api/v1';
    } else {
      // production code
      return `https://atlas-backend-server.herokuapp.com/api/v1`;
    }
}

export default instance;