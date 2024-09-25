import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    background-color: rgb(51, 51, 51);
    width: 100vw;
    height: 100vh;
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ErrorNum = styled.span`
    font-size: 8em;
    font-family: 'Arial Black';
`;

const Eye = styled.div`
    background: #fff;
    border-radius: 50%;
    display: inline-block;
    height: 100px;
    position: relative;
    width: 100px;
    margin: 0 10px;

    &::after {
        background: #000;
        border-radius: 50%;
        bottom: 56.1px;
        content: '';
        height: 33px;
        position: absolute;
        right: 33px;
        width: 33px;
    }
`;

const SubText = styled.p`
    margin-bottom: 4em;
`;

const Link = styled.a`
    color: white;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
        color: lightgray;
    }
`;

const EyeComponent = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const handleMouseMove = (event) => {
            const eyes = document.querySelectorAll('.eye');
            eyes.forEach((eye) => {
                const x = eye.offsetLeft + eye.offsetWidth / 2;
                const y = eye.offsetTop + eye.offsetHeight / 2;
                const rad = Math.atan2(event.pageX - x, event.pageY - y);
                const rot = rad * (180 / Math.PI) * -1 + 180;
                eye.style.transform = `rotate(${rot}deg)`;
            });
        };

        document.body.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.body.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <Container>
            <div>
                <ErrorNum>5</ErrorNum>
                <Eye className="eye" />
                <Eye className="eye" />
            </div>
            <SubText>Oh no! Chúng tôi đã gặp một chút sự cố.</SubText>
            <span
                onClick={() => {
                    navigate(-1);
                }}
                className="cursor-pointer"
            >
                Quay lại
            </span>
        </Container>
    );
};

export default EyeComponent;
