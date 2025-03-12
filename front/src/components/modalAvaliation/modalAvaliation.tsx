'use client';
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react';
import styles from './modalAvaliation.module.css';
import { useEffect, useState } from 'react';
import { notify, notifyErr } from '@/utils/toastify';
import useApi from '@/app/api/hook/axiosRequest';

export interface ModalAvaliationProps {
    name: string,
    message: string
}

export default function ModalAvaliation({isOpen, onClose}: any) {

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSendAvaliation () {
        setLoading(true);

        let data: ModalAvaliationProps = {
            name: name,
            message: message
        };

        const response: any = await useApi.axiosRequest('POST', '/send-avaliation', data)

       if(response.error){
            notifyErr();
            setLoading(false);
            return;
        }

        notify('Avaliação enviada com sucesso!');
        setLoading(false);
        onClose();
    }

    useEffect(() => {
        if(name !== '' && message !== ''){
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [name, message])

    useEffect(() => {
        if(!isOpen){
            setName('')
            setMessage('')
            setLoading(false)
        }
    }, [isOpen])

    return(
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
            <ModalOverlay  />
            <ModalContent>
                <ModalHeader className={styles.modal_avaliation}>
                    Deixe uma Avaliação
                    <p style={{color: '#fff', fontSize: '14px', fontWeight: '200', marginTop: '10px'}}>sugestão, comentário ou algo do seu coração ❤️</p>
                </ModalHeader>
                <ModalCloseButton style={{color: "#fff"}}/>
                <ModalBody className={styles.modal_avaliation} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <Input type="text" placeholder="Seu nome" onChange={(e) => setName(e.target.value)}/>
                    <Textarea placeholder='Avaliação, comentário, sugestão ou apenas uma mensagem' onChange={(e) => setMessage(e.target.value)}/>
                </ModalBody>
                <ModalFooter className={styles.modal_avaliation} style={{display: 'flex', gap: '10px'}}>
                    <Button colorScheme='teal' variant='link' color={"fff"} onClick={onClose}>
                    Fechar
                    </Button>
                    <Button 
                        backgroundColor={"#b900ff"} 
                        color={"#fff"} 
                        onClick={handleSendAvaliation} 
                        disabled={disabled}
                        isLoading={loading}
                    >Enviar avaliação</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}