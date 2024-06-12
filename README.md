# Lidia React Editor

An intuitive and minimal WYSIWYG react editor. Ideal for everyone: developers, designers, and general users.

## Key Features

- **Intuitive Interface:** Easy to use for users of all levels.
- **Real-time Editing:** Instantly see changes as you edit.
- **Flexible Customization:** Customize with various options.
- **Clean Code Export:** Generates clean, semantic HTML.
<!-- - [x] **Cross-platform Compatibility:** Works on all major browsers and OS. -->

## Screenshots

![Lidia Editor screenshots](https://imgur.com/sfy9480.png)

## Installation

To use Lidia Editor, simply add it as follows:

```jsx
// Import lidia-editor package
import { LidiaEditor } from 'lidia-editor'

function App() { 
	// Define the 'html' state and the 'setHtml' function using the useState hook from React
  const { html, setHtml } = useState("");

  
  return (
    <div className="App">
      <LidiaEditor
        html={html}
        setHtml={setHtml}
      />
    </div>
  );
}

export default App;

```
