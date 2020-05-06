import {
    options
} from 'https://cdn.pika.dev/preact@latest'; //'./preact.js'

//below is modified from: https://github.com/preactjs/preact/blob/master/hooks/src/index.js 

/** @type {number} */
let currentIndex;

/** @type {import('./internal').Component} */
let currentComponent;

/** @type {number} */
let currentHook = 0;

/** @type {Array<import('./internal').Component>} */
let afterPaintEffects = [];

let oldBeforeRender = options._render;
let oldAfterDiff = options.diffed;
let oldCommit = options._commit;
let oldBeforeUnmount = options.unmount;

const RAF_TIMEOUT = 100;
let prevRaf;

options._render = vnode => {
    if (oldBeforeRender) oldBeforeRender(vnode);

    console.log("current component is rendered")
    currentComponent = vnode._component;
    currentIndex = 0;

    const hooks = currentComponent.__hooks;
    if (hooks) {
        hooks._pendingEffects.forEach(invokeCleanup);
        hooks._pendingEffects.forEach(invokeEffect);
        hooks._pendingEffects = [];
    }
};

options.diffed = vnode => {
    if (oldAfterDiff) oldAfterDiff(vnode);

    const c = vnode._component;
    if (c && c.__hooks && c.__hooks._pendingEffects.length) {
        afterPaint(afterPaintEffects.push(c));
    }
};

options._commit = (vnode, commitQueue) => {
    commitQueue.some(component => {
        try {
            component._renderCallbacks.forEach(invokeCleanup);
            component._renderCallbacks = component._renderCallbacks.filter(cb =>
                cb._value ? invokeEffect(cb) : true
            );
        } catch (e) {
            commitQueue.some(c => {
                if (c._renderCallbacks) c._renderCallbacks = [];
            });
            commitQueue = [];
            options._catchError(e, component._vnode);
        }
    });

    if (oldCommit) oldCommit(vnode, commitQueue);
};

options.unmount = vnode => {
    if (oldBeforeUnmount) oldBeforeUnmount(vnode);

    const c = vnode._component;
    if (c && c.__hooks) {
        try {
            c.__hooks._list.forEach(hook => hook._cleanup && hook._cleanup());
        } catch (e) {
            options._catchError(e, c._vnode);
        }
    }
};

/**
 * Get a hook's state from the currentComponent
 * @param {number} index The index of the hook to get
 * @param {number} type The index of the hook to get
 * @returns {import('./internal').HookState}
 */
function getHookState(index, type) {
    if (options._hook) {
        options._hook(currentComponent, index, currentHook || type);
    }
    currentHook = 0;

    // Largely inspired by:
    // * https://github.com/michael-klein/funcy.js/blob/f6be73468e6ec46b0ff5aa3cc4c9baf72a29025a/src/hooks/core_hooks.mjs
    // * https://github.com/michael-klein/funcy.js/blob/650beaa58c43c33a74820a3c98b3c7079cf2e333/src/renderer.mjs
    // Other implementations to look at:
    // * https://codesandbox.io/s/mnox05qp8
    console.log("current component", currentComponent);
    const hooks =
        currentComponent.__hooks ||
        (currentComponent.__hooks = {
            _list: [],
            _pendingEffects: []
        });

    if (index >= hooks._list.length) {
        hooks._list.push({});
    }
    return hooks._list[index];
}

/**
 * @param {import('./index').StateUpdater<any>} initialState
 */
export function useState(initialState) {
    currentHook = 1;
    return useReducer(invokeOrReturn, initialState);
}

/**
 * @param {import('./index').Reducer<any, any>} reducer
 * @param {import('./index').StateUpdater<any>} initialState
 * @param {(initialState: any) => void} [init]
 * @returns {[ any, (state: any) => void ]}
 */
export function useReducer(reducer, initialState, init) {
    /** @type {import('./internal').ReducerHookState} */
    const hookState = getHookState(currentIndex++, 2);
    if (!hookState._component) {
        hookState._component = currentComponent;

        hookState._value = [
            !init ? invokeOrReturn(undefined, initialState) : init(initialState),

            action => {
                const nextValue = reducer(hookState._value[0], action);
                if (hookState._value[0] !== nextValue) {
                    hookState._value[0] = nextValue;
                    hookState._component.setState({});
                }
            }
        ];
    }

    return hookState._value;
}

/**
 * @param {import('./internal').Effect} callback
 * @param {any[]} args
 */
