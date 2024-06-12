// import BulletList from '@tiptap/extension-bullet-list';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from "@tiptap/extension-highlight";
import Link from '@tiptap/extension-link';
// import ListItem from '@tiptap/extension-list-item'; CHECK IF FAILS
// import OrderedList from '@tiptap/extension-ordered-list';
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from 'react';
import Image from '@tiptap/extension-image';
// import Code from '@tiptap/extension-code'
import Focus from '@tiptap/extension-focus'


import Dropcursor from '@tiptap/extension-dropcursor'

// TODO: TABLE MANAGEMENT
// TODO: TASK LIST
// TODO: ADD MORE FONTS
import { common, createLowlight } from 'lowlight';
import { Iframe } from "./extensions/Iframe";

import 'highlight.js/styles/tokyo-night-dark.min.css';

import s from './styles.module.scss';



const lowlight = createLowlight(common)


const alignOptions = [
  {
    value: "center",
  }, {
    value: "left",
  },
  {
    value: "right",
  },
  {
    value: "justify",
  }];

const MenuBar = ({ editor, configAndActions }: any) => {
  const [iframeTitle, setIframeTitle] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  const [showModal, setShowModal] = useState(false);

  if (!editor) {
    return null;
  }

  console.log(configAndActions)

  const getFontValue = () => {
    if (editor.isActive('textStyle', { fontFamily: 'Poppins' })) {
      return "Poppins"
    } else if (editor.isActive('textStyle', { fontFamily: 'Inter' })) {
      return "Inter"
    } else if (editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' })) {
      return "Comic Sans"
    } else if (editor.isActive('textStyle', { fontFamily: 'monospace' })) {
      return "Monospace"
    } else {
      return "Poppins"
    }

  }


  const getHeadingValue = () => {
    // console.log("EDITOR", editor.isActive("heading", { level: 1 }));
    if (editor.isActive("heading", { level: 1 })) {
      return "Heading"
    } else if (editor.isActive("heading", { level: 2 })) {
      return "Sub heading"
    } else if (editor.isActive("heading", { level: 3 })) {
      return "Sub heading 2"
    } else if (editor.isActive("heading", { level: 4 })) {
      return "Sub heading 3"
    } else if (editor.isActive("heading", { level: 5 })) {
      return "Sub heading 4"
    } else if (editor.isActive("heading", { level: 6 })) {
      return "Sub heading 5"
    } else {
      return "Normal"
    }

  }

  const getCurrentValue = (id: string): any => {
    if (id === "align") {
      if (editor.isActive({ textAlign: "left" })) {
        return <AlignIcon id="left" />
      }
      if (editor.isActive({ textAlign: "right" })) {
        return <AlignIcon id="right" />
      }
      if (editor.isActive({ textAlign: "center" })) {
        return <AlignIcon id="center" />
      }
      if (editor.isActive({ textAlign: "justify" })) {
        return <AlignIcon id="justify" />
      }
    }
  }


  return (
    <div className={`${s.menuBar} ${s.withBackground}`}>
      <Modal showModal={showModal}>
        <IframeContent
          editor={editor}
          iframeTitle={iframeTitle}
          setIframeTitle={setIframeTitle}
          iframeSrc={iframeSrc}
          setIframeSrc={setIframeSrc}
          setShowModal={setShowModal}
          setIframeContent={setIframeContent}
        />
      </Modal>
      <div className={s.container}>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className={s.onlyIcon}
          title='Undo'
        >
          <svg
            width={25}
            height={25}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 10H7.815L11.402 6.414L10 5L4 11L10 17L11.402 15.585L7.818 12H20C21.5913 12 23.1174 12.6321 24.2426 13.7574C25.3679 14.8826 26 16.4087 26 18C26 19.5913 25.3679 21.1174 24.2426 22.2426C23.1174 23.3679 21.5913 24 20 24H12V26H20C22.1217 26 24.1566 25.1571 25.6569 23.6569C27.1571 22.1566 28 20.1217 28 18C28 15.8783 27.1571 13.8434 25.6569 12.3431C24.1566 10.8429 22.1217 10 20 10Z"
              fill="#212529"
            />
          </svg>

        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          className={s.onlyIcon}
          title='Redo'
        >
          <svg
            width={25}
            height={25}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 10H24.185L20.598 6.414L22 5L28 11L22 17L20.598 15.585L24.182 12H12C10.4087 12 8.88258 12.6321 7.75736 13.7574C6.63214 14.8826 6 16.4087 6 18C6 19.5913 6.63214 21.1174 7.75736 22.2426C8.88258 23.3679 10.4087 24 12 24H20V26H12C9.87827 26 7.84344 25.1571 6.34315 23.6569C4.84285 22.1566 4 20.1217 4 18C4 15.8783 4.84285 13.8434 6.34315 12.3431C7.84344 10.8429 9.87827 10 12 10Z"
              fill="#212529"
            />
          </svg>

        </button>

        <FontSelector
          editor={editor}
          getFontValue={getFontValue}
          configAndActions={configAndActions}
        />

        <HeadingSelector
          editor={editor}
          getHeadingValue={getHeadingValue}
          configAndActions={configAndActions}
        />

        <AlignSelector
          editor={editor}
          options={alignOptions}
          type="align"
          getValue={getCurrentValue}
        />

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${s.onlyIcon} ${editor.isActive("bold") ? s.isActive : ""}`}
        >
          <svg
            width={19}
            height={19}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.7031 12C15.4559 12 17.6875 9.7614 17.6875 7C17.6875 4.23857 15.4559 2 12.7031 2H5V12H12.7031Z"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.5156 22C17.2684 22 19.5 19.7614 19.5 17C19.5 14.2386 17.2684 12 14.5156 12H5V22H14.5156Z"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${s.onlyIcon} ${editor.isActive("italic") ? s.isActive : ""}`}
        >
          <svg
            width={19}
            height={19}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3H18"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 21H14"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.5 2.97607L9.5 20.9999"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${s.onlyIcon} ${editor.isActive("strike") ? s.isActive : ""}`}
        >
          <svg
            width={25}
            height={25}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 15H17.956C17.512 14.8806 17.0659 14.7689 16.618 14.665C13.81 14.001 12.222 13.515 12.222 11.242C12.1992 10.8496 12.2573 10.4567 12.3927 10.0877C12.5281 9.71873 12.7378 9.3815 13.009 9.09698C13.8584 8.39848 14.9223 8.01359 16.022 8.00698C18.852 7.93698 20.157 8.89698 21.224 10.357L22.839 9.17698C22.083 8.09133 21.0524 7.22583 19.8524 6.66888C18.6525 6.11194 17.3261 5.88353 16.009 6.00698C14.391 6.01731 12.8302 6.60652 11.609 7.66798C11.1461 8.13747 10.7844 8.69681 10.546 9.31149C10.3076 9.92618 10.1977 10.5832 10.223 11.242C10.1791 11.9629 10.3146 12.6834 10.6171 13.3392C10.9197 13.9949 11.3801 14.5655 11.957 15H4V17H17.652C19.619 17.57 20.795 18.312 20.825 20.358C20.8575 20.795 20.7975 21.234 20.649 21.6463C20.5005 22.0587 20.2667 22.435 19.963 22.751C18.9048 23.5851 17.5901 24.0265 16.243 24C15.2375 23.9708 14.2518 23.7134 13.3605 23.2472C12.4691 22.781 11.6955 22.1182 11.098 21.309L9.565 22.593C10.3417 23.6281 11.3439 24.4728 12.4956 25.0631C13.6472 25.6534 14.9181 25.9738 16.212 26H16.312C18.1588 26.0212 19.9512 25.3753 21.36 24.181C21.86 23.6769 22.2487 23.0735 22.501 22.4098C22.7534 21.7461 22.8637 21.0369 22.825 20.328C22.8623 19.1152 22.4531 17.931 21.675 17H28V15Z"
              fill="black"
              fillOpacity="0.65"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${s.onlyIcon} ${editor.isActive('underline') ? s.isActive : ''}`}
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 22H20"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.5 3.04834C18.5 6.38165 18.5 7.6665 18.5 10.9998C18.5 14.5897 15.5898 17.4998 12 17.4998C8.41015 17.4998 5.5 14.5897 5.5 10.9998C5.5 7.6665 5.5 6.38165 5.5 3.04834"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`${s.onlyIcon} ${editor.isActive('highlight') ? s.isActive : ''}`}
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 22V12.5H6V8.5H18V12.5H21V22H3Z"
              fill="white"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <path
              d="M8.5 8.5V4L15.5 2V8.5"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>


        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${s.onlyIcon} ${editor.isActive('orderedList') ? s.isActive : ''}`}
        >
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4.5H21"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 9.5H21"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 14.5H21"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 19.5H21"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 14.5H6V16L3 19V19.5H6"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 9.5H5.5M3.5 5.5L4.5 4.5V9.5L3.5 5.5ZM4.5 9.5H3.5H4.5Z"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${s.onlyIcon} ${editor.isActive('bulletList') ? s.isActive : ''}`}
        >
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 21C5.10455 21 6 20.1045 6 19C6 17.8954 5.10455 17 4 17C2.89543 17 2 17.8954 2 19C2 20.1045 2.89543 21 4 21Z"
              fill="white"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <path
              d="M4 6C4.55228 6 5 5.5523 5 5C5 4.44771 4.55228 4 4 4C3.44771 4 3 4.44771 3 5C3 5.5523 3.44771 6 4 6Z"
              fill="white"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <path
              d="M4 13C4.55228 13 5 12.5523 5 12C5 11.4477 4.55228 11 4 11C3.44771 11 3 11.4477 3 12C3 12.5523 3.44771 13 4 13Z"
              fill="white"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <path
              d="M10 12H22"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 19H22"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 5H22"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`${s.onlyIcon} ${editor.isActive('code') ? s.isActive : ''}`}
        >
          <svg
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2C7 2 5.5 2.5 5.5 4.5C5.5 6.5 5.5 7.5 5.5 9C5.5 10.5 3 11.5 3 11.5C3 11.5 5.5 12.5 5.5 14C5.5 15.5 5.5 17.5 5.5 19.5C5.5 21.5 7 22 8 22"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 2C17 2 18.5 2.5 18.5 4.5C18.5 6.5 18.5 7.5 18.5 9C18.5 10.5 21 11.5 21 11.5C21 11.5 18.5 12.5 18.5 14C18.5 15.5 18.5 17.5 18.5 19.5C18.5 21.5 17 22 16 22"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${s.onlyIcon} ${editor.isActive('codeBlock') ? s.isActive : ''}`}
        >
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 6.5L2 12.7161L8 18.5"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 6.5L22 12.7161L16 18.5"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.3302 2.5L10.9453 21.5"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>

        </button>

        <button
          onClick={() => setALink(editor)}
          className={`${s.onlyIcon} ${editor.isActive('link') ? s.isActive : ''}`}
        >
          <svg
            width={23}
            height={23}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3536 4.78247L4.92898 12.2071C3.17162 13.9644 3.17162 16.8137 4.92898 18.571C6.68634 20.3284 9.53559 20.3284 11.2929 18.571L20.1318 9.73224C21.3033 8.56064 21.3033 6.66114 20.1318 5.48959C18.9602 4.318 17.0607 4.318 15.8891 5.48959L7.05029 14.3284C6.46454 14.9142 6.46454 15.8639 7.05029 16.4497C7.63609 17.0355 8.58584 17.0355 9.17164 16.4497L16.5962 9.02509"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

        </button>


        <button
          onClick={() => openModal(editor, configAndActions, iframeTitle, setIframeTitle, setIframeSrc, setShowModal)}
          className={s.onlyIcon}
        >
          <svg
            width={21}
            height={21}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.5 8V21H2.5V8"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.5 2H21.5V8H2.5V2Z"
              fill="white"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.5 6C6.0523 6 6.5 5.5523 6.5 5C6.5 4.44771 6.0523 4 5.5 4C4.94771 4 4.5 4.44771 4.5 5C4.5 5.5523 4.94771 6 5.5 6Z"
              fill="black"
              fillOpacity="0.65"
            />
            <path
              d="M6.25 5C6.25 5.41423 5.91423 5.75 5.5 5.75C5.08578 5.75 4.75 5.41423 4.75 5C4.75 4.58579 5.08579 4.25 5.5 4.25C5.91423 4.25 6.25 4.58578 6.25 5Z"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth="0.5"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.5 6C9.0523 6 9.5 5.5523 9.5 5C9.5 4.44771 9.0523 4 8.5 4C7.9477 4 7.5 4.44771 7.5 5C7.5 5.5523 7.9477 6 8.5 6Z"
              fill="black"
              fillOpacity="0.65"
            />
            <path
              d="M9.25 5C9.25 5.41423 8.91423 5.75 8.5 5.75C8.08577 5.75 7.75 5.41423 7.75 5C7.75 4.58578 8.08577 4.25 8.5 4.25C8.91423 4.25 9.25 4.58578 9.25 5Z"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth="0.5"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.5 6C12.0523 6 12.5 5.5523 12.5 5C12.5 4.44771 12.0523 4 11.5 4C10.9477 4 10.5 4.44771 10.5 5C10.5 5.5523 10.9477 6 11.5 6Z"
              fill="black"
              fillOpacity="0.65"
            />
            <path
              d="M12.25 5C12.25 5.41423 11.9142 5.75 11.5 5.75C11.0858 5.75 10.75 5.41423 10.75 5C10.75 4.58578 11.0858 4.25 11.5 4.25C11.9142 4.25 12.25 4.58578 12.25 5Z"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth="0.5"
            />
          </svg>

        </button>

        <button
          onClick={() => addImage(editor)}
          className={`${s.onlyIcon} ${editor.isActive('image') ? s.isActive : ''}`}
        >
          <svg
            width={22}
            height={22}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.5 4H20.5C21.0523 4 21.5 4.44772 21.5 5V19C21.5 19.5523 21.0523 20 20.5 20H3.5C2.94772 20 2.5 19.5523 2.5 19V5C2.5 4.44772 2.94772 4 3.5 4Z"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.25 9C7.66421 9 8 8.66421 8 8.25C8 7.83579 7.66421 7.5 7.25 7.5C6.83579 7.5 6.5 7.83579 6.5 8.25C6.5 8.66421 6.83579 9 7.25 9Z"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 12L10 14L13 10.5L21.5 17V19C21.5 19.5523 21.0523 20 20.5 20H3.5C2.94772 20 2.5 19.5523 2.5 19V17L7.5 12Z"
              fill="white"
              stroke="black"
              strokeOpacity="0.65"
              strokeWidth={2}
              strokeLinejoin="round"
            />
          </svg>

        </button>
      </div>
    </div>
  );
};



