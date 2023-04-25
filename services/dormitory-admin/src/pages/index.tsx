import styled from '@emotion/styled';
import type { GetServerSideProps, NextPage } from 'next';
import loginBackground from '../assets/loginBackground.png';
import { useLayoutEffect } from 'react';
import { Button } from '@semicolondsm/ui';
import xquareLogo from '../assets/xquareLogo.png';
import Image from 'next/image';
import { useState } from 'react';
import { useLoginMutation } from '../apis/user';
import { getCookie } from 'cookies-next';
import SelectInput from '../components/common/SelectInput';

const Main: NextPage = () => {
    useLayoutEffect(() => {
        const sideBar = document.getElementById('sidebar');
        sideBar && (sideBar.style.display = 'none');
        return () => {
            sideBar && (sideBar.style.display = 'block');
        };
    }, []);

    const { mutate: loginMutate, isLoading } = useLoginMutation();

    const [loginData, setLoginData] = useState({
        account_id: '',
        password: '',
    });

    const onClickLogin = () => {
        loginMutate(loginData);
        setLoginData({ account_id: '', password: '' });
    };
    return (
        <LoginContainer>
            <LoginWrapper
                onSubmit={(e) => {
                    e.preventDefault();
                }}>
                <Image src={xquareLogo} width={50} height={50}></Image>
                <InputContainer>
                    <SelectInput
                        inputSize="large"
                        placeholder="아이디를 입력하세요"
                        name="account_id"
                        value={loginData.account_id}
                        onChange={(e) =>
                            setLoginData((state) => ({ ...state, [e.target.name]: e.target.value }))
                        }
                    />
                    <SelectInput
                        inputSize="large"
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        name="password"
                        value={loginData.password}
                        onChange={(e) =>
                            setLoginData((state) => ({ ...state, [e.target.name]: e.target.value }))
                        }
                    />
                </InputContainer>
                <LoginButton loading={isLoading} fullWidth fill="purple" onClick={onClickLogin}>
                    로그인
                </LoginButton>
            </LoginWrapper>
        </LoginContainer>
    );
};

const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    justify-content: center;
    background-image: url(${loginBackground.src});
    background-size: cover;
`;

const LoginWrapper = styled.form`
    padding: 50px 60px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
    background-color: ${({ theme }) => theme.colors.white};
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 300px;
`;

const LoginButton = styled(Button)`
    border-radius: 4px;

    & div {
        font-weight: 500;
    }
`;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const accessToken = getCookie('access_token', { req, res });
    if (accessToken)
        return {
            redirect: {
                permanent: false,
                destination: '/point',
            },
        };
    return {
        props: {},
    };
};

export default Main;
