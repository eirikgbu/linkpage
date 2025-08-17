import React, { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { URL_EKSEMPEL } from '../urls';

interface Link {
    Linknavn: string;
    'Faktisk link': string;
}

export default function LinkPage() {
    const [links, setLinks] = useState<Link[]>([]);

    useEffect(() => {
        fetch(URL_EKSEMPEL)
            .then(res => res.text())
            .then(csvText => {
                const rows = csvText.split('\n');
                const dataRows = rows.slice(2).filter(line => line.trim() !== '');

                const parsedLinks = dataRows.map(row => {
                    const values = row.split(',');
                    return {
                        Linknavn: values[0].trim(),
                        'Faktisk link': values[1].trim(),
                    };
                });

                setLinks(parsedLinks);
            });
    }, []);

    return (
        <Stack spacing={2} sx={{ maxWidth: 400, margin: 'auto', mt: 5 }}>
            <Typography variant="h4" align="center">Lenkeside</Typography>
            {links.length === 0 && <Typography variant="body1" align="center">Laster...</Typography>}
            {links.map(({ Linknavn, 'Faktisk link': url }) => (
                <Button
                    key={Linknavn}
                    variant="contained"
                    component="a"
                    href={url.startsWith('http') ? url : `https://${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {Linknavn}
                </Button>
            ))}
        </Stack>
    );
}
