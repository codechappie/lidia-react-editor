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
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { Color } from '@tiptap/extension-color'

import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Dropcursor from '@tiptap/extension-dropcursor'

import { common, createLowlight } from 'lowlight';
import { Iframe } from "./extensions/Iframe";

import 'highlight.js/styles/tokyo-night-dark.min.css';

import s from './styles.module.scss';
import "./global.css";


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
  const [textColor, setTextColor] = useState("");

  if (!editor) {
    return null;
  }


  const getFontValue = () => {
    if (editor.isActive('textStyle', { fontFamily: 'Poppins' })) {
      return "Poppins"
    } else if (editor.isActive('textStyle', { fontFamily: 'Verdana, Geneva' })) {
      return "Verdana"
    } else if (editor.isActive('textStyle', { fontFamily: 'Inter' })) {
      return "Inter"
    } else if (editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' })) {
      return "Comic Sans"
    } else if (editor.isActive('textStyle', { fontFamily: 'monospace' })) {
      return "Monospace"
    } else if (editor.isActive('textStyle', { fontFamily: 'Arial Black' })) {
      return "Arial"
    } else return "Poppins"

  }


  const getHeadingValue = () => {
    if (editor.isActive("heading", { level: 1 })) {
      return "Heading"
    } else if (editor.isActive("heading", { level: 2 })) {
      return "Sub heading"
    } else if (editor.isActive("heading", { level: 3 })) {
      return "Sub heading 3"
    } else if (editor.isActive("heading", { level: 4 })) {
      return "Sub heading 4"
    } else if (editor.isActive("heading", { level: 5 })) {
      return "Sub heading 5"
    } else if (editor.isActive("heading", { level: 6 })) {
      return "Sub heading 6"
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
      <Modal
        setShowModal={setShowModal}
        showModal={showModal}>
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
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0833 20.5833L4.75 14.25M4.75 14.25L11.0833 7.91663M4.75 14.25H25.3333C29.7056 14.25 33.25 17.7944 33.25 22.1666C33.25 26.5389 29.7056 30.0833 25.3333 30.0833H17.4167"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>


        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          className={s.onlyIcon}
          title='Redo'
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.9167 20.5833L33.25 14.25M33.25 14.25L26.9167 7.91663M33.25 14.25H12.6667C8.29441 14.25 4.75 17.7944 4.75 22.1666C4.75 26.5389 8.29441 30.0833 12.6667 30.0833H20.5833"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
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
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6665 19H19.7915M12.6665 19V7.91663H19.7915C22.8521 7.91663 25.3332 10.3977 25.3332 13.4583C25.3332 16.5189 22.8521 19 19.7915 19M12.6665 19V30.0833H21.3748C24.4354 30.0833 26.9165 27.6022 26.9165 24.5416C26.9165 21.481 24.4354 19 21.3748 19H19.7915"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${s.onlyIcon} ${editor.isActive("italic") ? s.isActive : ""}`}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6665 30.0833H15.8332M15.8332 30.0833H18.9998M15.8332 30.0833L22.1665 7.91663M18.9998 7.91663H22.1665M22.1665 7.91663H25.3332"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${s.onlyIcon} ${editor.isActive("strike") ? s.isActive : ""}`}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.0009 19.0002C20.4187 19.0002 21.8105 19.3048 23.0308 19.8821C23.5821 20.1429 24.0899 20.4554 24.5433 20.8109C25.0935 21.2424 25.5642 21.7376 25.9387 22.2825C26.6217 23.2765 26.9585 24.3986 26.9139 25.5323C26.8694 26.666 26.445 27.7693 25.6853 28.7269C24.9256 29.6846 23.8584 30.4611 22.5951 30.976C21.3319 31.4909 19.9188 31.7257 18.5038 31.6545C17.0888 31.5833 15.7243 31.2089 14.5517 30.5713C13.3791 29.9338 12.4417 29.0564 11.8381 28.0301M19.0009 19.0002H6.3335M19.0009 19.0002H31.6668M26.1636 9.97057C25.5599 8.94429 24.6228 8.06653 23.4502 7.42899C22.2776 6.79146 20.9123 6.41708 19.4973 6.34586C18.0823 6.27464 16.6692 6.50898 15.406 7.02391C14.1427 7.53884 13.0755 8.31579 12.3158 9.27345C11.5561 10.2311 11.1319 11.3349 11.0874 12.4686C11.0743 12.8007 11.0941 13.1313 11.1456 13.4586"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${s.onlyIcon} ${editor.isActive('underline') ? s.isActive : ''}`}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5 30.0833H28.5M12.6667 7.91663V17.4166C12.6667 20.9144 15.5022 23.75 19 23.75C22.4978 23.75 25.3333 20.9144 25.3333 17.4166V7.91663"
            />
          </svg>
        </button>

        <button
          className={`${s.onlyIcon} ${s.inputHidden}`}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8333 30.0833H19M19 30.0833H22.1667M19 30.0833V7.91663M19 7.91663H9.5V9.49996M19 7.91663H28.5V9.49996"
            />
          </svg>

          <div
            className={s.inputHidden}
          >
            <input
              type="color"
              onChange={(e) => {
                changeTextColor(editor, setTextColor, e.target.value);
              }} />
          </div>
          <div className={s.colorIndicator}
            style={{
              background: textColor
            }}
          ></div>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`${s.onlyIcon} ${editor.isActive('highlight') ? s.isActive : ''}`}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.5269 32.6936L29.5268 27.6231C29.5268 27.1105 29.1378 26.6872 28.6265 26.6435L8.81954 24.9531C8.20918 24.901 7.68732 25.4047 7.71893 26.0155L8.0645 32.6936"
            />
            <path
              d="M29.2472 27.0346L8.1207 25.0032L13.8123 15.6063L22.9198 15.6182L29.3148 26.721L29.2472 27.0346ZM15.4303 8.61911L18.9838 6.38119L21.2117 12.615L14.807 12.5491L15.4303 8.61911Z"
            />
          </svg>
        </button>


        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${s.onlyIcon} ${editor.isActive('orderedList') ? s.isActive : ''}`}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8335 26.9166H31.6668M6.3335 24.8351V24.5416C6.3335 23.23 7.39682 22.1666 8.7085 22.1666H8.77269C10.0489 22.1666 11.0838 23.2013 11.0838 24.4775C11.0838 25.033 10.9033 25.5739 10.57 26.0183L6.3335 31.6669L11.0835 31.6666M15.8335 19H31.6668M15.8335 11.0833H31.6668M6.3335 7.91665L9.50016 6.33331V15.8333"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${s.onlyIcon} ${editor.isActive('bulletList') ? s.isActive : ''}`}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.2498 26.9166H30.0832M14.2498 19H30.0832M14.2498 11.0833H30.0832M7.9196 26.9166V26.9198L7.9165 26.9197V26.9166H7.9196ZM7.9196 19V19.0031L7.9165 19.0031V19H7.9196ZM7.9196 11.0833V11.0865L7.9165 11.0864V11.0833H7.9196Z"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={`${s.onlyIcon} ${editor.isActive('taskList') ? s.isActive : ''}`}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.4168 26.9167H31.6668M12.6668 23.75L8.7085 28.5L6.3335 26.9167M17.4168 19H31.6668M12.6668 15.8334L8.7085 20.5834L6.3335 19M17.4168 11.0834H31.6668M12.6668 7.91669L8.7085 12.6667L6.3335 11.0834"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`${s.onlyIcon} ${editor.isActive('code') ? s.isActive : ''}`}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.7499 11.0833L31.6666 18.9999L23.7499 26.9166M14.2499 26.9166L6.33325 18.9999L14.2499 11.0833"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${s.onlyIcon} ${editor.isActive('codeBlock') ? s.isActive : ''}`}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.75 9.49992H4.78039M4.78039 9.49992H33.2198M4.78039 9.49992C4.75 9.99768 4.75 10.6113 4.75 11.4002V26.6002C4.75 28.3737 4.75 29.2592 5.09515 29.9366C5.39875 30.5325 5.88283 31.0182 6.47868 31.3218C7.15541 31.6666 8.04176 31.6666 9.81183 31.6666L28.1882 31.6666C29.9583 31.6666 30.8433 31.6666 31.52 31.3218C32.1159 31.0182 32.6016 30.5325 32.9052 29.9366C33.25 29.2599 33.25 28.3748 33.25 26.6048L33.25 11.395C33.25 10.6086 33.25 9.99658 33.2198 9.49992M4.78039 9.49992C4.8183 8.87875 4.90354 8.43798 5.09515 8.06193C5.39874 7.46608 5.88283 6.982 6.47868 6.6784C7.15607 6.33325 8.04348 6.33325 9.81698 6.33325H28.1836C29.9571 6.33325 30.8427 6.33325 31.52 6.6784C32.1159 6.982 32.6016 7.46608 32.9052 8.06193C33.0968 8.43798 33.1819 8.87875 33.2198 9.49992M33.2198 9.49992H33.25M22.1667 17.4166L25.3333 20.5833L22.1667 23.7499M15.8333 23.7499L12.6667 20.5833L15.8333 17.4166"
            />
          </svg>
        </button>

        <button
          onClick={() => setALink(editor)}
          className={`${s.onlyIcon} ${editor.isActive('link') ? s.isActive : ''}`}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.522 23.4789L23.4787 14.5222M11.1639 17.8806L8.92468 20.1198C6.45136 22.5931 6.45065 26.6034 8.92397 29.0767C11.3973 31.5501 15.4085 31.5493 17.8818 29.076L20.1186 26.8371M17.8804 11.1625L20.1196 8.92331C22.5929 6.44999 26.6025 6.45043 29.0758 8.92375C31.5491 11.3971 31.549 15.4072 29.0757 17.8805L26.8377 20.1196"
            />
          </svg>
        </button>


        <button
          onClick={() => openModal(editor, setIframeTitle, setIframeSrc, setShowModal)}
          className={s.onlyIcon}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.75 19H12.6667M4.75 19C4.75 26.8701 11.1299 33.25 19 33.25M4.75 19C4.75 11.1299 11.1299 4.75 19 4.75M12.6667 19H25.3333M12.6667 19C12.6667 26.8701 15.5022 33.25 19 33.25M12.6667 19C12.6667 11.1299 15.5022 4.75 19 4.75M25.3333 19H33.25M25.3333 19C25.3333 11.1299 22.4978 4.75 19 4.75M25.3333 19C25.3333 26.8701 22.4978 33.25 19 33.25M33.25 19C33.25 11.1299 26.8701 4.75 19 4.75M33.25 19C33.25 26.8701 26.8701 33.25 19 33.25"
            />
          </svg>
        </button>

        <button
          onClick={() => addImage(editor)}
          className={`${s.onlyIcon} ${editor.isActive('image') ? s.isActive : ''}`}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.75008 28.5001C4.75 28.3979 4.75 28.2924 4.75 28.1836V9.81698C4.75 8.04348 4.75 7.15607 5.09515 6.47868C5.39875 5.88283 5.88283 5.39875 6.47868 5.09515C7.15607 4.75 8.04348 4.75 9.81698 4.75H28.1836C29.9571 4.75 30.8434 4.75 31.5208 5.09515C32.1167 5.39875 32.6016 5.88283 32.9052 6.47868C33.25 7.1554 33.25 8.04174 33.25 9.81177V28.1882C33.25 28.9562 33.25 29.5575 33.2218 30.0476M4.75008 28.5001C4.7513 30.065 4.77117 30.8842 5.09515 31.52C5.39875 32.1159 5.88283 32.6016 6.47868 32.9052C7.1554 33.25 8.04174 33.25 9.81177 33.25H28.189C29.959 33.25 30.8441 33.25 31.5208 32.9052C32.1167 32.6016 32.6016 32.1159 32.9052 31.52C33.1004 31.1369 33.1851 30.687 33.2218 30.0476M4.75008 28.5001L12.2993 19.6927L12.3015 19.6903C12.9711 18.9091 13.3064 18.5179 13.7042 18.3769C14.0536 18.253 14.435 18.2559 14.7827 18.3846C15.1788 18.5313 15.5088 18.927 16.1689 19.719L20.3982 24.7942C21.0092 25.5274 21.3164 25.8961 21.6895 26.0441C22.0186 26.1746 22.3814 26.1893 22.721 26.0891C23.1075 25.975 23.4477 25.6349 24.1281 24.9545L24.9151 24.1675C25.6078 23.4748 25.9541 23.1287 26.3462 23.0155C26.6905 22.9162 27.0586 22.9375 27.3898 23.0743C27.767 23.23 28.0728 23.6113 28.6848 24.3762L33.2218 30.0476M33.2218 30.0476L33.25 30.0827M23.75 14.25C22.8756 14.25 22.1667 13.5411 22.1667 12.6667C22.1667 11.7922 22.8756 11.0833 23.75 11.0833C24.6245 11.0833 25.3333 11.7922 25.3333 12.6667C25.3333 13.5411 24.6245 14.25 23.75 14.25Z"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${s.onlyIcon} ${editor.isActive('blockquote') ? s.isActive : ''}`}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.3332 26.9167C27.9565 26.9167 30.0832 24.7901 30.0832 22.1667V19.0002M30.0832 19.0002V13.6143C30.0832 12.7293 30.0832 12.2861 29.9108 11.9477C29.759 11.6498 29.5161 11.4077 29.2182 11.2559C28.8795 11.0834 28.4367 11.0834 27.55 11.0834H24.7C23.8132 11.0834 23.3695 11.0834 23.0308 11.2559C22.7329 11.4077 22.4909 11.6498 22.3391 11.9477C22.1665 12.2864 22.1665 12.7301 22.1665 13.6169V16.4669C22.1665 17.3536 22.1665 17.7964 22.3391 18.1351C22.4909 18.433 22.7329 18.6758 23.0308 18.8276C23.3692 19 23.8124 19 24.6974 19L30.0832 19.0002ZM11.0832 26.9167C13.7065 26.9167 15.8332 24.7901 15.8332 22.1667L15.8332 19.0002M15.8332 19.0002V13.6143C15.8332 12.7293 15.8332 12.2861 15.6608 11.9477C15.509 11.6498 15.2661 11.4077 14.9682 11.2559C14.6295 11.0834 14.1867 11.0834 13.3 11.0834H10.45C9.56324 11.0834 9.11954 11.0834 8.78084 11.2559C8.48292 11.4077 8.24088 11.6498 8.08908 11.9477C7.9165 12.2864 7.9165 12.7301 7.9165 13.6169V16.4669C7.9165 17.3536 7.9165 17.7964 8.08908 18.1351C8.24088 18.433 8.48292 18.6758 8.78084 18.8276C9.1192 19 9.56238 19 10.4474 19L15.8332 19.0002Z"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={`${s.onlyIcon} ${editor.isActive('horizontalRule') ? s.isActive : ''}`}
        >
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 19H31"
            />
          </svg>
        </button>

        <TableOptions
          editor={editor}

        />
      </div>
    </div>
  );
};

