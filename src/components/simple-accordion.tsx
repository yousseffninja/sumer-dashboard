import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MUIAccordion({ title = 'title', children, disabled = false }: { title: string, children: React.ReactNode, disabled?: boolean }) {
    const id = React.useId()
    return (
        <Accordion disabled={disabled}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={"panel1a-content" + id}
                id={"panel1a-header" + id}>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children || 'content'}
            </AccordionDetails>
        </Accordion>
    );
}
