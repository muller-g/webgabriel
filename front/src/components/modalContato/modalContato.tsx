'use client';
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react';
import styles from './modalContato.module.css';
import { useEffect, useState } from 'react';
import { notify, notifyErr } from '@/utils/toastify';
import useApi from '@/app/api/hook/axiosRequest';

export interface ModalContatoProps {
    name: string,
    email: string,
    phone: string,
    message: string
}

export default function ModalContato({isOpen, onClose}: any) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleSendMessage () {
        setLoading(true);

        let data: ModalContatoProps = {
            name: name,
            email: email,
            phone: phone,
            message: message
        };

        const response: any = await useApi.axiosRequest('POST', '/send-email', data)

       if(response.error){
            notifyErr();
            return;
        }

        notify('E-mail enviado com sucesso!');
        setLoading(false);
        onClose();
    }

    useEffect(() => {
        if(name !== '' && email !== '' && phone !== '' && message !== ''){
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [name, email, phone, message])

    useEffect(() => {
        if(!isOpen){
            setName('')
            setEmail('')
            setPhone('')
            setMessage('')
            setLoading(false)
        }
    }, [isOpen])

    return(
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
            <ModalOverlay  />
            <ModalContent>
                <ModalHeader className={styles.modal_contato}>
                    Deixe um e-mail
                    <p style={{color: '#fff', fontSize: '14px', fontWeight: '200', marginTop: '10px'}}>vamos entrar em contato o mais rápido possível 🚀</p>
                </ModalHeader>
                <ModalCloseButton style={{color: "#fff"}}/>
                <ModalBody className={styles.modal_contato} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <Input type="text" placeholder="Seu nome" onChange={(e) => setName(e.target.value)}/>
                    <Input type="text" placeholder="Seu e-mail" onChange={(e) => setEmail(e.target.value)}/>
                    <Input type="text" placeholder="Seu telefone" onChange={(e) => setPhone(e.target.value)}/>
                    <Textarea placeholder='Solicite um orçamento, tire suas dúvidas, deixe uma mensagem ou faça uma sugestão' onChange={(e) => setMessage(e.target.value)}/>
                </ModalBody>
                <ModalFooter className={styles.modal_contato} style={{display: 'flex', gap: '10px'}}>
                    <Button colorScheme='teal' variant='link' color={"fff"} onClick={onClose}>
                    Fechar
                    </Button>
                    <Button 
                        backgroundColor={"#b900ff"} 
                        color={"#fff"} 
                        onClick={handleSendMessage} 
                        disabled={disabled}
                        isLoading={loading}
                    >Enviar mensagem</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}