const openModal = (editor: any, configAndActions: any, iframeTitle: any, setIframeTitle: any, setIframeSrc: any, setShowModal: any) => {
  const src = editor.getAttributes("iframe").src
  const title = editor.getAttributes("iframe").title
  console.log("IFRAME: ", iframeTitle)
  // Modal

  if (title) {
    setIframeTitle(title)
  } else {
    setIframeTitle("")
  }

  if (src) {
    setIframeSrc(src)
  } else {
    setIframeSrc("")
  }

  // if (src === null) {
  //   return
  // }

  setShowModal(true);

  // const title = window.prompt('Title:');
  // const src = window.prompt('URL:');

  // if (iframeTitle !== "") {

  // }
}

const setIframeContent = (editor: any, iframeTitle: any, iframeSrc: any) => {
  editor.chain().focus()
    .setIframe({
      title: iframeTitle,
      src: iframeSrc
    }).run()
}

const addImage = (editor: any) => {
  const url = window.prompt('URL');
  if (url) {
    // editor.chain().focus().setImage({ src: url }).run()
    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: 'image',
          attrs: {
            src: url,
          },
        },
      ])
      .run()
  }
}

const setALink = (editor: any) => {
  const previousUrl = editor.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)
  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink()
      .run()

    return
  }

  // update link
  editor.chain().focus().extendMarkRange('link').setLink({ href: url })
    .run()
}


