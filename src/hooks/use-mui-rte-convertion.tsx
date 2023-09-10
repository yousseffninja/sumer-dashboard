import { useEffect, useState } from "react";
import { convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

export const useMuiRTEConvertion = (title: string, content: string) => {

    //expects html
    const [thisTitle, setThisTitle] = useState<string>('');
    const [contentForServer, setContentForServer] = useState<string>('');
    const [contentForRender, setContentForRender] = useState<string>('');

    useEffect(() => {
        setThisTitle(title);
        setContentForRender(JSON.stringify(convertToRaw(stateFromHTML((content)))));
        setContentForServer(stateToHtml(content));
    }, [content, title]);

    const handleTitleChange = (value: any) => {
        setThisTitle(value);
    };

    const handleContentChange = (value: any) => {
        JSON.stringify(setContentForServer(stateToHtml(value)))
    };

    return {
        title: thisTitle,
        contentForRender: contentForRender,
        contentForServer: contentForServer,
        handleTitleChange,
        handleContentChange,
    };
};


const stateToHtml = (state: string): string => {
    try {
        const parsedState = JSON.parse(state);
        return stateToHTML(convertFromRaw(parsedState));
    } catch (error) {
        console.error('Error parsing state JSON:', error);
        return '';
    }
};
