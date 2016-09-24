import Immutable from 'immutable'

export const load = () => {
  try {
    const serialized = localStorage.getItem('state');
    if (serialized === null)
      return undefined;
    const load = JSON.parse(serialized)
    return {
      tasks: Immutable.Map(load.tasks),
      cards: Immutable.OrderedMap(load.cards)
    }
  } catch(err) {
    return undefined;
  }
}

export const save = (state) => {
  try {
    const save = {
      tasks: state.tasks.toJS(),
      cards: state.cards.toJS(),
    }
    const serialized = JSON.stringify(save);
    localStorage.setItem('state', serialized)
  } catch(err) {
    console.log(err)
  }
}