type EditorProps = {
  className?: string;
  html: string;
  setHtml: any;
};

/**
* Button component
* @param text Text to display in the button
* @param onClick Function to call when the button is clicked
* @returns Button component
*/
export const LidiaEditor = ({ className, html, setHtml }: EditorProps) => {
  const [overlayisActive, setOverlayIsActive] = useState(false);
  const editor = useEditor({
    onUpdate({ editor }: any) {
      setHtml && setHtml(editor.getHTML())
    },
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      CodeBlockLowlight
        .extend({
          addNodeView() {
            return ReactNodeViewRenderer(CodeBlockComponent)
          },
        })
        .configure({ lowlight }),
      Link.configure({
        // TODO: CHANGE TO TRUE IF IS  PREVIEW COMPONENT
        openOnClick: false,
        autolink: true,
      }),
      Image.configure({
        inline: true,
      }),
      Iframe,
      TextStyle,
      FontFamily,
      Dropcursor,
      Focus.configure({
        className: s.focus,
        mode: 'all',
      }),
    ],
    autofocus: true,
    content: html
  });

  const configAndActions = {
    overlay: {
      overlayisActive,
      setOverlayIsActive,
    }
  };

  return (
    <div className={`${s.lidiaEditor} ${s.withBackground} ${className ? className : ''}`}>
      <MenuBar
        editor={editor}
        configAndActions={configAndActions}
      />


      <div className={s.editorContainer}>
        <EditorContent
          className={s.editor}
          editor={editor}
        />
      </div>
    </div>
  );
}



