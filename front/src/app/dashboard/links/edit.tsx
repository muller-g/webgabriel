'use client';
import useApi from "@/app/api/hook/axiosRequest";
import { Button, Divider, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "./edit.module.css";

export default function LinksEdit({session}: any) {
    const [image, setImage] = useState<any>(null);
    const [preview, setPreview] = useState<any>('https://placehold.co/200x200');
    const [previewIcon, setPreviewIcon] = useState<any>('https://placehold.co/150x150');
    const [inputs, setInputs] = useState<any>([]);
    const [descriptions, setDescriptions] = useState<any>([]);
    const [linkBtns, setLinkBtns] = useState<any>([]);
    const [populatedData, setPopulatedData] = useState<any>(null);

    useEffect(() => {
        useApi.axiosRequestAuth('GET', '/developer', null, session.user.accessToken).then((res: any) => {
            setPreview(process.env.NEXT_PUBLIC_API_ROUTE_BACK + res?.response?.data?.file?.path);
            console.log(res?.response?.data)
            setInputs(JSON.parse(res?.response?.data?.description));
            setPopulatedData(res?.response?.data)
        });
    }, [])

    function handleChangeImage(e: any){
        setImage(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    function removeBtn(index: number) {
        let arr = linkBtns;

        arr.splice(index, 1);

        setLinkBtns([...arr]);
    }

    function handleAddTextBtn(e: any, index: number) {
        let text = e.target.value;
        let arr = linkBtns;

        arr[index] = {
            text: text,
            link: arr[index].link,
            img: arr[index].img
        };

        setLinkBtns(arr);
    }

    function handleAddLinkBtn(e: any, index: number) {
        let link = e.target.value;
        let arr = linkBtns;

        arr[index] = {
            link: link,
            text: arr[index].text,
            img: arr[index].img
        };

        setLinkBtns(arr);
    }

    function handleChangeIcon(e: any, index: number) {
        const file = e.target.files[0];
    
        setLinkBtns((prev: any) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                img: file,
            };
            return updated;
        });
    }

    function handleChangeInputDescription(e: any, index: number) {
        const updatedInputs = [...inputs]; // Copiar o estado atual dos inputs
        updatedInputs[index] = e.target.value;  // Atualizar o valor do input no índice correto
        setInputs(updatedInputs);  // Atualizar o estado
    }

    function saveBtns() {
        console.log(linkBtns)
    }

    async function handleSaveDeveloperInfo() {
        let formData = new FormData();

        if(image){
            formData.append('file', image);
        }

        descriptions.map((description: any, index: number) => {
            formData.append(`description[]`, description);
        });

        await useApi.axiosRequestAuthFormData('POST', '/developer/create', formData, session.user.accessToken)
    }

    return(
        <div className="wrapp-container">
            <div className="container">
                <h1>Imagem de perfil</h1>
                <Divider style={{marginBottom: '15px'}}/>
                <div className={styles.file_wrapp}>
                    <div className={styles.image_preview}>
                        <img src={preview} alt="" />
                    </div>
                    <label htmlFor="file">
                        <span>Escolher arquivo</span>
                        <input type="file" name="file" id="file" onChange={handleChangeImage}/>
                    </label>
                </div>
                <h1>Descrição</h1>
                <Divider style={{marginBottom: '15px'}}/>
                <div className={styles.wrapp}>
                    <span>Adicionar input</span>
                    <Button backgroundColor={"#b900ff"} color={"#fff"} onClick={() => setInputs([...inputs, ''])}>+</Button>
                </div>
                <div className={styles.input_wrapp}>
                {
                    inputs.map((input: any, index: number) => (
                        <Input type="text" key={index} placeholder="Item" value={input} onChange={(e) => handleChangeInputDescription(e, index)}/>
                    ))
                }
                </div>
                <Button backgroundColor={"#b900ff"} style={{marginTop: '20px'}} color={"#fff"} onClick={handleSaveDeveloperInfo}>Salvar</Button>
            </div>
            <div className="container">
                <h1>Links</h1>
                <Divider style={{marginBottom: '15px'}}/>
                <div className={styles.wrapp}>
                    <span>Adicionar botão</span>
                    <Button backgroundColor={"#b900ff"} color={"#fff"} onClick={() => setLinkBtns([...linkBtns, ''])}>+</Button>
                </div>
                {
                    linkBtns.map((btn: any, index: number) => (
                        <div key={`container-${index}`}>
                            <div className={styles.file_wrapp} id={styles.wrapp_icon}>
                                <label htmlFor={`fileIcon-${index}`}>
                                    <span>Escolher ícone</span>
                                    <input type="file" name="fileIcon" id={`fileIcon-${index}`} onChange={(e) => handleChangeIcon(e, index)}/>
                                </label>
                                <div className={styles.image_preview}>
                                    <img src={btn?.img instanceof File ? URL.createObjectURL(btn?.img) : previewIcon} alt="" />
                                </div>
                                <Button backgroundColor={"#b900ff"} color={"#fff"} onClick={() => removeBtn(index)}>Remover</Button>
                            </div>
                            <div className={styles.wrapp_inputs}>
                                <Input type="text" placeholder="Texto do botão" onChange={(e) => handleAddTextBtn(e, index)} />
                                <Input type="text" placeholder="Link do botão" onChange={(e) => handleAddLinkBtn(e, index)} />
                            </div>
                            <Divider style={{marginBottom: '15px'}}/>
                        </div>
                    ))
                }
                <Button backgroundColor={"#b900ff"} style={{marginTop: '20px'}} color={"#fff"} onClick={saveBtns}>Salvar</Button>
            </div>
        </div>
    )
}