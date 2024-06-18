import React, { useState } from 'react';
import { LidiaEditor } from '../index';
import './LidiaEditorComponent.css';

/**
 * Primary UI component for user interaction
 */

export const LidiaEditorComponent = ({ className, onlyPreview }: any) => {
  const [htmlContent, setHtmlContent] = useState("second")

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
    </>
  )
}