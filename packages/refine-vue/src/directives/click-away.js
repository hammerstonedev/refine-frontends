export default function () {
  /*
    Directives in Vue3 no longer use bind/unbind so in order for this
    to work in 2 and 3 these functions are refactored out and applied
    to the directive object with both bind/unbind and beforeMount/unmount
    lifecycle method names.
  */
  const handlers = {};

  const bind = function (el, binding) {
    const { value: handleClick } = binding;

    if (typeof handleClick !== 'function') {
      throw new Error('The click-away directive expects a function/method as an argument.');
    }

    if (!el.id) {
      throw new Error(
        'The click-away directive requires the element it is bound to to have an id.'
      );
    }

    const handler = (e) => {
      if (!el.contains(e.target)) {
        handleClick();
      }
    };

    handlers[el.id] = handler;

    document.addEventListener('click', handler);
    document.addEventListener('touchstart', handler);
  };

  const unbind = function (el) {
    document.removeEventListener('click', handlers[el.id]);
    document.removeEventListener('touchstart', handlers[el.id]);
    delete handlers[el.id];
  };

  return {
    bind,
    beforeMount: bind,
    unbind,
    unmount: unbind,
  };
}