export function useEffect(callback, args) {
    /** @type {import('./internal').EffectHookState} */
    const state = getHookState(currentIndex++, 3);
    if (!options._skipEffects && argsChanged(state._args, args)) {
        state._value = callback;
        state._args = args;

        currentComponent.__hooks._pendingEffects.push(state);
    }
}

/**
 * @param {import('./internal').Effect} callback
 * @param {any[]} args
 */
export function useLayoutEffect(callback, args) {
    /** @type {import('./internal').EffectHookState} */
    const state = getHookState(currentIndex++, 4);
    if (!options._skipEffects && argsChanged(state._args, args)) {
        state._value = callback;
        state._args = args;

        currentComponent._renderCallbacks.push(state);
    }
}

export function useRef(initialValue) {
    currentHook = 5;
    return useMemo(() => ({
        current: initialValue
    }), []);
}

/**
 * @param {object} ref
 * @param {() => object} createHandle
 * @param {any[]} args
 */
export function useImperativeHandle(ref, createHandle, args) {
    currentHook = 6;
    useLayoutEffect(
        () => {
            if (typeof ref == 'function') ref(createHandle());
            else if (ref) ref.current = createHandle();
        },
        args == null ? args : args.concat(ref)
    );
}

/**
 * @param {() => any} factory
 * @param {any[]} args
 */
export function useMemo(factory, args) {
    /** @type {import('./internal').MemoHookState} */
    const state = getHookState(currentIndex++, 7);
    if (argsChanged(state._args, args)) {
        state._args = args;
        state._factory = factory;
        return (state._value = factory());
    }

    return state._value;
}

/**
 * @param {() => void} callback
 * @param {any[]} args
 */
export function useCallback(callback, args) {
    currentHook = 8;
    return useMemo(() => callback, args);
}

/**
 * @param {import('./internal').PreactContext} context
 */
export function useContext(context) {
    const provider = currentComponent.context[context._id];
    // We could skip this call here, but than we'd not call
    // `options._hook`. We need to do that in order to make
    // the devtools aware of this hook.
    const state = getHookState(currentIndex++, 9);
    // The devtools needs access to the context object to
    // be able to pull of the default value when no provider
    // is present in the tree.
    state._context = context;
    if (!provider) return context._defaultValue;
    // This is probably not safe to convert to "!"
    if (state._value == null) {
        state._value = true;
        provider.sub(currentComponent);
    }
    return provider.props.value;
}

/**
 * Display a custom label for a custom hook for the devtools panel
 * @type {<T>(value: T, cb?: (value: T) => string | number) => void}
 */
export function useDebugValue(value, formatter) {
    if (options.useDebugValue) {
        options.useDebugValue(formatter ? formatter(value) : value);
    }
}

export function useErrorBoundary(cb) {
    const state = getHookState(currentIndex++, 10);
    const errState = useState();
    state._value = cb;
    if (!currentComponent.componentDidCatch) {
        currentComponent.componentDidCatch = err => {
            if (state._value) state._value(err);
            errState[1](err);
        };
    }
    return [
        errState[0],
        () => {
            errState[1](undefined);
        }
    ];
}

/**
 * After paint effects consumer.
 */
function flushAfterPaintEffects() {
    afterPaintEffects.some(component => {
        if (component._parentDom) {
            try {
                component.__hooks._pendingEffects.forEach(invokeCleanup);
                component.__hooks._pendingEffects.forEach(invokeEffect);
                component.__hooks._pendingEffects = [];
            } catch (e) {
                component.__hooks._pendingEffects = [];
                options._catchError(e, component._vnode);
                return true;
            }
        }
    });
    afterPaintEffects = [];
}

/**
 * Schedule a callback to be invoked after the browser has a chance to paint a new frame.
 * Do this by combining requestAnimationFrame (rAF) + setTimeout to invoke a callback after
 * the next browser frame.
 *
 * Also, schedule a timeout in parallel to the the rAF to ensure the callback is invoked
 * even if RAF doesn't fire (for example if the browser tab is not visible)
 *
 * @param {() => void} callback
 */
function afterNextFrame(callback) {
    const done = () => {
        clearTimeout(timeout);
        cancelAnimationFrame(raf);
        setTimeout(callback);
    };
    const timeout = setTimeout(done, RAF_TIMEOUT);

    let raf;
    if (typeof window != 'undefined') {
        raf = requestAnimationFrame(done);
    }
}

// Note: if someone used options.debounceRendering = requestAnimationFrame,
// then effects will ALWAYS run on the NEXT frame instead of the current one, incurring a ~16ms delay.
// Perhaps this is not such a big deal.
/**
 * Schedule afterPaintEffects flush after the browser paints
 * @param {number} newQueueLength
 */