const FontSelector = ({ editor, getFontValue }: any) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <div className={`${s.lidiaEditorOverlay}  ${active ? s.show : ''}`} onClick={() => setActive(!active)}></div>
      <div className={`${s.customSelect} ${active ? s.show : ''}`}>
        <button className={s.selector} onClick={() => setActive(!active)}>
          <span>
            {getFontValue() || "Poppins"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            style={{ fill: "rgba(0, 0, 0, 1)" }}
          >
            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z" />
          </svg>
        </button>
        <div className={s.options}>
          <button
            onClick={() => {
              editor.chain().focus().setFontFamily('Poppins').run();
              setActive(!active);
            }}
            className={getFontValue() === "Poppins" ? s.isActive : ""}
          >
            <span className={s.text}>
              Poppins
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </button>
          <button
            onClick={() => {
              editor.chain().focus().setFontFamily('Inter').run()
              setActive(!active);
            }}
            className={editor.isActive('textStyle', { fontFamily: 'Inter' }) ? s.isActive : ""}
          >
            <span className={s.text}>Inter</span>
            <span className={s.icon}><CheckIcon /></span>
          </button>
          <button
            onClick={() => {
              editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run();
              setActive(!active);
            }}
            className={editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' }) ? s.isActive : ""}
          >
            <span className={s.text}>
              Comic Sans
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </button>

          <button
            onClick={() => {
              editor.chain().focus().setFontFamily('monospace').run();
              setActive(!active);
            }}
            className={editor.isActive('textStyle', { fontFamily: 'monospace' }) ? s.isActive : ""}
          >
            <span className={s.text}>
              Monospace
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </button>
        </div>
      </div>
    </>
  )
}

