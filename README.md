# jslotx
> Control where your JSX children go using `slot`s.

## Features
 - One time call for using slots anywhere.
 - Same slot semantics as Vue.
 - Functions for wrapping React and other popular VDOM libraries.
 - Ability to extend functionality via custom wrappers, allowing for support of any VDOM library.

## Example
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

## Why
One thing I found very useful from Vue, is its ability to set a "slot" for a components children. This registers that particular child under its own property on the parent component, which then allows the parent to choose wherever it wants to puut it.