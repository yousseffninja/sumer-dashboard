import { useEffect, useMemo, useState } from "react";
import { ContentState, convertFromHTML, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from "draft-js-export-html";
import axiosClient from "../configs/axios-client";
import { stateFromHTML } from "draft-js-import-html";

export const useAbout = () => {
    const getPrefix = '/static-data/about-us';
    const postPrefix = '/static-data';

    const [arTitle, setArTitle] = useState<string>('');
    const [arContent, setArContent] = useState<string>('');
    const [enTitle, setEnTitle] = useState<string>('');
    const [enContent, setEnContent] = useState<string>('');

    useEffect(() => {
        (async () => {
            try {
                const res = await axiosClient.get(getPrefix);
                const { title, description } = res.data.data.value;
                setArTitle(title.ar);
                setArContent(description.ar);
                setEnTitle(title.en);
                setEnContent(description.en);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    const updateData = () => {
        const value = JSONTemplate(arTitle, arContent, enTitle, enContent);
        axiosClient.put(postPrefix, {
            "name": "about-us",
            "value": value
        }).then(() => {
            
        }).catch(err => {
            console.error(err);
        });
    };

    const handleChange = (value: any, valueOf: string) => {
        switch (valueOf) {
            case 'arTitle':
                setArTitle(value);
                break;

            case 'arContent':
                JSON.stringify(setArContent(stateToHtml(value)));
                break;

            case 'enTitle':
                setEnTitle((value));
                break;

            case 'enContent':
                JSON.stringify(setEnContent(stateToHtml(value)));
                break;

            default:
                break;
        }
    };

    return {
        arTitle,
        arContent: JSON.stringify(convertToRaw(stateFromHTML(arContent))),
        enTitle,
        enContent: JSON.stringify(convertToRaw(stateFromHTML(enContent))),
        updateData,
        handleChange
    }
};

const JSONTemplate = (arTitle: string, arContent: string, enTitle: string, enContent: string) => {
    return {
        "title": {
            "ar": arTitle,
            "en": enTitle
        },
        "description": {
            "ar": arContent,
            "en": enContent
        }
    };
};


const stateToHtml = (state: string): string => stateToHTML(convertFromRaw(JSON.parse(state)));