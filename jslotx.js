function getSlot(element, type) {
    let slotAttr;

    if (typeof type === 'function') slotAttr = type(element);
    else
        switch (type) {
            case 'react':
                slotAttr = element.props.slot;
                break;
            case 'hyperscript':
                slotAttr = element.attributes.slot;
                break;
            default:
                throw new Error(`Unsupported type given: \`${type}\``);
        }

    return slotAttr;
}

/**
 * Generic function for getting slots from a given children list.
 * 
 * @param {*} children 
 * @param {*} type 
 */
export function transformChildren(children, type) {
// export function transformChildren(element, type, slotFinder) {
    // let children;

    // if (typeof type === 'function') {
    //     children = type(element);

    //     if (!slotFinder) throw new TypeError('slotFinder should be given if type is a function');
    // } else
    //     switch (type) {
    //         case 'react':
    //             children = element.props.children;
    //             break;
    //         case 'preact':
    //         case 'hyperapp':
    //             children = element.children;
    //             break;
    //         default:
    //             throw new Error(`Unsupported type given: \`${type}\``);
    //     }

    if (!Array.isArray(children)) children = [children];
    const slots = {default: []};

    for (const child of children)
        if (typeof child === 'object' && child) {
            const slot = getSlot(child, type);

            if (!slot) slots.default.push(child);
            else if (!slots[slot]) slots[slot] = [child];
            else slots[slot].push(child);
        } else slots.default.push(child);

    return slots;
}

/**
 * Transforms a React (or Preact) Stateless Functional Component (SFC) to receive slots.
 * 
 * @param {*} component 
 */
export function transformSFC(component, isHyperscript) {
    return function(props) {
        const slots = transformChildren(props.children, isHyperscript ? 'hyperscript' : 'react');

        return component({
            ...props,
            slots
        });
    };
}

/**
 * Transforms a React class component to receive slots.
 * 
 * @param {*} component 
 */
export function transformReact(component) {
    return class {
        constructor(props) {
            const slots = transformChildren(props.children, 'react');

            return new component({
                ...props,
                slots
            });
        }
    };
}

/**
 * Transforms a Preact class component to receive slots.
 * 
 * @param {*} component 
 */
export function transformPreact(component) {
    return class {
        constructor(props, context) {
            const slots = transformChildren(props.children, 'hyperscript');

            return new component({
                ...props,
                slots
            }, context);
        }
    };
}

/**
 * Transforms a Hyperapp component to receive slots.
 * 
 * @param {*} component 
 */
export function transformHyperapp(component) {
    return function(props, children) {
        const slots = transformChildren(children, 'hyperscript');


        return component({
            ...props,
            slots
        }, children);
    };
}

/** An alias for transformSFC(component, true) */
export const transformPreactSFC = component => transformSFC(component, true);


/**
 * Transforms React's `createElement` function, and returns one that automatically calculates slots.
 * 
 * @param {Function} pragma React createElement function.
 */
export function transformReactCreateElement(pragma) {
    return function createElement(name, props, ...children) {
        const slots = transformChildren(children, 'react');

        return pragma(name, {
            ...props,
            slots
        }, ...children);
    };
}

/**
 * Transforms the `h` or `createElement` function of any lib which follows the Hyperscript object structure.
 * 
 * @param {Function} pragma createElement or h function.
 */
export function transformH(pragma) {
    return function h(name, props, ...children) {
        const slots = transformChildren(children, 'hyperscript');

        return pragma(name, {
            ...props,
            slots
        }, ...children);
    };
}