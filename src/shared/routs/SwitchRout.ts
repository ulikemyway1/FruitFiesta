import Hash from "./enumHash";

class SwitchRout {
  static path = Hash;

  static to(s: Hash) {
    window.location.hash = s;
  }
}

export default SwitchRout;