const HeadingSelector = ({ editor, getHeadingValue }: any) => {
  const [active, setActive] = useState(false);


  return (
    <>

      <div className={`${s.lidiaEditorOverlay}  ${active ? s.show : ''}`}
        onClick={() => setActive(!active)}></div>

      <div className={`${s.customSelect} ${active ? s.show : ''}`}>
        <button className={s.selector} onClick={() => setActive(!active)}>
          <span>
            {getHeadingValue() || "Normal"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            style={{ fill: "rgba(0, 0, 0, 1)" }}
          >
            <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z" />
          </svg>
        </button>
        <div className={s.options}>
          <button
            onClick={() => {
              editor.chain().focus().setParagraph().run();
              setActive(!active);
            }}
            className={editor.isActive("paragraph") ? s.isActive : ""}
          >
            <span className={s.text}>Normal</span>
            <span className={s.icon}><CheckIcon /></span>
          </button>
          <button
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 1 }).run();
              setActive(!active);
            }}
            className={editor.isActive("heading", { level: 1 }) ? s.isActive : ""}
          >
            <span className={s.text}>
              Heading
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </button>
          <button
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 2 }).run();
              setActive(!active);
            }}
            className={editor.isActive("heading", { level: 2 }) ? s.isActive : ""}
          >
            <span className={s.text}>
              Sub heading
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </button>
          <button
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 3 }).run();
              setActive(!active);
            }}
            className={editor.isActive("heading", { level: 3 }) ? s.isActive : ""}
          >
            <span className={s.text}>
              Sub heading 2
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </button>
          <button
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 4 }).run();
              setActive(!active);
            }}
            className={editor.isActive("heading", { level: 4 }) ? s.isActive : ""}
          >
            <span className={s.text}>
              Sub heading 3
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </button>
          <button
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 5 }).run();
              setActive(!active);
            }}
            className={editor.isActive("heading", { level: 5 }) ? s.isActive : ""}
          >
            <span className={s.text}>
              Sub heading 4
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </button>
          <button
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 6 }).run();
              setActive(!active);
            }}
            className={editor.isActive("heading", { level: 6 }) ? s.isActive : ""}
          >
            <span className={s.text}>
              Sub heading 5
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </button>
        </div>
      </div>
    </>
  )
}

