import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { callApi, SingUpApi } from '../api/Api';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Vendit
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
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

const Register = () => {

    const [info, setInfo] = useState({
        id: '',
        pw: '',
        name: ''
    })

    const [db, setDb] = useState({
        data: ''
    })

    const [idCheck, setidCheck] = useState({
        check: false
    });


    const classes = useStyles();

    useEffect(() => {
        console.log("useEffect")
        callApi(setDb)
        setidCheck({
            ...idCheck,
            check: false
        })

    }, [])

    const handleValueChange = (e) => {

        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })

    }

    const handleSignUp = () => {
        setidCheck({
            ...idCheck,
            check: false
        })
        if(idCheck.check === true){
            SingUpApi(info.id, info.pw, info.name);
            setInfo({
                id: '',
                pw: '',
                name: ''
            })
            alert("회원가입 완료");
        }else{
            alert("id 중복체크를 해주세요.")
        }
    }

    const onCheckId = () => {

        console.log(db.data, info.id);

        if(db.data.length === 0){

            if(db.data.id === info.id){
                idCheck.check = false
            }else{
                idCheck.check = true
            }
        }else{

            for(let i = 0; i < db.data.length; i++){
                if(db.data[i].id === info.id){
                    idCheck.check = false
                    break;
                }else{
                    idCheck.check = true
                }
            }

        }

        if(idCheck.check === true){
            alert('ID 사용가능합니다')
        }else if(idCheck.check === false) {
            alert('ID 중복입니다.')
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} noValidate>
                    <Typography component="h3" variant="h5">
                        아이디
                    </Typography>
                    <Button onClick={onCheckId} color="primary" variant="contained">
                        중복체크
                    </Button>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Enter Your Id"
                        name="id"
                        value={info.id}
                        autoComplete="id"
                        autoFocus
                        onChange={handleValueChange}
                    />
                    <Typography component="h3" variant="h5">
                        비밀번호
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="pw"
                        label="pw"
                        type="password"
                        value={info.pw}
                        onChange={handleValueChange}
                        autoComplete="current-password"
                    />
                    
                    <Typography component="h3" variant="h5">
                        이름
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        label="name"
                        type="text"
                        value={info.name}
                        onChange={handleValueChange}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSignUp}
                        className={classes.submit}
                    >
                        Sign up
                    </Button>
                    <Grid container>

                        <Grid item>
                            <Link href="/" variant="body2">
                                {"로그인하러가기"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default Register;