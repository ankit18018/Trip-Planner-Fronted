import {makeStyles, withStyles} from '@material-ui/core/styles';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
export const signInStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const signUpStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export  const homeStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    filterRow:{
        display:"flex",
        justifyContent:"center",
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
        textAlign:"start"
    },
    link: {
        margin: theme.spacing(1, 1.5),
        cursor:"pointer",
        textDecoration: " none",
        color: "black"
    },
    heroContent: {
        padding: theme.spacing(2, 0, 1),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
        padding: "5px"
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },

    paper:{
        textAlign: "center",
        width: "100%",
marginLeft: "10px",
border: "1px solid #b2afb3",
        boxShadow: "none",
        backgroundColor: "#edebed",
        minHeight: "40px"
    },
    icon:{
        width:"40px",
        cursor:"pointer"
    },
    filter: {
        margin: "0px 10px",
        maxWidth: "160px",
    },

    filterBtn:{
        margin:"0px 20px"
    }
}));


export const ModalStyles =  makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    link: {
        margin: theme.spacing(1, 1.5),
        cursor:"pointer",
        textDecoration: " none",
        color: "black"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    button: {
        display: "block",
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    icon: {
        marginRight: "10px",
        cursor: "pointer",
        fontSize:"30px"
    },
}));

export const userStyles= makeStyles({
    table: {
        width: "85%",
        margin: "auto",
        marginTop: 20,
        marginBottom: 50,
        fontSize:"40px",
    },
    appbar: {
        marginBottom: "250px",
        color: "black",
    },
    icon: {
        marginRight: "10px",
        cursor: "pointer",
        fontSize:"30px"
    },
    title: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
    },
    footer: {
        padding: "20px",
    },
});

export const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

