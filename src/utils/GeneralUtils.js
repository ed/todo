module.exports = {
  hyphenate(i) {
    return i.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
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
