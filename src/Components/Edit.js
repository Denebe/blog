import React, { useState } from 'react';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import { useLocation } from 'react-router-dom';
import { delApi } from '../api/Api';

const Input = styled.input`
position: relative;
overflow: hidden;
width: 100%;
height: 40px;
margin-top: 10px;
padding: 5px 39px 5px 11px;
border: solid 1px #dadada;
background: #fff;
box-sizing: border-box;
z-index: 0;
`
const Textarea = styled.textarea`
position: relative;
overflow: hidden;
width: 100%;
height: 400px;
margin-top: 10px;
padding: 5px 39px 5px 11px;
border: solid 1px #dadada;
background: #fff;
box-sizing: border-box;
z-index: 0;
`
const Button = styled.button`
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
`
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

const Edit = () => {

    const location = useLocation();

    const data = location.state.wow;

    console.log(data.image);


    const [info, setInfo] = useState({
        title: data.title,
        content: data.content
    })

    const [ff, setFf] = useState({
        file: data,
        filename: ''
    })


    const handleFormSubmit = (e) => {

        e.preventDefault()


        setInfo({
            title: '',
            content: '',
            image: ''
        })

        setFf({
            file:null,
            filename: ''
        })

    }

    const handleFileChange = (e) => {
        e.preventDefault();
        setFf({
            ...ff,
            file: e.target.files[0],
            filename: e.target.value
        })
    }

    const handleValueChange = (e) => {

        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })

    }

    const onDelete = (no, e) => {
        if (data.writer === localStorage.getItem('name')) {
            delApi(no);
            alert('삭제되었습니다.');
            window.location.replace('/main')
        } else {
            alert('삭제할 권한이 없습니다.')
        }


    }


    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <Input
                    name="title"
                    placeholder="제목"
                    type="text"
                    value={info.title}
                    onChange={handleValueChange}

                />
                <Textarea
                    name="content"
                    placeholder="내용"
                    type="text"
                    value={info.content}
                    onChange={handleValueChange}

                />

                <Input
                    type="file"
                    name="image"
                    file={ff.file}
                    value={ff.filename}
                    onChange={handleFileChange}
                />
                <Button type="submit" >수정하기</Button>
            </form>
            <Button onClick={(e) => onDelete(data.mo, e)}>삭제하기</Button>
            <Div>
                <Link href="/main" className="btn">돌아가기</Link>
            </Div>
            글쓰기페이지입니다.

        </div>
    )

}
export default Edit;