const AlignSelector = ({ editor, getValue, type, options }: any) => {
  const [active, setActive] = useState(false);


  if (type === "align") {
    return (
      <>
        <div className={`${s.lidiaEditorOverlay}  ${active ? s.show : ''}`}
          onClick={() => setActive(!active)}></div>
        <div className={`${s.iconSelect} ${s.inRow} ${active ? s.show : ''}`}>
          <button className={s.selector} onClick={() => setActive(!active)}>
            <span>
              {getValue(type) || <AlignIcon id="left" />}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              style={{ fill: "rgba(0, 0, 0, 1)" }}
            >
              <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z" />
            </svg>
          </button>
          <div className={s.options}>
            {options.map((item: any) => (
              <button
                key={item.value}
                onClick={() => {
                  editor.chain().focus().setTextAlign(item.value).run();
                  setActive(!active);
                }}
              >
                <AlignIcon id={item.value} />
              </button>
            ))}
          </div>
        </div>
      </>
    )
  } else {
    return null
  }

}

const AlignIcon = ({ id }: any) => {

  if (id === "left") {
    return <svg
      width={21}
      height={21}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 4.5H3"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 9.5H3"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14.5H3"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 19.5H3"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

  } else if (id === "right") {
    return <svg
      width={21}
      height={21}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 4.5H3"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 9.5H7"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14.5H3"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 19.5H7"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>


  } else if (id === "center") {
    return <svg
      width={21}
      height={21}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 9.5H6"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 4.5H3"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14.5H3"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 19.5H6"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

  } else if (id === "justify") {
    return <svg
      width={21}
      height={21}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 9.5H3"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 4.5H3"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14.5H3"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 19.5H3"
        stroke="black"
        strokeOpacity="0.65"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

  } else {
    return null;
  }

}

export const CodeBlockComponent = ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }: any) => (
  <NodeViewWrapper className={s.codeBlock}>
    <select
      contentEditable={false}
      defaultValue={defaultLanguage}
      onChange={event => updateAttributes({ language: event.target.value })}>
      <option value="null">
        auto
      </option>
      <option disabled>
        —
      </option>
      {extension.options.lowlight.listLanguages().map((lang: any, index: any) => (
        <option key={index} value={lang}>
          {lang}
        </option>
      ))}
    </select>
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
)


const CheckIcon = () => {
  return <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12L10 17L20 7"
      stroke="black"
      strokeOpacity="0.65"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
}

const Modal = ({ children, width = "auto", showModal = false }: any) => {
  return <div className={`${s.modal} ${showModal ? s.show : ""}`}>
    <div className={`${s.content} ${width === "full" ? s.full : s.auto}`}>
      {children}
    </div>
  </div>
}

const IframeContent = ({ editor, setIframeContent, iframeTitle, setIframeTitle, iframeSrc, setIframeSrc, setShowModal }: any) => {

  const showData = () => {
    setShowModal(false);
    setIframeContent(editor, iframeTitle, iframeSrc)
  }

  return <div className={s.iframeModal}>
    <h3>Add a new iframe content</h3>
    <input
      type="text"
      placeholder='Title'
      value={iframeTitle}
      onChange={(e) => setIframeTitle(e.target.value)}
    />
    <input
      type="url"
      placeholder='URL'
      value={iframeSrc}
      onChange={(e) => setIframeSrc(e.target.value)}
    />

    <button onClick={showData}>
      Save
    </button>
  </div>
}