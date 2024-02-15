"use client";
import { Textarea } from "@/components/ui/textarea";
import styles from "./textarea.module.css";
import useTextStore from "@/store/textStore";
import { ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";

const TextArea = () => {
  const setText = useTextStore((state) => state.updateText);
  // const text = useTextStore((state) => state.text);

  const changeHandler = useDebouncedCallback((event: ChangeEvent) => {
    const targetEl = event.target as HTMLTextAreaElement;
    const inputText = targetEl.value;
    setText(inputText);
    // console.log(text);
  }, 500);
  return <Textarea className={styles.textarea} onChange={changeHandler} />;
};

export default TextArea;
