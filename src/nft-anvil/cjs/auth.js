"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authClient = require("@dfinity/auth-client");

let client = null;
const defaultOptions = {
  cookie: false
};
const auth = {
  client,
  options: defaultOptions
};
exports.default = auth;

auth.setOptions = opt => {
  auth.options = { ...defaultOptions,
    ...opt
  };
};

auth.create = async () => {
  const storage = new MyStorage();
  auth.client = await _authClient.AuthClient.create(auth.options.cookie ? {} : {
    storage
  });
};

auth.getAgentOptions = async () => {
  if(auth.client === undefined || auth.client === null){
    const storage = new MyStorage();
    auth.client = await _authClient.AuthClient.create(auth.options.cookie ? {} : {
      storage
    });
  }
  try{
    let identity = auth.client.getIdentity();
    return {
      identity,
      host: "https://ic0.app"
    };
  }catch(e){
    console.log("AUTH ERR", e);
  }
}; //


class MyStorage {
  constructor() {
    this.my = {};
  }

  async get(key) {
    return this.my[key];
  }

  async set(key, value) {
    this.my[key] = value;
  }

  async remove(key) {
    delete this.my[key];
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRoLmpzIl0sIm5hbWVzIjpbImNsaWVudCIsImRlZmF1bHRPcHRpb25zIiwiY29va2llIiwiYXV0aCIsIm9wdGlvbnMiLCJzZXRPcHRpb25zIiwib3B0IiwiY3JlYXRlIiwic3RvcmFnZSIsIk15U3RvcmFnZSIsIkF1dGhDbGllbnQiLCJnZXRBZ2VudE9wdGlvbnMiLCJpZGVudGl0eSIsImdldElkZW50aXR5IiwiaG9zdCIsInByb2Nlc3MiLCJlbnYiLCJSRUFDVF9BUFBfSUNfR0FURVdBWSIsImNvbnN0cnVjdG9yIiwibXkiLCJnZXQiLCJrZXkiLCJzZXQiLCJ2YWx1ZSIsInJlbW92ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBLElBQUlBLE1BQU0sR0FBRyxJQUFiO0FBRUEsTUFBTUMsY0FBYyxHQUFHO0FBQUVDLEVBQUFBLE1BQU0sRUFBRTtBQUFWLENBQXZCO0FBRUEsTUFBTUMsSUFBSSxHQUFHO0FBQ1hILEVBQUFBLE1BRFc7QUFFWEksRUFBQUEsT0FBTyxFQUFFSDtBQUZFLENBQWI7OztBQUtBRSxJQUFJLENBQUNFLFVBQUwsR0FBbUJDLEdBQUQsSUFBUztBQUN6QkgsRUFBQUEsSUFBSSxDQUFDQyxPQUFMLEdBQWUsRUFBRSxHQUFHSCxjQUFMO0FBQXFCLE9BQUdLO0FBQXhCLEdBQWY7QUFDRCxDQUZEOztBQUlBSCxJQUFJLENBQUNJLE1BQUwsR0FBYyxZQUFZO0FBQ3hCLFFBQU1DLE9BQU8sR0FBRyxJQUFJQyxTQUFKLEVBQWhCO0FBQ0FOLEVBQUFBLElBQUksQ0FBQ0gsTUFBTCxHQUFjLE1BQU1VLHVCQUFXSCxNQUFYLENBQWtCSixJQUFJLENBQUNDLE9BQUwsQ0FBYUYsTUFBYixHQUFzQixFQUF0QixHQUEyQjtBQUFFTSxJQUFBQTtBQUFGLEdBQTdDLENBQXBCO0FBQ0QsQ0FIRDs7QUFLQUwsSUFBSSxDQUFDUSxlQUFMLEdBQXVCLE1BQU07QUFDM0IsTUFBSUMsUUFBUSxHQUFHVCxJQUFJLENBQUNILE1BQUwsQ0FBWWEsV0FBWixFQUFmO0FBRUEsU0FBTztBQUNMRCxJQUFBQSxRQURLO0FBRUxFLElBQUFBLElBQUksRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDLG9CQUFaLElBQW9DO0FBRnJDLEdBQVA7QUFJRCxDQVBELEMsQ0FTQTs7O0FBRUEsTUFBTVIsU0FBTixDQUFnQjtBQUNkUyxFQUFBQSxXQUFXLEdBQUc7QUFDWixTQUFLQyxFQUFMLEdBQVUsRUFBVjtBQUNEOztBQUVRLFFBQUhDLEdBQUcsQ0FBQ0MsR0FBRCxFQUFNO0FBQ2IsV0FBTyxLQUFLRixFQUFMLENBQVFFLEdBQVIsQ0FBUDtBQUNEOztBQUVRLFFBQUhDLEdBQUcsQ0FBQ0QsR0FBRCxFQUFNRSxLQUFOLEVBQWE7QUFDcEIsU0FBS0osRUFBTCxDQUFRRSxHQUFSLElBQWVFLEtBQWY7QUFDRDs7QUFFVyxRQUFOQyxNQUFNLENBQUNILEdBQUQsRUFBTTtBQUNoQixXQUFPLEtBQUtGLEVBQUwsQ0FBUUUsR0FBUixDQUFQO0FBQ0Q7O0FBZmEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdXRoQ2xpZW50IH0gZnJvbSBcIkBkZmluaXR5L2F1dGgtY2xpZW50XCI7XG5cbmxldCBjbGllbnQgPSBudWxsO1xuXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHsgY29va2llOiBmYWxzZSB9O1xuXG5jb25zdCBhdXRoID0ge1xuICBjbGllbnQsXG4gIG9wdGlvbnM6IGRlZmF1bHRPcHRpb25zLFxufTtcblxuYXV0aC5zZXRPcHRpb25zID0gKG9wdCkgPT4ge1xuICBhdXRoLm9wdGlvbnMgPSB7IC4uLmRlZmF1bHRPcHRpb25zLCAuLi5vcHQgfTtcbn07XG5cbmF1dGguY3JlYXRlID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzdG9yYWdlID0gbmV3IE15U3RvcmFnZSgpO1xuICBhdXRoLmNsaWVudCA9IGF3YWl0IEF1dGhDbGllbnQuY3JlYXRlKGF1dGgub3B0aW9ucy5jb29raWUgPyB7fSA6IHsgc3RvcmFnZSB9KTtcbn07XG5cbmF1dGguZ2V0QWdlbnRPcHRpb25zID0gKCkgPT4ge1xuICBsZXQgaWRlbnRpdHkgPSBhdXRoLmNsaWVudC5nZXRJZGVudGl0eSgpO1xuXG4gIHJldHVybiB7XG4gICAgaWRlbnRpdHksXG4gICAgaG9zdDogcHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0lDX0dBVEVXQVkgfHwgXCJodHRwczovL2ljMC5hcHBcIixcbiAgfTtcbn07XG5cbi8vXG5cbmNsYXNzIE15U3RvcmFnZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubXkgPSB7fTtcbiAgfVxuXG4gIGFzeW5jIGdldChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5teVtrZXldO1xuICB9XG5cbiAgYXN5bmMgc2V0KGtleSwgdmFsdWUpIHtcbiAgICB0aGlzLm15W2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIGFzeW5jIHJlbW92ZShrZXkpIHtcbiAgICBkZWxldGUgdGhpcy5teVtrZXldO1xuICB9XG59XG5cbmV4cG9ydCB7IGF1dGggYXMgZGVmYXVsdCB9O1xuIl19