import Immutable from 'immutable'

export const load = () => {
  try {
    const serialized = localStorage.getItem('state');
    if (serialized === null)
      return undefined;
    return Immutable.Map(JSON.parse(serialized))
  } catch(err) {
    return undefined;
  }
}

export const save = (state) => {
  try {
    const serialized = JSON.stringify(state.toJS());
    localStorage.setItem('state', serialized)
  } catch(err) {
    console.log(err)
  }
}
