/**
 * Async script load
 * @export
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
 *
 * @param {URL} url
 * @param {Object} body
 * @returns {JSON | String}
 */
export function fetchData(url) {
  return fetch(url)
    .then(handleErrors)
    .then(response => {
      if (response.headers.get('Content-Type') === 'application/json')
        return response.json();
      if (response.headers.get('Content-Type') === 'text/html')
        return response.text();
    });
}

/**
 * Fetch error handler
 *
 * @param {Promise} response
 * @returns {Promise | String}
 */
export function handleErrors(response) {
  if (!response.ok)
    throw Error(response.statusText);
  return response;
}


/**
 * A Promise wrapper for requestAnimationFrame
 * @export
 * @returns {Promise}
 */
export function requestAnimationFramePromise() {
  return new Promise(requestAnimationFrame);
}

/**
 * Runs a function on each element matching the selector
 * @export
 * @param {String} selector
 * @param {Function} fn
 * @param {any} args
 */
export function each(selector, fn, ...args) {
  const elArr = [...document.querySelectorAll(selector)];
  if (!elArr) return;
  elArr.map(el => fn(el, ...args));
}



/**
 * Used for detecting when an element is rendered
 * @export
 * @param {Node} element - The element that is waiting to be rendered
 * @param {Function} callback - The function that fires after rendering
 */

export function onRender(element, callback) {
  element.getBoundingClientRect();
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      callback()));
}

/**
 * Generic 'run once'
 * @export
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

/* Auto-bind */
export function autoBind(self) {
  for (const key of Object.getOwnPropertyNames(self.constructor.prototype)) {
    const val = self[key];

    if (key !== 'constructor' && typeof val === 'function') {
      self[key] = val.bind(self);
    }
  }

  return self;
}