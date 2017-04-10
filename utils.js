const _scriptCache = {};
/**
 * Async script load
 * @param {URL} url
 */
export function loadScript(url) {
  _scriptCache[url] = _scriptCache[url] ||
    new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = _ => {
        resolve(script);
      };
      script.onerror = reject;
      document.body.appendChild(script);
    });

  return _scriptCache[url];
}

/** is the given object a Function? */
export function isFunction(obj) {
  return 'function' === typeof obj;
}

/** is the given object a String? */
export function isString(obj) {
  return 'string' === typeof obj;
}

export function removeElement(el) {
  el.parentNode.removeChild(el);
}

export function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  });
}

export function fire(
  el,
  eventName,
  detail = null,
  bubbles = true,
  cancelable = true
) {
  let evt = new CustomEvent(eventName, {
    detail,
    bubbles,
    cancelable
  });

  el.dispatchEvent(evt);
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function assert(predicate, message) {
  if (predicate) {
    return;
  }

  throw new Error(message);
}

/**
 * Data loader
 * @param {URL} url
 * @returns {JSON | String}
 */
export async function fetchData(url) {
  const response = await fetch(url);
  const type = response.headers.get('Content-Type');
  if (type.includes('json')) return response.json();
  if (type.includes('text')) return response.text();
}

/**
 * A Promise wrapper for requestAnimationFrame
 * @returns {Promise}
 */
export function rafPromise() {
  return new Promise(requestAnimationFrame);
}

/**
 * Runs a function on each element matching the selector
 * @param {String} selector
 * @param {Function} fn
 * @param {*} args
 */
export function each(selector, fn, ...args) {
  const elArr = [...document.querySelectorAll(selector)];
  if (!elArr) return;
  elArr.forEach(el => fn(el, ...args));
}

/**
 * Used for detecting when an element is rendered
 * @param {Node} element - The element that is waiting to be rendered
 * @param {Function} callback - The function that fires after rendering
 */

export async function render(element) {
  element.getBoundingClientRect();
  const f1 = await rafPromise();
  const f2 = await rafPromise();
  return f2 - f1;
}

/**
 * Generic 'run once'
 * @param {Node} element - Element
 * @param {Event} event - Event to listen
 * @param {Function} callback - what to do
 */

export function listenOnce(element, event, callback) {
  const onceCallback = _ => {
    element.removeEventListener(event, onceCallback);
    callback();
  };
  element.addEventListener(event, onceCallback);
}
