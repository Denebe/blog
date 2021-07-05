import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useLocation } from "react-router";
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router";


const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const Div = styled.div`

.btn{
    font-size: 18px;
font-weight: 700;
line-height: 49px;
display: block;
width: 100%;
height: 49px;
margin: 16px 0 7px;
cursor: pointer;
text-align: center;
color: #fff;
border: none;
border-radius: 0;
background-color: #03c75a;
}

`


const View = () => {
    const history = useHistory();

    const classes = useStyles();

    const location = useLocation();

    const data = location.state.wow;

    console.log(data)

    const onEdit = (info, e) => {
        e.preventDefault();

        history.push({
            pathname: "/edit",
            state: {wow : info} 
        })
    }

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>

                <Grid item key={data.mo} md={12}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={data.image}
                            title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {data.title}
                            </Typography>
                            <Typography>
                                {data.writer}
                            </Typography>
                            <Typography>
                                {data.content}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" onClick={(e) => onEdit(data, e)}>
                                Edit
                            </Button>
                        </CardActions>
                        <Div>
                            <Link href="/main" className="btn">돌아가기</Link>
                        </Div>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
export default View;