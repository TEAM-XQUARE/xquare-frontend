import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { useModal } from '../../contexts/modal';

interface PropsType {
    children: React.ReactNode;
    isCanClose?: boolean;
}

const ModalContainer = ({
    children,
    isCanClose,
}: PropsType) => {
    const { closeModal, isOpen } = useModal();

    if(typeof window !== "object" || !isOpen) return null;
    return ReactDOM.createPortal((
        <>
            {
                isOpen && (
                    <ModalWrapper onClick={() => isCanClose && closeModal()}>
                        <ModalBox onClick={e => e.stopPropagation()}>
                            {isCanClose && <CloseButton onClick={() => isCanClose && closeModal()}>✖</CloseButton>}
                            {children}
                        </ModalBox>
                    </ModalWrapper>
                )
            }
        </>
    ), document.getElementById("__next") as HTMLElement);
};

const ModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, .3);
    z-index: ${Math.pow(10, 11)};
`;

const ModalBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 14px 20px;
    border-radius: 8px;
    background: ${props => props.theme.colors.white};
`;

const CloseButton = styled.span`
    align-self: flex-end;
    cursor: pointer;
`;

export default ModalContainer;