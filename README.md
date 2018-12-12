# jslotx
> Control where your JSX children go using `slot`s.

## Features
 - One time call for using slots anywhere.
 - Same slot semantics as Vue.
 - Functions for wrapping React and other popular VDOM libraries.
 - Ability to extend functionality via custom wrappers, allowing for support of any VDOM library.

## Example
### Basic React Usage
```jsx
import {transformSFC} from 'jslotx';

const Layout = transformSFC(({children, slots, ...props}) => (
    <div className="layout">
        <header className="layout__header">{slots.header}</header>
        <main className="layout__content">{slots.default}</main>
        <footer className="layout__footer">{slots.footer}</footer>
    </div>
));

const App = () => (
    <Layout>
        <h1 slot="header">Header Title</h1>
        <p slot="footer">Copyright &copy; 2018 - Person</p>

        <p>
            Lorem ipsum delor sit amet.
        </p>
    </Layout>
);
```

### Transforming `createElement`
```jsx
import {transformReactCreateElement} from 'jslotx';
import React from 'react';

const createElement = transformReactCreateElement(React.createElement);

/** @jsx createElement */

const Layout = ({children, slots, ...props}) => (
    <div className="layout">
        <header className="layout__header">{slots.header}</header>
        <main className="layout__content">{slots.default}</main>
        <footer className="layout__footer">{slots.footer}</footer>
    </div>
);

const App = () => (
    <Layout>
        <h1 slot="header">Header Title</h1>
        <p slot="footer">Copyright &copy; 2018 - Person</p>

        <p>
            Lorem ipsum delor sit amet.
        </p>
    </Layout>
);
```

## Why
One thing I found very useful from Vue, is its ability to set a "slot" for a components children. This registers that particular child under its own property on the parent component, which then allows the parent to choose wherever it wants to put it. As far as I know, no JSX lib supports this natively, meaning that people usually have to use `children.find` in order to pick and choose the specific elements they want to put where, or end up passing them as a property. *Shudder*.

This implements a similar system to Vue through the use of functions either wrapping single components, or the JSX pragma function, with the latter meaning that all elements automatically have their children parsed into slots.

## API
TODO

## License
This repository is licensed under the MIT license. More info can be found in the [LICENSE file](LICENSE). 