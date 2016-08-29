import Channel from 'utils/ChannelUtils'

let channel = "me";
let user = "edward";

let root = Channel.createChannel(channel,user);

const val1 = {
    id: 1,
    name: 'task'
}

const val2 = {
    id: 2,
    name: 'task1'
}

const val3 = {
    id: 3,
    name: 'task2'
}

const val4 = {
    id: 4,
    name: 'task3'
}

root = Channel.addChild(root, val1);
root = Channel.addChild(root, val2);
root = Channel.addChild(root, val3);
root = Channel.addChild(root, val4);
console.log(root.get('children'));
root = Channel.removeChild(root, 2);
console.log(root.get('children'));