const changeTextColor = (editor: any, setTextColor: any, color: string) => {
  setTextColor(color);
  editor.chain().focus().setColor(color).run()
}

const openModal = (editor: any, setIframeTitle: any, setIframeSrc: any, setShowModal: any) => {
  const src = editor.getAttributes("iframe").src
  const title = editor.getAttributes("iframe").title

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

  setShowModal(true);


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
  setHtml?: any;
  onlyPreview?: boolean;
  editorStyle?: "default" | "white" | "dark" | "clear";
};


const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      backgroundColor: {
        default: null,
        parseHTML: element => element.getAttribute('data-background-color'),
        renderHTML: attributes => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
      color: {
        default: null,
        parseHTML: element => element.getAttribute('data-color'),
        renderHTML: attributes => {
          return {
            'data-color': attributes.color,
            style: `color: ${attributes.color}`,
          }
        },
      },
    }
  },
})

const CustomTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      backgroundColor: {
        default: null,
        parseHTML: element => element.getAttribute('data-background-color'),
        renderHTML: attributes => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
      color: {
        default: null,
        parseHTML: element => element.getAttribute('data-color'),
        renderHTML: attributes => {
          return {
            'data-color': attributes.color,
            style: `color: ${attributes.color}`,
          }
        },
      },
    }
  },
})


