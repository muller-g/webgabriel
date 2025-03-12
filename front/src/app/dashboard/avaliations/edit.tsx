'use client';
import useApi from "@/app/api/hook/axiosRequest";
import rightPng from "@/assets/right.png";
import wrongPng from "@/assets/wrong.png";
import { Divider, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "./edit.module.css";
import { notify, notifyErr } from "@/utils/toastify";

export default function AvaliationsEdit({session}: any) {
    const [avaliations, setAvaliations] = useState<any[]>([]);
    const [random, setRandom] = useState<any>(0);

    useEffect(() => {
        useApi.axiosRequestAuth('GET', '/developer/avaliations/accept', null, session?.user?.accessToken).then((res: any) => {
            setAvaliations(res?.response?.data);
        });
    }, [random])

    async function handleApproveOrDecline(id: number, accepted: boolean) {        
        const response: any = await useApi.axiosRequestAuth('POST', '/developer/avaliations-approve/' + id, {accepted: accepted}, session?.user?.accessToken);
        
        if(response.response.status !== 200){
            notifyErr();
            return;
        }

        setRandom(Math.random())
        notify('Avaliação atualizada com sucesso');
    }

    return(
        <div className="wrapp-container">
            <div className="container">
                <h1>Avaliações recebidas</h1>
                <Divider style={{marginBottom: '15px'}}/>
                <TableContainer>
                    <Table variant='simple' className={styles.table_emails}>
                        <Thead>
                            <Tr>
                                <Th>Nome</Th>
                                <Th>Mensagem</Th>
                                <Th>Aprovada</Th>
                                <Th>Enviado em</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                avaliations?.map((avaliation: any, index: number) => (
                                <Tr key={avaliation?.name + "-" + index}>
                                    <Td>{avaliation?.name}</Td>
                                    <Td>{avaliation?.message}</Td>
                                    <Td className={styles.td_answered}>
                                        {
                                            avaliation?.accepted ? 
                                                <div className={styles.button_mail_answer} onClick={() => handleApproveOrDecline(avaliation?.id, false)}>
                                                    <img src={rightPng.src} style={{width: '45px'}} alt="" /> 
                                                </div>
                                            : 
                                                <div className={styles.button_mail_answer} onClick={() => handleApproveOrDecline(avaliation?.id, true)}>
                                                    <img src={wrongPng.src} style={{width: '35px'}} alt="" /> 
                                                </div>
                                        }
                                    </Td>
                                    <Td>{avaliation?.created_at?.slice(0,10).split('-').reverse().join('/')}</Td>
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