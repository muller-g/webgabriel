'use client';
import { Divider, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "./edit.module.css";
import useApi from "@/app/api/hook/axiosRequest";
import rightPng from "@/assets/right.png";
import wrongPng from "@/assets/wrong.png";
import { useRouter } from "next/navigation";

export default function MailsEdit({session}: any) {
    const [emails, setEmails] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        useApi.axiosRequestAuth('GET', '/developer/emails', null, session?.user?.accessToken).then((res: any) => {
            setEmails(res?.response?.data);
        });
    }, [])

    return(
        <div className="wrapp-container">
            <div className="container">
                <h1>E-mails enviados</h1>
                <Divider style={{marginBottom: '15px'}}/>
                <TableContainer>
                    <Table variant='simple' className={styles.table_emails}>
                        <Thead>
                            <Tr>
                                <Th>Nome</Th>
                                <Th>e-mail</Th>
                                <Th>Telefone</Th>
                                <Th>Mensagem</Th>
                                <Th>Respondida</Th>
                                <Th>Enviado em</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                emails?.map((email: any, index: number) => (
                                <Tr key={email?.to + "-" + index}>
                                    <Td>{email?.to}</Td>
                                    <Td>{email?.email}</Td>
                                    <Td>{email?.phone}</Td>
                                    <Td>{email?.message}</Td>
                                    <Td className={styles.td_answered}>
                                        {
                                            email?.answered ? 
                                                <div className={styles.button_mail_answer}>
                                                    <img src={rightPng.src} style={{width: '45px'}} alt="" /> 
                                                </div>
                                            : 
                                                <div className={styles.button_mail_answer} onClick={() =>  router.push('/dashboard/mails/answer/' + email?.id)}>
                                                    <img src={wrongPng.src} style={{width: '35px'}} alt="" /> 
                                                </div>
                                        }
                                    </Td>
                                    <Td>{email?.created_at?.slice(0,10).split('-').reverse().join('/')}</Td>
                                </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}