/**
* Button component
* @param text Text to display in the button
* @param onClick Function to call when the button is clicked
* @returns Button component
*/
export const LidiaEditor = ({ className = "", html, setHtml, onlyPreview = false, editorStyle = "default" }: EditorProps) => {
  const [overlayisActive, setOverlayIsActive] = useState(false);
  const editor = useEditor({
    onUpdate({ editor }: any) {
      setHtml && setHtml(editor.getHTML())
    },
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Color.configure({
        types: [
          TextStyle.name,
        ]
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
        openOnClick: onlyPreview,
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
      Table.configure({
        resizable: true,
      }),
      TableRow,
      CustomTableHeader,
      CustomTableCell,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    autofocus: true,
    content: html,
    editable: !onlyPreview,
  });

  const configAndActions = {
    overlay: {
      overlayisActive,
      setOverlayIsActive,
    }
  };

  return (
    <div className={`${s.lidiaEditor} ${s[editorStyle]} ${className ? className : ''} ${onlyPreview && s.preview}`}>

      {!onlyPreview && <MenuBar
        editor={editor}
        configAndActions={configAndActions}
      />}


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
      <div className={`${s.lidiaEditorOverlay}  ${active ? s.show : ''} `} onClick={() => setActive(!active)}></div>
      <div className={`${s.customSelect} ${active ? s.show : ''} `}>
        <button className={s.selector} onClick={() => setActive(!active)}>
          <span>
            {getFontValue() || "Poppins"}
          </span>
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.3333 15.8333L19 22.1666L12.6667 15.8333"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

        </button>
        <div className={s.options}>
          <div
            onClick={() => {
              editor.chain().focus().setFontFamily('Poppins').run();
              setActive(!active);
            }}
            className={`${getFontValue() === "Poppins" ? s.isActive : ""} ${s.button}`}
          >
            <span className={s.text}>
              Poppins
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </div>

          <div
            onClick={() => {
              editor.chain().focus().setFontFamily('Arial Black').run();
              setActive(!active);
            }}
            className={`${editor.isActive('textStyle', { fontFamily: 'Arial Black' }) ? s.isActive : ""} ${s.button}`}
          >
            <span className={s.text} style={{
              fontFamily: "Arial Black"
            }}>
              Arial
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </div>

          <div
            onClick={() => {
              editor.chain().focus().setFontFamily('Verdana, Geneva').run();
              setActive(!active);
            }}
            className={`${editor.isActive('textStyle', { fontFamily: 'Verdana, Geneva' }) ? s.isActive : ""} ${s.button}`}
          >
            <span className={s.text} style={{
              fontFamily: "Verdana, Geneva"
            }}>
              Verdana
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </div>


          <div
            onClick={() => {
              editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run();
              setActive(!active);
            }}
            className={`${editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' }) ? s.isActive : ""} ${s.button}`}
          >
            <span className={s.text} style={{
              fontFamily: "Comic Sans MS, Comic Sans"
            }}>
              Comic Sans
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </div>

          <div
            onClick={() => {
              editor.chain().focus().setFontFamily('Inter').run()
              setActive(!active);
            }}
            className={`${editor.isActive('textStyle', { fontFamily: 'Inter' }) ? s.isActive : ""} ${s.button}`}
          >
            <span className={s.text} style={{
              fontFamily: "Inter"
            }}>Inter</span>
            <span className={s.icon}><CheckIcon /></span>
          </div>

          <div
            onClick={() => {
              editor.chain().focus().setFontFamily('monospace').run();
              setActive(!active);
            }}

            className={`${editor.isActive('textStyle', { fontFamily: 'monospace' }) ? s.isActive : ""} ${s.button}`}
          >
            <span className={s.text} style={{
              fontFamily: "monospace"
            }}>
              Monospace
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </div>
        </div>
      </div>
    </>
  )
}

const HeadingSelector = ({ editor, getHeadingValue }: any) => {
  const [active, setActive] = useState(false);


  return (
    <>

      <div className={`${s.lidiaEditorOverlay}  ${active ? s.show : ''} `}
        onClick={() => setActive(!active)}></div>

      <div className={`${s.customSelect} ${active ? s.show : ''} `}>
        <button className={s.selector} onClick={() => setActive(!active)}>
          <span>
            {getHeadingValue() || "Normal"}
          </span>
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.3333 15.8333L19 22.1666L12.6667 15.8333"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

        </button>
        <div className={s.options}>
          <div
            onClick={() => {
              editor.chain().focus().setParagraph().run();
              setActive(!active);
            }}
            className={`${editor.isActive("paragraph") ? s.isActive : ""} ${s.button}`}
          >
            <span className={s.text} style={{
              fontSize: "14px",
            }}>Normal</span>
            <span className={s.icon}><CheckIcon /></span>
          </div>
          <div
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 1 }).run();
              setActive(!active);
            }}
            className={`${editor.isActive("heading", { level: 1 }) ? s.isActive : ""} ${s.button}`}
          >
            <span className={s.text} style={{
              fontSize: "20px",
              fontWeight: "700"
            }}>
              Heading
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </div>
          <div
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 2 }).run();
              setActive(!active);
            }}
            className={`${editor.isActive("heading", { level: 2 }) ? s.isActive : ""} ${s.button}`}
          >
            <span className={s.text} style={{
              fontSize: "15px",
              fontWeight: "700"
            }}>
              Subheading
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </div>
          <div
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 3 }).run();
              setActive(!active);
            }}
            className={`${editor.isActive("heading", { level: 3 }) ? s.isActive : ""} ${s.button}`}
          >
            <span className={s.text} style={{
              fontSize: "14px",
              fontWeight: "600"
            }}>
              Subheading 3
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </div>
          <div
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 4 }).run();
              setActive(!active);
            }}
            className={`${editor.isActive("heading", { level: 4 }) ? s.isActive : ""} ${s.button}`}
          >
            <span className={s.text} style={{
              fontSize: "13px",
              fontWeight: "600"
            }}>
              Subheading 4
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </div>
          <div
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 5 }).run();
              setActive(!active);
            }}
            className={`${editor.isActive("heading", { level: 5 }) ? s.isActive : ""} ${s.button}`}
          >
            <span className={s.text} style={{
              fontSize: "12px",
              fontWeight: "600"
            }}>
              Subheading 5
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </div>
          <div
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 6 }).run();
              setActive(!active);
            }}
            className={`${editor.isActive("heading", { level: 6 }) ? s.isActive : ""} ${s.button}`}
          >
            <span className={s.text} style={{
              fontSize: "11px",
              fontWeight: "600"
            }}>
              Subheading 6
            </span>
            <span className={s.icon}><CheckIcon /></span>
          </div>
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
        <div className={`${s.lidiaEditorOverlay}  ${active ? s.show : ''} `}
          onClick={() => setActive(!active)}></div>
        <div className={`${s.iconSelect} ${s.inRow} ${active ? s.show : ''} `}>
          <button className={s.selector} onClick={() => setActive(!active)}>
            <span>
              {getValue(type) || <AlignIcon id="left" />}
            </span>
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.3333 15.8333L19 22.1666L12.6667 15.8333"
              />
            </svg>
          </button>
          <div className={s.options}>
            {options.map((item: any) => (
              <div
                key={item.value}
                onClick={() => {
                  editor.chain().focus().setTextAlign(item.value).run();
                  setActive(!active);
                }}
                className={s.button}
              >
                <AlignIcon id={item.value} />
              </div>
            ))}
          </div>
        </div>
      </>
    )
  } else {
    return null
  }

}

