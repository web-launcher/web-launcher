import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import set from 'lodash/set';

export default function storageReducer(state, setState) {
  return action => {
    const value = action.path ? get(state, action.path) : state;
    const setValue = v => {
      if (action.path) {
        const newObject = cloneDeep(state);
        set(newObject, action.path, v);
        setState(newObject);
      } else {
        setState(action.value);
      }
    };

    switch (action.type) {
      case 'set': {
        if (Array.isArray(value) && Number.isFinite(action.index)) {
          const newArray = [...value];
          newArray.splice(action.index, 1, action.value);
          setValue(newArray);
        } else {
          setValue(action.value);
        }
        break;
      }
      case 'push': {
        if (Array.isArray(value)) {
          const newArray = [...value];
          if (Number.isFinite(action.index)) {
            newArray.splice(action.index, 0, action.value);
          } else {
            newArray.push(action.value);
          }

          setValue(newArray);
        }
        break;
      }
      case 'remove': {
        if (Array.isArray(value) && Number.isFinite(action.index)) {
          const newArray = [...value];
          newArray.splice(action.index, 1);
          setValue(newArray);
        }
        break;
      }
      default: {
        break;
      }
    }
  };
}
