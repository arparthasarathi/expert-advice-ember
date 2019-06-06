import DS from "ember-data";
import moment from "moment";

export default DS.Transform.extend({
  deserialize(serialized) {
    if (serialized) {
      return new Date(serialized);
    } else {
      return null;
    }
  },
  serialize(deserialized) {
    if (deserialized) {
      return moment(deserialized).format();
    } else {
      return null;
    }
  }
});
