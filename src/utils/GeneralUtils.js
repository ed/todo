import colors from '../constants/colors'

module.exports = {
  hyphenate(i) {
    return i.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  },

  generateTagList(a) {
    return a.reduce((p,n) => { if (n.tags !== "") { p.push(n.tags); } return p }, [])
  },

  prio(prio) {
    let color = colors.color.baseblue
    switch(prio) {
      case 'low':
        break;
      case 'med':
        color = colors.color.orange
        break;
      case 'high':
        color = colors.color.basered
        break;
    }
    return color
  },

  setCD(ds, c) {
    let color = c || colors.color.basegrey;
    let decor = 'none';
    switch(ds) {
      case 0:
        break;
      case 1:
        color = colors.color.orange;
        break;
      case 2:
        color = colors.color.basered;
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
    ];
    s.forEach(i => arr.push({
      cname: `todo-${module.exports.hyphenate(i)}-setter`,
      def: `set ${module.exports.hyphenate(i)}`,
      val: i,
    }));
    return arr;
  },
};
