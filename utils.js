/**
 * Async script load
 * @param {URL} url
 */
export function injectScript(url) {
  return new Promise((resolve, reject) => {
    const js = document.createElement('script');
    js.src = url;
    js.defer = 'true';
    js.async = 'true';
    js.onload = resolve;
    js.onerror = reject;
    document.head.appendChild(js);
  });
}

/**
 * Data loader
 * @param {URL} url
 * @returns {JSON | String}
 */
export function fetchData(url) {
  return fetch(url).then(handleErrors).then(response => {
    const type = response.headers.get('Content-Type');
    if (type.includes('json')) return response.json();
    if (type.includes('text')) return response.text();
  });
}

/**
 * Fetch error handler
 * @param {Promise} response
 * @returns {Promise | String}
 */
export function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}

/**
 * A Promise wrapper for requestAnimationFrame
 * @returns {Promise}
 */
export function requestAnimationFramePromise() {
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
  elArr.map(el => fn(el, ...args));
}

/**
 * Used for detecting when an element is rendered
 * @param {Node} element - The element that is waiting to be rendered
 * @param {Function} callback - The function that fires after rendering
 */

export function onRender(element, callback) {
  element.getBoundingClientRect();
  requestAnimationFrame(() => requestAnimationFrame(() => callback()));
}

/**
 * Generic 'run once'
 * @param {Node} element - Element
 * @param {Event} event - Event to listen
 * @param {Function} callback - what to do
 */

export function listenOnce(element, event, callback) {
  const onceCallback = () => {
    element.removeEventListener(event, onceCallback);
    callback();
  };
  element.addEventListener(event, onceCallback);
}

/**
 * Autobind
 * @param {*} self
 */
export function autoBind(self) {
  for (const key of Object.getOwnPropertyNames(self.constructor.prototype)) {
    const val = self[key];

    if (key !== 'constructor' && typeof val === 'function') {
      self[key] = val.bind(self);
    }
  }

  return self;
}

/** is the given object a Function? */
export function isFunction(obj) {
  return 'function' === typeof obj;
}

/** is the given object a String? */
export function isString(obj) {
  return 'string' === typeof obj;
}

/** Call a function asynchronously, as soon as possible.
 *	@param {Function} callback
 */
let resolved = typeof Promise!=='undefined' && Promise.resolve();
export const defer = resolved ? (f => { resolved.then(f); }) : setTimeout;
