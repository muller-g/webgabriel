'use client';
import useApi from "@/app/api/hook/axiosRequest";
import { notify, notifyErr } from "@/utils/toastify";
import { Button, Divider, Input, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export interface AnswerEmailProps {
  name: number,
  subject: string,
  message: string,
  phone: string,
  to: string,
  id: number
}

export default function AnswerEmailEdit({session, id}: any) {
  
  const router = useRouter();
  const [receivedEmail, setReceivedEmail] = useState<any>();
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    useApi.axiosRequestAuth('GET', '/developer/emails/' + id, null, session?.user?.accessToken).then((res: any) => {
        setReceivedEmail(res?.response?.data);
    });
  }, [])

  async function handleSendEmail() {
    setLoading(true);

    let data: AnswerEmailProps = {
      name: receivedEmail?.to,
      subject: subject,
      message: message,
      phone: receivedEmail?.phone,
      to: receivedEmail?.email,
      id: id
    }

    const response: any = await useApi.axiosRequestAuth('POST', '/developer/send-answer-email', data, session?.user?.accessToken)
            
    if(response.response.status !== 200){
        notifyErr();
        setLoading(false);
        return;
    }

    setLoading(false);
    notify('E-mail enviado com sucesso');
    router.push('/dashboard/mails')
  }

  return (
    <div className="wrapp-container">
      <div className="container">
        <h1>Responder Email</h1>
        <Divider style={{marginBottom: '15px'}}/>
        <div className="wrapp-container">
          <div className={styles.wrapp_email}>
            <legend>Assunto</legend>
            <Input type="text" placeholder="Assunto do e-mail" color={"#fff"} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className={styles.wrapp_email}>
            <legend>Cliente</legend>
            <Input type="text" placeholder="Assunto do e-mail" color={"#fff"} value={receivedEmail?.to} disabled />
          </div>
        </div>
        <Textarea placeholder="Mensagem a ser enviada ao cliente" color={"#fff"} style={{marginTop: "15px"}} rows={10} onChange={(e) => setMessage(e.target.value)}/>
        <Button backgroundColor={"#b900ff"} color={"#fff"} style={{marginTop: "15px"}} onClick={handleSendEmail} isLoading={loading}>Enviar</Button>
      </div>
    </div>
  );
}