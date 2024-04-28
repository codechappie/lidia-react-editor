import React from 'react';
import { LidiaEditor } from '../index';
// import './button.css';

/**
 * Primary UI component for user interaction
 */

export const LidiaEditorComponent = ({ className, html, setHtml }: any) => {
  return (
    <>
      <LidiaEditor
        className={className}
        html={html}
        setHtml={setHtml}
      />
    </>
  )
}