const TableOptions = ({ editor }: any) => {
  const [active, setActive] = useState(false);
  const [color, setColor] = useState("");
  const [textColor, setTextColor] = useState("")

  const changeColorToCell = (color: string) => {
    setColor(color);
    editor.chain().focus().setCellAttribute('backgroundColor', color).run()
  }

  const changeTextColorToCell = (color: string) => {
    setTextColor(color);
    editor.chain().focus().setCellAttribute('color', color).run()
  }

  return (
    <>
      <div className={`${s.lidiaEditorOverlay}  ${active ? s.show : ''} `}
        onClick={() => setActive(!active)}></div>
      <div className={`${s.iconSelectModal} ${s.inRow} ${active ? s.show : ''} `}>
        <button className={`${s.selector} `} onClick={() => setActive(!active)}>
          <svg
            width={38}
            height={38}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.3335 23.75V26.6004C6.3335 28.3739 6.3335 29.2601 6.67864 29.9375C6.98224 30.5334 7.46633 31.0183 8.06217 31.3219C8.7389 31.6667 9.62524 31.6667 11.3953 31.6667H19.0002M6.3335 23.75V14.25M6.3335 23.75H19.0002M6.3335 14.25V11.4004C6.3335 9.62685 6.3335 8.73944 6.67864 8.06205C6.98224 7.46621 7.46633 6.98212 8.06217 6.67852C8.73956 6.33337 9.62697 6.33337 11.4005 6.33337H19.0002M6.3335 14.25H19.0002M19.0002 6.33337H26.6005C28.374 6.33337 29.2603 6.33337 29.9376 6.67852C30.5335 6.98212 31.0184 7.46621 31.322 8.06205C31.6668 8.73878 31.6668 9.62511 31.6668 11.3951V14.25M19.0002 6.33337V14.25M19.0002 14.25V23.75M19.0002 14.25H31.6668M19.0002 23.75V31.6667M19.0002 23.75H31.6668M19.0002 31.6667H26.6058C28.3759 31.6667 29.2609 31.6667 29.9376 31.3219C30.5335 31.0183 31.0184 30.5334 31.322 29.9375C31.6668 29.2608 31.6668 28.3757 31.6668 26.6057V23.75M31.6668 23.75V14.25"
            />
          </svg>

        </button>
        <div className={s.options}>

          <button
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            className={`${s.buttonMenu} ${s.onlyIcon} `}
          >
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.4167 6.33337H25.017C26.7905 6.33337 27.6768 6.33337 28.3541 6.67852C28.95 6.98212 29.4349 7.46621 29.7385 8.06205C30.0833 8.73878 30.0833 9.62511 30.0833 11.3951V14.2504L17.4168 14.2502M17.4167 6.33337H9.81698C8.04348 6.33337 7.15607 6.33337 6.47868 6.67852C5.88283 6.98212 5.39875 7.46621 5.09515 8.06205C4.75 8.73944 4.75 9.62685 4.75 11.4004V14.25M17.4167 6.33337L17.4168 14.2502M4.75 14.25V23.75M4.75 14.25L17.4168 14.2502M4.75 23.75V26.6004C4.75 28.3739 4.75 29.2601 5.09515 29.9375C5.39875 30.5334 5.88283 31.0183 6.47868 31.3219C7.1554 31.6667 8.04174 31.6667 9.81177 31.6667H17.417L17.4168 14.2502M4.75 23.75H17.4167M23.75 25.3334H28.5M28.5 25.3334H33.25M28.5 25.3334V30.0834M28.5 25.3334V20.5834"
              />
            </svg>
          </button>

          <button
            onClick={() => editor.chain().focus().deleteTable().run()}
            className={`${s.buttonMenu} ${s.onlyIcon} `}
          >
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.4167 6.33337H25.017C26.7905 6.33337 27.6768 6.33337 28.3541 6.67852C28.95 6.98212 29.4349 7.46621 29.7385 8.06205C30.0833 8.73878 30.0833 9.62511 30.0833 11.3951V14.2504L17.4168 14.2502M17.4167 6.33337H9.81698C8.04348 6.33337 7.15607 6.33337 6.47868 6.67852C5.88283 6.98212 5.39875 7.46621 5.09515 8.06205C4.75 8.73944 4.75 9.62685 4.75 11.4004V14.25M17.4167 6.33337L17.4168 14.2502M4.75 14.25V23.75M4.75 14.25L17.4168 14.2502M4.75 23.75V26.6004C4.75 28.3739 4.75 29.2601 5.09515 29.9375C5.39875 30.5334 5.88283 31.0183 6.47868 31.3219C7.1554 31.6667 8.04174 31.6667 9.81177 31.6667H17.417L17.4168 14.2502M4.75 23.75H17.4167M23.75 25.3334H33.25"
              />
            </svg>

          </button>

          <button
            onClick={() => editor.chain().focus().addColumnAfter().run()}
            className={`${s.buttonMenu} ${s.onlyIcon} `}
          >
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.9165 26.9167H12.6665M12.6665 26.9167H17.4165M12.6665 26.9167V22.1667M12.6665 26.9167V31.6667M22.1665 33.25H23.7498C25.4987 33.25 26.9165 31.8322 26.9165 30.0833V7.91667C26.9165 6.16777 25.4987 4.75 23.7498 4.75H20.5832C18.8343 4.75 17.4165 6.16777 17.4165 7.91667V17.4167"
              />
            </svg>
          </button>

          <button
            onClick={() => editor.chain().focus().addRowAfter().run()}
            className={`${s.buttonMenu} ${s.onlyIcon} `}
          >
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.75 22.1666V23.75C4.75 25.4989 6.16777 26.9166 7.91667 26.9166L30.0833 26.9166C31.8322 26.9166 33.25 25.4989 33.25 23.75L33.25 20.5833C33.25 18.8344 31.8322 17.4166 30.0833 17.4166H20.5833M15.8333 12.6666H11.0833M11.0833 12.6666H6.33333M11.0833 12.6666V7.91663M11.0833 12.6666V17.4166"
              />
            </svg>

          </button>

          <button
            onClick={() => editor.chain().focus().deleteColumn().run()}
            className={`${s.buttonMenu} ${s.onlyIcon} `}
          >
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8335 33.25H14.2502C12.5013 33.25 11.0835 31.8322 11.0835 30.0833V7.91667C11.0835 6.16777 12.5013 4.75 14.2502 4.75H17.4168C19.1657 4.75 20.5835 6.16777 20.5835 7.91667V17.4167M30.0835 25.3333H20.5835"
              />
            </svg>
          </button>

          <button
            onClick={() => editor.chain().focus().deleteRow().run()}
            className={`${s.buttonMenu} ${s.onlyIcon} `}
          >
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.1667 25.3334H31.6667M33.25 15.8334V14.25C33.25 12.5011 31.8322 11.0834 30.0833 11.0834H7.91667C6.16776 11.0834 4.75 12.5011 4.75 14.25V17.4167C4.75 19.1656 6.16777 20.5834 7.91667 20.5834H17.4167"
              />
            </svg>
          </button>

          <button
            onClick={() => editor.chain().focus().mergeCells().run()}
            className={`${s.buttonMenu} ${s.onlyIcon} `}
          >
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.0002 25.3334V26.9167M19.0002 17.4167V20.5834M19.0002 11.0834V12.6667M6.3335 26.6004V11.4004C6.3335 9.62685 6.3335 8.73944 6.67864 8.06205C6.98224 7.46621 7.46633 6.98212 8.06217 6.67852C8.73956 6.33337 9.62697 6.33337 11.4005 6.33337H26.6005C28.374 6.33337 29.2603 6.33337 29.9376 6.67852C30.5335 6.98212 31.0184 7.46621 31.322 8.06205C31.6668 8.73878 31.6668 9.62511 31.6668 11.3951V26.6057C31.6668 28.3757 31.6668 29.2608 31.322 29.9375C31.0184 30.5334 30.5335 31.0183 29.9376 31.3219C29.2609 31.6667 28.3759 31.6667 26.6058 31.6667H11.3953C9.62524 31.6667 8.7389 31.6667 8.06217 31.3219C7.46633 31.0183 6.98224 30.5334 6.67864 29.9375C6.3335 29.2601 6.3335 28.3739 6.3335 26.6004Z"
              />
            </svg>
          </button>


          <button
            onClick={() => editor.chain().focus().splitCell().run()}
            className={`${s.buttonMenu} ${s.onlyIcon} `}
          >
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.1665 10.2917V27.7084C22.1665 28.4441 22.1665 28.8119 22.2273 29.1178C22.4772 30.374 23.4593 31.3558 24.7155 31.6056C25.0213 31.6665 25.3892 31.6665 26.1249 31.6665C26.8606 31.6665 27.2283 31.6665 27.5342 31.6056C28.7904 31.3558 29.7722 30.374 30.0221 29.1178C30.0829 28.8119 30.0832 28.4441 30.0832 27.7084V10.2917C30.0832 9.55601 30.0829 9.18822 30.0221 8.88232C29.7722 7.62614 28.7905 6.64409 27.5343 6.39422C27.2284 6.33337 26.8605 6.33337 26.1248 6.33337C25.3891 6.33337 25.0214 6.33337 24.7155 6.39422C23.4593 6.64409 22.4772 7.62614 22.2273 8.88232C22.1665 9.18822 22.1665 9.556 22.1665 10.2917Z"
              />
              <path
                d="M7.9165 10.2917V27.7084C7.9165 28.4441 7.9165 28.8119 7.97735 29.1178C8.22722 30.374 9.20927 31.3558 10.4655 31.6056C10.7713 31.6665 11.1392 31.6665 11.8749 31.6665C12.6106 31.6665 12.9783 31.6665 13.2842 31.6056C14.5404 31.3558 15.5222 30.374 15.7721 29.1178C15.8329 28.8119 15.8332 28.4441 15.8332 27.7084V10.2917C15.8332 9.55601 15.8329 9.18822 15.7721 8.88232C15.5222 7.62614 14.5405 6.64409 13.2843 6.39422C12.9784 6.33337 12.6105 6.33337 11.8748 6.33337C11.1391 6.33337 10.7714 6.33337 10.4655 6.39422C9.20927 6.64409 8.22722 7.62614 7.97735 8.88232C7.9165 9.18822 7.9165 9.556 7.9165 10.2917Z"
              />
            </svg>
          </button>

          <button
            className={`${s.buttonMenu} ${s.onlyIcon} ${s.colorPicker}`}
            title='Change background'
          >
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2917 33.25H32.4118C32.8747 33.25 33.2504 32.8748 33.2504 32.4119L33.25 23.0047M12.6357 32.7295L32.6834 23.3812C33.1029 23.1855 33.2843 22.6867 33.0887 22.2671L29.1131 13.742C28.9174 13.3225 28.4186 13.1403 27.999 13.3359L19.0479 17.5102M15.6462 29.1409C14.8541 32.0972 11.8154 33.8516 8.85909 33.0594C5.9028 32.2673 4.14804 29.2289 4.94018 26.2726L10.6653 4.90613C10.7851 4.45896 11.2443 4.19349 11.6915 4.31331L20.7782 6.74766C21.2253 6.86748 21.4908 7.32699 21.3709 7.77416L15.6462 29.1409ZM10.2917 27.8668H10.2948L10.2948 27.8699L10.2917 27.8699V27.8668Z"
              />
            </svg>

            <div
              className={s.inputHidden}
            >
              <input
                type="color"
                onChange={(e) => {
                  changeColorToCell(e.target.value);
                }} />
            </div>
            <div className={s.colorIndicator} style={{
              background: color,
            }}></div>
          </button>


          <button
            className={`${s.buttonMenu} ${s.onlyIcon} ${s.colorPicker}`}
          >
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 30.0833H19M19 30.0833H22.1667M19 30.0833V7.91663M19 7.91663H9.5V9.49996M19 7.91663H28.5V9.49996"
              />
            </svg>

            <div
              className={s.inputHidden}
            >
              <input
                type="color"
                onChange={(e) => {
                  changeTextColorToCell(e.target.value);
                }} />
            </div>
            <div className={s.colorIndicator}
              style={{
                background: textColor
              }}
            ></div>
          </button>
        </div>
      </div>
    </>
  )


}

