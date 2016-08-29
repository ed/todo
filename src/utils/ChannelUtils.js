let Immutable = require('immutable');
let uuid = require('node-uuid');

module.exports = {
    createChannel: function(name) {
        let init = {
            name: name,
            id: uuid.v4(),
            users: Immutable.Map();
        }
        let root = Immutable.fromJS(init);
        return root;
    },

    addUser: function(root, user) {
        root = root.update('users', map => map.set(user.id, Immutable.OrderedMap));
    },

    removeUser: function(root, user) {
        root = root.update('users', map => map.remove(user.id));
    }
}
