import React, { useRef, useEffect, SetStateAction, Dispatch } from 'react'
import { AlertColor, Box, Button, Container, OutlinedInput, Tab, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { useTranslation } from "react-i18next";
import { Stack } from '@mui/system';
import MUIRichTextEditor, { TMUIRichTextEditorRef } from 'mui-rte-fixed';
import { useAbout } from '@/hooks/use-about';
import { useMuiRTEConvertion } from '@/hooks/use-mui-rte-convertion';
import useAlert from '@/hooks/use-alert';


const RichTextEditor = ({
    title,
    content,
    translate = false,
    termsConditions,
    setTermsConditions,
    updateTermsConditions,
    showAlert
}: {
    title: string,
    content: string,
    translate?: boolean,
    termsConditions: {}[],
    setTermsConditions: Dispatch<SetStateAction<never[]>>,
    updateTermsConditions: (data?: {}[]) => any,
    showAlert: (alertMessage: string, severity?: AlertColor, autoHideDuration?: number) => void
}) => {

    const { t } = useTranslation();
    const ref: React.Ref<TMUIRichTextEditorRef> | undefined = useRef(null);

    const {
        title: muiTitle,
        contentForRender,
        contentForServer,
        handleTitleChange,
        handleContentChange,
    } = useMuiRTEConvertion(title, content)

    // useEffect(() => {
    //     handleTitleChange(title)
    //     handleContentChange(content)
    //     
    // }, [])

    const handleClick = async () => {
        await updateTermsConditions([
            ...termsConditions
        ])
            .catch(() => {
                showAlert('Something went wrong', 'error');
            })
            .finally(() => {
                showAlert('Saved successfully', 'success');
            });
    }

    const handleSave = (name: string, data: string) => {
        ref.current?.save()
        handleContentChange(data)
    }
    return (
        <>
            <Stack direction="row" alignItems={'center'} gap={1} sx={{ mt: 2 }}>
                <Typography variant="h6">
                    {translate ? t('Title') : 'Title'} :
                </Typography>
                <OutlinedInput
                    value={muiTitle}
                    sx={{ maxHeight: 40 }}
                    onChange={(event) => handleTitleChange(event.target.value)}
                />
            </Stack>
            <MUIRichTextEditor
                defaultValue={contentForRender}
                ref={ref}
                label="Type something here..."
                onBlur={() => ref.current?.save()}
                onSave={(data) => handleSave('description', data)}
            />
            <Box
                onClick={handleClick}
                width={'100%'}>
                <Button sx={{ my: 2, float: () => translate ? 'right' : 'left' }} variant="contained" color="primary">
                    {translate ? t('Save') : 'Save'}
                </Button>
            </Box>

        </>

    )
}

export default RichTextEditor