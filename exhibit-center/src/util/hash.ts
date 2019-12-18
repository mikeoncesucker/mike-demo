import qs from "qs";

class Hash {
  get(format: boolean = true) {
    try {
      const hash = window.location.hash.replace(/^#/i, "");
      return format ? qs.parse(hash) : hash;
    } catch (error) {
      console.log(error);
    }
  }
  set(obj: object) {
    let hash = this.get();
    if (obj) {
      hash = {
        ...hash,
        ...obj
      };
    }
    window.location.hash = qs.stringify(hash);
  }
}

export default new Hash();
