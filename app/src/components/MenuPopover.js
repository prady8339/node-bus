import { Popover } from '@mui/material';
import { styled } from '@mui/material/styles';

const ArrowStyle = styled('span')({
    "@media (min-width: 700px)": {
        top: -7,
        zIndex: 1,
        width: 12,
        right: 20,
        height: 12,
        content: "''",
        position: 'absolute',
        borderRadius: '0 0 4px 0',
        transform: 'rotate(-135deg)',
        background: "#fff"
    }
});

export default function MenuPopover({ children, sx, ...other }) {
    return (
        <Popover
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                sx: {
                    mt: 1.5,
                    ml: 0.5,
                    overflow: 'inherit',
                    width: 200,
                    ...sx
                }
            }}
            {...other}
        >
            <ArrowStyle className="arrow" />
            {children}
        </Popover>
    );
}
