import BulletList from '@tiptap/extension-bullet-list';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import FontFamily from '@tiptap/extension-font-family';
import Highlight from "@tiptap/extension-highlight";
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from 'react';
import Image from '@tiptap/extension-image'
// import Dropcursor from '@tiptap/extension-dropcursor'

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
  if (!editor) {
    return null;
  }

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
    console.log("EDITOR", editor.isActive("heading", { level: 1 }));
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
    console.log("CURRENT ALIGN", editor.isActive({ textAlign: "left" }));
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
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M18.25 25H9V7H17.5C18.5022 7.00006 19.4834 7.28695 20.3277 7.82679C21.172 8.36662 21.8442 9.13684 22.2649 10.0465C22.6855 10.9561 22.837 11.9671 22.7015 12.96C22.5659 13.953 22.149 14.8864 21.5 15.65C22.3477 16.328 22.9645 17.252 23.2653 18.295C23.5662 19.3379 23.5364 20.4485 23.18 21.4738C22.8236 22.4991 22.1581 23.3887 21.2753 24.0202C20.3924 24.6517 19.3355 24.994 18.25 25ZM12 22H18.23C18.5255 22 18.8181 21.9418 19.091 21.8287C19.364 21.7157 19.6121 21.5499 19.821 21.341C20.0299 21.1321 20.1957 20.884 20.3087 20.611C20.4218 20.3381 20.48 20.0455 20.48 19.75C20.48 19.4545 20.4218 19.1619 20.3087 18.889C20.1957 18.616 20.0299 18.3679 19.821 18.159C19.6121 17.9501 19.364 17.7843 19.091 17.6713C18.8181 17.5582 18.5255 17.5 18.23 17.5H12V22ZM12 14.5H17.5C17.7955 14.5 18.0881 14.4418 18.361 14.3287C18.634 14.2157 18.8821 14.0499 19.091 13.841C19.2999 13.6321 19.4657 13.384 19.5787 13.111C19.6918 12.8381 19.75 12.5455 19.75 12.25C19.75 11.9545 19.6918 11.6619 19.5787 11.389C19.4657 11.116 19.2999 10.8679 19.091 10.659C18.8821 10.4501 18.634 10.2843 18.361 10.1713C18.0881 10.0582 17.7955 10 17.5 10H12V14.5Z"
              fill="#212529"
            />
          </svg>

        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${s.onlyIcon} ${editor.isActive("italic") ? s.isActive : ""}`}
        >
          <svg
            width={25}
            height={25}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 9V7H12V9H17.14L12.77 23H7V25H20V23H14.86L19.23 9H25Z"
              fill="#212529"
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
              fill="#212529"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${s.onlyIcon} ${editor.isActive('underline') ? s.isActive : ''}`}
        >
          <svg
            width={25}
            height={25}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 26H28V28H4V26ZM16 23C14.1435 23 12.363 22.2625 11.0503 20.9497C9.7375 19.637 9 17.8565 9 16V5H11V16C11 17.3261 11.5268 18.5979 12.4645 19.5355C13.4021 20.4732 14.6739 21 16 21C17.3261 21 18.5979 20.4732 19.5355 19.5355C20.4732 18.5979 21 17.3261 21 16V5H23V16C23 17.8565 22.2625 19.637 20.9497 20.9497C19.637 22.2625 17.8565 23 16 23Z"
              fill="#212529"
            />
          </svg>


        </button>

        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`${s.onlyIcon} ${editor.isActive('highlight') ? s.isActive : ''}`}
        >
          <svg
            width={25}
            height={25}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.2234 16.3211L23.5539 9.13419L25.1265 10.8621L17.0012 20.472L13.2234 16.3211ZM10.1166 16.8693L16.1637 23.5137C16.2889 23.6377 16.4389 23.7337 16.604 23.7954C16.769 23.8571 16.9453 23.8831 17.1212 23.8717C17.297 23.8602 17.4684 23.8116 17.624 23.729C17.7797 23.6464 17.916 23.5317 18.0241 23.3925L27.9593 11.6419C28.1572 11.4244 28.2692 11.1423 28.2745 10.8483C28.2797 10.5543 28.1778 10.2684 27.9877 10.044L24.637 6.36244C24.4315 6.15215 24.1564 6.02382 23.8632 6.00142C23.57 5.97901 23.2787 6.06406 23.0436 6.24068L10.412 15.0285C10.2633 15.1229 10.1363 15.2479 10.0394 15.3951C9.94253 15.5423 9.878 15.7084 9.85007 15.8824C9.82215 16.0564 9.83146 16.2343 9.8774 16.4045C9.92334 16.5746 10.0049 16.733 10.1166 16.8693V16.8693ZM3.72522 24.7036L11.215 26L13.1872 24.2051L9.14869 19.7678L3.72522 24.7036Z"
              fill="#212529"
            />
          </svg>

        </button>


        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${s.onlyIcon} ${editor.isActive('orderedList') ? s.isActive : ''}`}
        >
          <svg
            width={28}
            height={28}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 17.75H22.75V19H14V17.75ZM14 9H22.75V10.25H14V9ZM9 11.5V6.5H7.75V7.125H6.5V8.375H7.75V11.5H6.5V12.75H10.25V11.5H9ZM10.25 21.5H6.5V19C6.5 18.6685 6.6317 18.3505 6.86612 18.1161C7.10054 17.8817 7.41848 17.75 7.75 17.75H9V16.5H6.5V15.25H9C9.33152 15.25 9.64946 15.3817 9.88388 15.6161C10.1183 15.8505 10.25 16.1685 10.25 16.5V17.75C10.25 18.0815 10.1183 18.3995 9.88388 18.6339C9.64946 18.8683 9.33152 19 9 19H7.75V20.25H10.25V21.5Z"
              fill="#212529"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${s.onlyIcon} ${editor.isActive('bulletList') ? s.isActive : ''}`}
        >
          <svg
            width={28}
            height={28}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.375 11.5C9.41053 11.5 10.25 10.6605 10.25 9.625C10.25 8.58947 9.41053 7.75 8.375 7.75C7.33947 7.75 6.5 8.58947 6.5 9.625C6.5 10.6605 7.33947 11.5 8.375 11.5Z"
              fill="#212529"
            />
            <path
              d="M8.375 20.25C9.41053 20.25 10.25 19.4105 10.25 18.375C10.25 17.3395 9.41053 16.5 8.375 16.5C7.33947 16.5 6.5 17.3395 6.5 18.375C6.5 19.4105 7.33947 20.25 8.375 20.25Z"
              fill="#212529"
            />
            <path
              d="M14 17.75H22.75V19H14V17.75ZM14 9H22.75V10.25H14V9Z"
              fill="#212529"
            />
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${s.onlyIcon} ${editor.isActive('codeBlock') ? s.isActive : ''}`}
        >
          <svg
            width={25}
            height={25}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31 16L24 23L22.59 21.59L28.17 16L22.59 10.41L24 9L31 16ZM1 16L8 9L9.41 10.41L3.83 16L9.41 21.59L8 23L1 16Z"
              fill="#212529"
            />
          </svg>
        </button>

        <button
          onClick={() => setALink(editor)}
          className={`${s.onlyIcon} ${editor.isActive('link') ? s.isActive : ''}`}
        >
          <svg
            width={22}
            height={22}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.25 6.75997C28.6926 6.20061 28.0302 5.75679 27.3009 5.45396C26.5716 5.15112 25.7897 4.99524 25 4.99524C24.2103 4.99524 23.4284 5.15112 22.6991 5.45396C21.9697 5.75679 21.3074 6.20061 20.75 6.75997L22.17 8.17997C22.5423 7.80767 22.9842 7.51235 23.4707 7.31086C23.9571 7.10938 24.4785 7.00567 25.005 7.00567C25.5315 7.00567 26.0528 7.10938 26.5393 7.31086C27.0257 7.51235 27.4677 7.80767 27.84 8.17997C28.2123 8.55227 28.5076 8.99425 28.7091 9.48068C28.9106 9.96711 29.0143 10.4885 29.0143 11.015C29.0143 11.5415 28.9106 12.0628 28.7091 12.5493C28.5076 13.0357 28.2123 13.4777 27.84 13.85L19.84 21.85C19.0894 22.6019 18.0709 23.0248 17.0085 23.0257C15.9461 23.0267 14.9269 22.6055 14.175 21.855C13.4231 21.1044 13.0001 20.0859 12.9992 19.0235C12.9983 17.9611 13.4194 16.9419 14.17 16.19L15.58 14.77L14.17 13.35L12.75 14.77C12.1906 15.3274 11.7468 15.9897 11.444 16.7191C11.1411 17.4484 10.9852 18.2303 10.9852 19.02C10.9852 19.8097 11.1411 20.5916 11.444 21.3209C11.7468 22.0502 12.1906 22.7125 12.75 23.27C13.8815 24.387 15.41 25.0092 17 25C17.7927 25.0032 18.5782 24.8494 19.3111 24.5473C20.044 24.2452 20.7098 23.8009 21.27 23.24L29.27 15.24C30.3909 14.1123 31.0184 12.5858 31.0147 10.9958C31.0109 9.40582 30.3762 7.88232 29.25 6.75997Z"
              fill="#212529"
            />
            <path
              d="M4.18997 24.82C3.81656 24.4483 3.52026 24.0065 3.31807 23.52C3.11589 23.0335 3.01181 22.5118 3.01181 21.985C3.01181 21.4581 3.11589 20.9365 3.31807 20.4499C3.52026 19.9634 3.81656 19.5216 4.18997 19.15L12.19 11.15C12.5616 10.7766 13.0034 10.4803 13.4899 10.2781C13.9765 10.0759 14.4981 9.97181 15.025 9.97181C15.5518 9.97181 16.0735 10.0759 16.56 10.2781C17.0465 10.4803 17.4883 10.7766 17.86 11.15C18.231 11.5246 18.5231 11.9698 18.7189 12.4594C18.9147 12.9489 19.0103 13.4728 19 14C19.003 14.5288 18.9012 15.0529 18.7004 15.5421C18.4995 16.0313 18.2037 16.4758 17.83 16.85L15.71 19L17.13 20.42L19.25 18.3C20.3785 17.1715 21.0124 15.6409 21.0124 14.045C21.0124 12.449 20.3785 10.9185 19.25 9.78997C18.1215 8.66147 16.5909 8.02749 14.995 8.02749C13.399 8.02749 11.8685 8.66147 10.74 9.78997L2.73997 17.79C2.17911 18.3476 1.73401 19.0106 1.43029 19.7408C1.12657 20.471 0.970215 21.2541 0.970215 22.045C0.970215 22.8358 1.12657 23.6189 1.43029 24.3492C1.73401 25.0794 2.17911 25.7424 2.73997 26.3C3.87879 27.4084 5.41087 28.0198 6.99997 28C8.60307 28.0015 10.1417 27.3688 11.28 26.24L9.85997 24.82C9.4883 25.1934 9.04652 25.4897 8.56 25.6919C8.07349 25.8941 7.55182 25.9981 7.02497 25.9981C6.49812 25.9981 5.97645 25.8941 5.48994 25.6919C5.00342 25.4897 4.56164 25.1934 4.18997 24.82Z"
              fill="#212529"
            />
          </svg>

        </button>


        <button
          onClick={() => openModal(editor)}
          className={s.onlyIcon}
        >
          <svg
            width={22}
            height={22}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.9719 19.7324C19.0937 19.9034 19.1503 20.1126 19.1313 20.3219C19.1123 20.5312 19.019 20.7267 18.8684 20.8727L18.7695 20.9545L15.1004 23.5878L19.0696 26.4081C19.2404 26.5293 19.3621 26.708 19.4127 26.9117C19.4633 27.1154 19.4394 27.3306 19.3454 27.518L19.279 27.629C19.1584 27.8005 18.9805 27.9228 18.7777 27.9736C18.5748 28.0244 18.3606 28.0004 18.1739 27.9059L18.0622 27.8382L13.0925 24.3075L13.089 22.8787L17.7539 19.5291C17.8472 19.4621 17.9527 19.4142 18.0644 19.3881C18.1761 19.362 18.2918 19.3583 18.4049 19.3772C18.518 19.3961 18.6263 19.4372 18.7236 19.4981C18.8209 19.5591 18.9053 19.6387 18.9719 19.7324ZM22.2234 19.4625L22.3339 19.5291L27 22.8787L26.9965 24.3075L22.0268 27.8382L21.9163 27.9059C21.7494 27.9906 21.5598 28.0191 21.3754 27.9874C21.1911 27.9556 21.0219 27.8652 20.8926 27.7295L20.8111 27.629L20.7437 27.518C20.6592 27.3505 20.6306 27.1602 20.662 26.9751C20.6934 26.79 20.7832 26.6199 20.9182 26.4899L21.0194 26.4081L24.9886 23.5878L21.3195 20.9556L21.2206 20.8727C21.0707 20.7267 20.9779 20.5315 20.959 20.3227C20.9402 20.1138 20.9966 19.905 21.118 19.7344C21.2393 19.5637 21.4176 19.4424 21.6205 19.3925C21.8233 19.3426 22.0373 19.3675 22.2234 19.4625ZM22.6131 5C23.2302 5 23.822 5.24618 24.2583 5.68438C24.6946 6.12258 24.9398 6.71691 24.9398 7.33662V18.265L24.1685 17.6902L23.1948 17.689V7.33662C23.1948 7.1817 23.1335 7.03311 23.0244 6.92356C22.9153 6.81401 22.7674 6.75247 22.6131 6.75247H6.32664C6.17237 6.75247 6.02443 6.81401 5.91534 6.92356C5.80626 7.03311 5.74498 7.1817 5.74498 7.33662V24.8613C5.74498 25.0162 5.80626 25.1648 5.91534 25.2744C6.02443 25.3839 6.17237 25.4455 6.32664 25.4455H9.95387L12.3247 27.1979H6.32664C5.70958 27.1979 5.11779 26.9517 4.68146 26.5135C4.24513 26.0753 4 25.481 4 24.8613V7.33662C4 6.71691 4.24513 6.12258 4.68146 5.68438C5.11779 5.24618 5.70958 5 6.32664 5H22.6131ZM9.82707 22.5247L9.83056 23.693H7.48996V22.5247H9.82707ZM12.3724 20.1881L10.6612 21.3564H9.8166V20.1881H12.3724ZM15.6332 17.8514V17.9624L14.0837 19.0197H12.1432V17.8514H15.6332ZM20.2865 15.5148V16.6831H12.1432V15.5148H20.2865ZM20.2865 13.1782V14.3465H12.1432V13.1782H20.2865ZM15.6332 10.8416V12.0099H9.8166V10.8416H15.6332ZM10.9799 8.50494V9.67325H7.48996V8.50494H10.9799Z"
              fill="#212529"
            />
          </svg>
        </button>

        <button onClick={() => addImage(editor)}
          className={`${s.onlyIcon} ${editor.isActive('image') ? s.isActive : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={22}
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M19 14C19.5933 14 20.1734 13.8241 20.6667 13.4944C21.1601 13.1648 21.5446 12.6962 21.7716 12.1481C21.9987 11.5999 22.0581 10.9967 21.9424 10.4147C21.8266 9.83279 21.5409 9.29824 21.1213 8.87868C20.7018 8.45912 20.1672 8.1734 19.5853 8.05764C19.0033 7.94189 18.4001 8.0013 17.8519 8.22836C17.3038 8.45542 16.8352 8.83994 16.5056 9.33329C16.1759 9.82664 16 10.4067 16 11C16 11.7956 16.3161 12.5587 16.8787 13.1213C17.4413 13.6839 18.2044 14 19 14ZM19 10C19.1978 10 19.3911 10.0586 19.5556 10.1685C19.72 10.2784 19.8482 10.4346 19.9239 10.6173C19.9996 10.8 20.0194 11.0011 19.9808 11.1951C19.9422 11.3891 19.847 11.5673 19.7071 11.7071C19.5673 11.847 19.3891 11.9422 19.1951 11.9808C19.0011 12.0194 18.8 11.9996 18.6173 11.9239C18.4346 11.8482 18.2784 11.72 18.1685 11.5556C18.0586 11.3911 18 11.1978 18 11C18 10.7348 18.1054 10.4804 18.2929 10.2929C18.4804 10.1054 18.7348 10 19 10Z"
              fill="#212529"
            />
            <path
              d="M26 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V26C4 26.5304 4.21071 27.0391 4.58579 27.4142C4.96086 27.7893 5.46957 28 6 28H26C26.5304 28 27.0391 27.7893 27.4142 27.4142C27.7893 27.0391 28 26.5304 28 26V6C28 5.46957 27.7893 4.96086 27.4142 4.58579C27.0391 4.21071 26.5304 4 26 4ZM26 26H6V20L11 15L16.59 20.59C16.9647 20.9625 17.4716 21.1716 18 21.1716C18.5284 21.1716 19.0353 20.9625 19.41 20.59L21 19L26 24V26ZM26 21.17L22.41 17.58C22.0353 17.2075 21.5284 16.9984 21 16.9984C20.4716 16.9984 19.9647 17.2075 19.59 17.58L18 19.17L12.41 13.58C12.0353 13.2075 11.5284 12.9984 11 12.9984C10.4716 12.9984 9.96473 13.2075 9.59 13.58L6 17.17V6H26V21.17Z"
              fill="#212529"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const openModal = (editor: any) => {
  console.log("OPEN");


  editor.chain().focus()
    .setIframe({
      title: "Pruebaaaa",
      src: "https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik"
    })
    .run()
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
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      Underline, Highlight,
      BulletList, ListItem, OrderedList,
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
      // Dropcursor
    ],
    content: html
  });

  const configAndActions = {
    overlay: {
      overlayisActive,
      setOverlayIsActive
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
          editor={editor} />
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
            className={editor.isActive('textStyle', { fontFamily: 'Poppins' }) ? s.isActive : ""}
          >
            <span className={s.text}>
              Poppins
            </span>
            <span className={s.icon}>✔️</span>
          </button>
          <button
            onClick={() => {
              editor.chain().focus().setFontFamily('Inter').run()
              setActive(!active);
            }}
            className={editor.isActive('textStyle', { fontFamily: 'Inter' }) ? s.isActive : ""}
          >
            <span className={s.text}>Inter</span>
            <span className={s.icon}>✔️</span>
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
            <span className={s.icon}>✔️</span>
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
            <span className={s.icon}>✔️</span>
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
            <span className={s.icon}>✔️</span>
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
            <span className={s.icon}>✔️</span>
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
            <span className={s.icon}>✔️</span>
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
            <span className={s.icon}>✔️</span>
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
            <span className={s.icon}>✔️</span>
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
            <span className={s.icon}>✔️</span>
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
            <span className={s.icon}>✔️</span>
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
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6H26V8H12V6ZM12 12H22V14H12V12ZM12 18H26V20H12V18ZM12 24H22V26H12V24ZM6 4H8V28H6V4Z"
        fill="#212529"
      />
    </svg>
  } else if (id === "right") {
    return <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6H20V8H6V6ZM10 12H20V14H10V12ZM6 18H20V20H6V18ZM10 24H20V26H10V24ZM24 4H26V28H24V4Z"
        fill="#212529"
      />
    </svg>

  } else if (id === "center") {
    return <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6H26V8H6V6ZM10 12H22V14H10V12ZM6 18H26V20H6V18ZM10 24H22V26H10V24Z"
        fill="#212529"
      />
    </svg>

  } else if (id === "justify") {
    return <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6H26V8H6V6ZM6 12H26V14H6V12ZM6 18H26V20H6V18ZM6 24H26V26H6V24Z"
        fill="#212529"
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