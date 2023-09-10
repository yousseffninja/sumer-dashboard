import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

export const SearchBar = (props: any) => {
    const { filter, onSearchChange, placeholder } = props;
    return (
        <Card sx={{ p: 2 }}>
            <OutlinedInput
                defaultValue=""
                onChange={onSearchChange}
                fullWidth
                placeholder={placeholder || "Search"}
                startAdornment={
                    <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                            <MagnifyingGlassIcon />
                        </SvgIcon>
                    </InputAdornment>
                }
                sx={{ maxWidth: 500 }}
            />
        </Card>
    );
};

SearchBar.propTypes = {
    filter: PropTypes.string,
    onSearchChange: PropTypes.func,
    placeholder: PropTypes.string,
};
