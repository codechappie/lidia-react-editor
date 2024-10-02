import React, { useState } from 'react';
import { LidiaEditor } from '../index';
import './LidiaEditorComponent.css';

/**
 * Primary UI component for user interaction
 */

export const LidiaEditorComponent = ({ className, onlyPreview = false }: any) => {
  const [htmlContent, setHtmlContent] = useState(`<h1>Familiar. Fully-featured. Mobile optimized.</h1>
  <p>Use Editor as:</p>
  <ul>
  <li>A <strong>basic</strong> editor</li>
  <li>An advanced 📝 editor</li>
  <li>An AI-powered 🪄✨ editor</li>
  <li>A {{template-based}} editor</li>
  <li>A totally <span class="highlight"><code>&lt;customized&gt;</code></span> editor</li>
  <li>An equation ➕ formula editor</li>
  </ul>
  <pre id="prer2code"><code as="code" data-node-view-content="" style="white-space: pre-wrap;"><div style="white-space: inherit;"><span class="hljs-keyword">import</span> <span class="hljs-title class_">React</span>, { <span class="hljs-title class_">Component</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> logo <span class="hljs-keyword">from</span> <span class="hljs-string">'./logo.svg'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./App.css'</span>;

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Component</span> {
  <span class="hljs-title function_">render</span>() {
    <span class="hljs-keyword">return</span> (
        <span class="xml hljs-tag">&lt;</span><span class="xml hljs-tag hljs-name">p</span><span class="xml hljs-tag"> </span><span class="xml hljs-tag hljs-attr">className</span><span class="xml hljs-tag">=</span><span class="xml hljs-tag hljs-string">"App-intro"</span><span class="xml hljs-tag">&gt;</span><span class="xml">
          I'm a childish component
        </span><span class="xml hljs-tag">&lt;/</span><span class="xml hljs-tag hljs-name">p</span><span class="xml hljs-tag">&gt;</span>
    );
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title class_">Child</span>;</div></code></pre>
  <p>With an open source Core, uncomplicated low-code plug-in structure and additional Premium add-ons, Editor scales with your app as you grow. That&rsquo;s why it&rsquo;s the WYSIWYG editor-of-choice for 1.5M+ developers when they need to build and ship products faster.</p>
  <img style="float: right;" role="presentation" src="https://media.istockphoto.com/id/592031250/photo/milky-way-and-pink-light-at-mountains-night-colorful-landscape.jpg?s=612x612&w=0&k=20&c=MlBuwRU4M-eZda80ONcdV9NbwtyJQrvggug31A6vLJU=" alt="Demo image" width="316">

  
  <h2>Play with this demo to see how it works!</h2>`)

  const changeText = () => {
    setHtmlContent("Change content")
  }
  return (
    <>
      <button
        className='change'
        onClick={changeText}
      >Change</button>
      <LidiaEditor
        className={className}
        html={htmlContent}
        setHtml={setHtmlContent}
        onlyPreview={onlyPreview}
      />


      <LidiaEditor
        className={className}
        html={htmlContent}
        editorStyle='preview'
        onlyPreview={true}
      />
    </>
  )
}