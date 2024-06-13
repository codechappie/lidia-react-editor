# Lidia React Editor

An intuitive and minimal WYSIWYG react editor. Ideal for everyone: developers, designers, and general users.

## Key Features

- **Intuitive Interface:** Easy to use for users of all levels.
- **Real-time Editing:** Instantly see changes as you edit.
- **Flexible Customization:** Customize with various options.
- **Clean Code Export:** Generates clean, semantic HTML.
<!-- - [x] **Cross-platform Compatibility:** Works on all major browsers and OS. -->

## Screenshots

![Lidia Editor screenshots](https://i.imgur.com/QONqvIe.png)

## Use

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


## Use to show parsed HTML

To use View Editor, simply add it as follows:

```jsx
import { LidiaEditor } from 'lidia-editor'

function App() { 
	// Define the 'html' function using the useState hook from React
  const { html } = useState(`
  <h2>Main Title</h2><p>Lorem ipsum dolor sit amet consectetur adipisicing elitolore.</p>
  <ul>
    <li><p>Example 1</p></li>
    <li><p>Example 2</p></li>
    <li><p>Example 3</p></li>
  </ul>
    <pre><code class="language-scss">      
      li {
        vertical-align: baseline;

        p {
          position: relative;
          display: inline;
          img {
            vertical-align: text-top;
          }
        }
      }
  </code></pre>`);

  return (
    <div className="App">
      <LidiaEditor
        html={html}
        onlyPreview={true};
      />
    </div>
  );
}

export default App;

```