function afterPaint(newQueueLength) {
    if (newQueueLength === 1 || prevRaf !== options.requestAnimationFrame) {
        prevRaf = options.requestAnimationFrame;
        (prevRaf || afterNextFrame)(flushAfterPaintEffects);
    }
}

/**
 * @param {import('./internal').EffectHookState} hook
 */
function invokeCleanup(hook) {
    if (typeof hook._cleanup == 'function') hook._cleanup();
}

/**
 * Invoke a Hook's effect
 * @param {import('./internal').EffectHookState} hook
 */
function invokeEffect(hook) {
    hook._cleanup = hook._value();
}

/**
 * @param {any[]} oldArgs
 * @param {any[]} newArgs
 */
function argsChanged(oldArgs, newArgs) {
    return !oldArgs || newArgs.some((arg, index) => arg !== oldArgs[index]);
}

function invokeOrReturn(arg, f) {
    return typeof f == 'function' ? f(arg) : f;
}


/*
let t = []
let u = []
let r = []
let i = []


var o = n.__r;
var f = n.diffed;
var c = n.__c;
var e = n.unmount;

function a(t) {
    n.__h && n.__h(u);
    var r = u.__H || (u.__H = {
        t: [],
        u: []
    });
    return t >= r.t.length && r.t.push({}), r.t[t];
}

function v(n) {
    return m(x, n);
}

function m(n, r, i) {
    var o = a(t++);
    return o.__c || (o.__c = u, o.i = [i ? i(r) : x(void 0, r), function (t) {
        var u = n(o.i[0], t);
        o.i[0] !== u && (o.i[0] = u, o.__c.setState({}));
    }]), o.i;
}

function p(n, r) {
    var i = a(t++);
    q(i.o, r) && (i.i = n, i.o = r, u.__H.u.push(i));
}

function l(n, r) {
    var i = a(t++);
    q(i.o, r) && (i.i = n, i.o = r, u.__h.push(i));
}

function d(n) {
    return y(function () {
        return {
            current: n
        };
    }, []);
}

function s(n, t, u) {
    l(function () {
        "function" == typeof n ? n(t()) : n && (n.current = t());
    }, null == u ? u : u.concat(n));
}

function y(n, u) {
    var r = a(t++);
    return q(r.o, u) ? (r.o = u, r.v = n, r.i = n()) : r.i;
}

function T(n, t) {
    return y(function () {
        return n;
    }, t);
}

function w(n) {

    
    var r = u.context[n.__c];
    if (!r) return n.__;
    var i = a(t++);
    return null == i.i && (i.i = !0, r.sub(u)), r.props.value;
}

function A(t, u) {
    n.useDebugValue && n.useDebugValue(u ? u(t) : t);
}

function F() {
    i.some(function (n) {
        n.__P && (n.__H.u.forEach(_), n.__H.u.forEach(g), n.__H.u = []);
    }), i = [];
}

function _(n) {
    n.m && n.m();
}

function g(n) {
    var t = n.i();
    "function" == typeof t && (n.m = t);
}

function q(n, t) {
    return !n || t.some(function (t, u) {
        return t !== n[u];
    });
}

function x(n, t) {
    return "function" == typeof t ? t(n) : t;
}
n.__r = function (n) {
    o && o(n), t = 0, (u = n.__c).__H && (u.__H.u.forEach(_), u.__H.u.forEach(g), u.__H.u = []);
}, n.diffed = function (t) {
    f && f(t);
    var u = t.__c;
    if (u) {
        var o = u.__H;
        o && o.u.length && (1 !== i.push(u) && r === n.requestAnimationFrame || ((r = n.requestAnimationFrame) || function (n) {
            var t, u = function () {
                    clearTimeout(r), cancelAnimationFrame(t), setTimeout(n);
                },
                r = setTimeout(u, 100);
            "undefined" != typeof window && (t = requestAnimationFrame(u));
        })(F));
    }
}, n.__c = function (n, t) {
    t.some(function (n) {
        n.__h.forEach(_), n.__h = n.__h.filter(function (n) {
            return !n.i || g(n);
        });
    }), c && c(n, t);
}, n.unmount = function (n) {
    e && e(n);
    var t = n.__c;
    if (t) {
        var u = t.__H;
        u && u.t.forEach(function (n) {
            return n.m && n.m();
        });
    }
};

export const useState = v;
export const useReducer = m;
export const useEffect = p;
export const useLayoutEffect = l;
export const useRef = d;
export const useImperativeHandle = s;
export const useMemo = y;
export const useCallback = T;
export const useContext = w;
export const useDebugValue = A; */