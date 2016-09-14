import colors from '../constants/colors'

module.exports = {
  hyphenate(i) {
    return i.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  },

  setCD(ds, c) {
    let color = c || colors.color.darkgrey;
    let decor = 'none';
    switch(ds) {
      case 0:
        break;
      case 1:
        color = colors.color.orange;
        break;
      case 2:
        color = colors.color.red;
        decor = 'line-through';
        break;
    }
    return {
      c: color,
      d: decor,
    }
  },

  createEdits() {
    const arr = [];
    const s = [
      'tags',
      'prio',
      'users',
      'sub',
    ];
    s.forEach(i => arr.push({
      cname: `todo-${module.exports.hyphenate(i)}-setter`,
      def: `set ${module.exports.hyphenate(i)}`,
      val: i,
    }));
    return arr;
  },
};