const AlignIcon = ({ id }: any) => {

  if (id === "left") {
    return <svg
      width={38}
      height={38}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.3335 28.5H22.1668M6.3335 22.1667H31.6668M6.3335 15.8333H22.1668M6.3335 9.5H31.6668"
      />
    </svg>


  } else if (id === "right") {
    return <svg
      width={38}
      height={38}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.6668 28.5H15.8335M31.6668 22.1667H6.3335M31.6668 15.8333H15.8335M31.6668 9.5H6.3335"
      />
    </svg>
  } else if (id === "center") {
    return <svg
      width={38}
      height={38}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.9168 28.5H11.0835M31.6668 22.1667H6.3335M26.9168 15.8333H11.0835M31.6668 9.5H6.3335"
      />
    </svg>
  } else if (id === "justify") {
    return <svg
      width={38}
      height={38}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.6668 28.5H6.3335M31.6668 22.1667H6.3335M31.6668 15.8333H6.3335M31.6668 9.5H6.3335"
      />
    </svg>

  } else {
    return null;
  }

}

export const CodeBlockComponent = ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }: any) => (
  <NodeViewWrapper className={s.codeBlock}>
    <select
      className={s.selectLanguage}
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
    width={38}
    height={38}
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.5 19L16.2175 25.7175L29.6511 12.2824"
    />
  </svg>

}

const Modal = ({ children, width = "auto", showModal = false, setShowModal }: any) => {
  return <div className={`${s.modal} ${showModal ? s.show : ""} `}>
    <div className={s.overlay} onClick={() => setShowModal(false)}></div>
    <div className={`${s.content} ${width === "full" ? s.full : s.auto} `}>
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

    <div className={s.buttons}>
      <button onClick={() => setShowModal(false)}>
        Cancel
      </button>
      <button
        onClick={showData}
        className={s.saveButton}
      >
        Save
      </button>
    </div>
  </div >
}