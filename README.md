# LidiaEditor React Component

`LidiaEditor` component [full featured demo](https://lidia-editor.codechappie.com) provides a rich text editor (minimal WYSIWYG) with various configurable functionalities. A React component that utilizes Tiptap suite.

## Key Features

The `LidiaEditor` component offers a robust set of features designed to enhance text editing and customization within React applications.

- **HTML Content Editing**: Edit and manipulate HTML content directly within the editor.
- **Text Formatting**: Apply styles such as bold, italic, underline, and more to text selections.
- **Lists and Tables**: Easily create and manage lists and tables within your content.
- **Editor Styles**: Choose from multiple visual styles to customize the editor's appearance. Types `default`, `white`, `dark`, `preview`.
- **Syntax Highlighting**: Highlight code blocks for improved readability and comprehension.
- **Link and Image Handling**: Insert and manage hyperlinks and images seamlessly.
- **Text Alignment**: Align headings and paragraphs according to your document's layout.

## Screenshots

![Lidia Editor screenshots](https://i.imgur.com/ruopGws.png)

## Installation

To use `LidiaEditor`, install it via npm:

```bash
npm install lidia-react-editor
```


```jsx
import React, { useState } from 'react';
import { LidiaEditor } from 'lidia-react-editor';
// To visualize all available styles import the theme CSS file
import "lidia-react-editor/dist/theme.css";

const MyComponent = () => {
  const [html, setHtml] = useState('<p>Example text</p>');

  return (
    <LidiaEditor
      className="myEditor"
      html={html}
      setHtml={setHtml}
    />
  );
}

export default MyComponent;

```

## Props

| Prop          | Type                        | Required | Default       | Description                                                                                      |
|---------------|-----------------------------|----------|---------------|--------------------------------------------------------------------------------------------------|
| `className`   | string                      | No       |             | Optional CSS class for customizing the component's style.                                        |
| `html`        | string                      | Yes      | -             | HTML content to be displayed and edited in the editor.                                            |
| `setHtml`     | function                    | No       | -             | Function to update the edited HTML content.                                                       |
| `onlyPreview` | boolean                     | No       | `false`       | Indicates if the editor should be in preview-only mode (no editing).                              |
| `editorStyle` | "default" \| "white" \| "dark" \| "preview" | No       | `"preview"`   | Visual style of the editor. Options: `"default"`, `"white"`, `"dark"`, `"preview"`.            |


## Examples
#### Example 1: Preview-only mode

In this example, the editor is displayed in preview-only mode, disabling content editing.

```jsx
<LidiaEditor
  html={html}
  onlyPreview={true}
  editorStyle="preview"
/>
```

#### Example 2: Editor Styles

* `default`: The default style provides a standard appearance for the editor.

* `white`: The white style gives the editor a clean and minimalistic look with a light background.

* `dark`: The dark style themes the editor with a dark background and light text for better readability in low-light environments.

* `preview`: The preview style optimizes the editor for displaying content without editing capabilities, ideal for read-only use cases.

```jsx
<LidiaEditor
  html={html}
  onlyPreview={true}
  editorStyle="dark"
/>
```

## Notes
* Ensure all necessary dependencies are installed based on the configured extensions in the editor.
* Adjust CSS classes and editor styles as per your application's design requirements.

## How to Contribute

Thank you for your interest in contributing to the `LidiaEditor` project! Contributions are valuable and help improve the component for all users. Here’s how you can [Contribute](https://github.com/codechappie/lidia-react-editor/blob/main/CONTRIBUTING.md)

### Reporting Issues

If you encounter any bugs or issues while using `LidiaEditor`, please [open an issue](https://github.com/codechappie/lidia-react-editor/issues) on GitHub. Be sure to include detailed information about the problem, steps to reproduce it, and any relevant screenshots or error messages.

### Feature Requests

Have an idea for a new feature or enhancement? You can [submit a feature request](https://github.com/codechappie/lidia-react-editor/pulls) on GitHub. Describe the feature thoroughly, including its use case and any expected behavior.

### Pull Requests

Contributions through pull requests are welcome and encouraged. To contribute code:

1. Fork the repository on GitHub.
2. Create a new branch from the `main` branch for your changes.
3. Make your modifications, ensuring code quality and adhering to the project’s coding conventions.
4. Test your changes thoroughly to ensure they work as expected.
5. Commit your changes with clear and descriptive commit messages.
6. Push your branch to your fork and submit a pull request to the `main` branch of the main repository.

### Guidelines

When contributing code, please follow these guidelines:

- Ensure all code follows the existing coding style and conventions.
- Include necessary tests and ensure all tests pass successfully.
- Update documentation as needed for any new features or changes.
- Be responsive to feedback and comments on your pull request.

### Code of Conduct

All contributors are expected to adhere to the project’s Code of Conduct. Respectful and inclusive behavior is essential for creating a positive and productive community around the project.

### Contact

For questions or assistance regarding contributions, please [visit CodeChappie's Links page](https://www.codechappie.com/enlaces) for contact information. Thank you for contributing to LidiaEditor!


## License
By contributing, you agree that your contributions will be licensed under its MIT License.