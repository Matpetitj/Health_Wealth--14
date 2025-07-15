# djyn-custom-lib-modal

A simple, customizable React modal component. Easy to use, minimal setup, and lightweight.

## Installation

```bash
npm install djyn-custom-lib-modal
```

or

```bash
yarn add djyn-custom-lib-modal
```

## Usage

```jsx
import React, { useState } from 'react';
import Modal from 'djyn-custom-lib-modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        backgroundColor="#00000088"
        textColor="#333"
        closeButtonColor="#ff0000"
      >
        <h2>Hello from the modal!</h2>
        <p>This is a customizable React modal.</p>
      </Modal>
    </>
  );
}
```

## Props

| Prop               | Type     | Default      | Description                                  |
|--------------------|----------|--------------|----------------------------------------------|
| `isOpen`           | boolean  | —            | Controls the visibility of the modal         |
| `onClose`          | function | —            | Function called when modal is closed         |
| `children`         | node     | —            | Content of the modal                         |
| `backgroundColor`  | string   | `#00000088`  | Background overlay color                     |
| `textColor`        | string   | `#000`       | Text color inside the modal                  |
| `closeButtonColor` | string   | `#aaa`       | Color of the close (×) button                |

## Close Behavior

- Click on the **×** button
- Press **Escape** key

## Styling

The components includes his own main style, please use the props to modify it and don't override the CSS.

## Repository

[GitHub - Matpetitj/custom-lib-modal](https://github.com/Matpetitj/custom-lib-modal)

## License

MIT